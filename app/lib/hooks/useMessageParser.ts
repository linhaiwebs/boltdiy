import type { UIMessage } from 'ai';
import { useCallback, useRef, useState, startTransition } from 'react';
import { StreamingMessageParser } from '~/lib/runtime/message-parser';
import { workbenchStore } from '~/lib/stores/workbench';
import { createScopedLogger } from '~/utils/logger';

const logger = createScopedLogger('useMessageParser');

const messageParser = new StreamingMessageParser({
  callbacks: {
    onArtifactOpen: (data) => {
      logger.trace('onArtifactOpen', data);

      startTransition(() => {
        workbenchStore.showWorkbench.set(true);
        workbenchStore.addArtifact(data);
      });
    },
    onArtifactClose: (data) => {
      logger.trace('onArtifactClose');

      startTransition(() => {
        workbenchStore.updateArtifact(data, { closed: true });
      });
    },
    onActionOpen: (data) => {
      logger.trace('onActionOpen', data.action);

      if (data.action.type !== 'shell') {
        startTransition(() => {
          workbenchStore.addAction(data);
        });
      }
    },
    onActionClose: (data) => {
      logger.trace('onActionClose', data.action);

      if (data.action.type === 'shell') {
        startTransition(() => {
          workbenchStore.addAction(data);
        });
      }

      workbenchStore.runAction(data);
    },
  },
});

function extractText(message: UIMessage): string {
  return Array.isArray((message as any).parts)
    ? (message as any).parts
        .filter((p: any) => p?.type === 'text' && typeof p.text === 'string')
        .map((p: any) => p.text)
        .join('')
    : ((message as any).content ?? '');
}

export function useMessageParser() {
  const [parsedMessages, setParsedMessages] = useState<{ [key: number]: string }>({});
  const parsedMessagesRef = useRef<{ [key: number]: string }>({});
  const prevMessagesRef = useRef<UIMessage[]>([]);
  const prevIsLoadingRef = useRef(false);

  const parseMessages = useCallback((messages: UIMessage[], isLoading: boolean) => {
    const messagesChanged = messages !== prevMessagesRef.current;
    const loadingChanged = isLoading !== prevIsLoadingRef.current;

    if (!messagesChanged && !loadingChanged) {
      return;
    }

    prevMessagesRef.current = messages;
    prevIsLoadingRef.current = isLoading;

    if (!isLoading) {
      messageParser.reset();

      const finalParsed: { [key: number]: string } = {};

      for (const [index, message] of messages.entries()) {
        if (message.role === 'assistant') {
          finalParsed[index] = messageParser.parse(message.id, extractText(message));
        }
      }

      messageParser.reset();
      parsedMessagesRef.current = finalParsed;
      setParsedMessages(finalParsed);
      return;
    }

    let hasChanges = false;
    const updated = { ...parsedMessagesRef.current };

    for (const [index, message] of messages.entries()) {
      if (message.role === 'assistant') {
        const delta = messageParser.parse(message.id, extractText(message));

        if (delta) {
          updated[index] = (updated[index] || '') + delta;
          hasChanges = true;
        }
      }
    }

    if (hasChanges) {
      parsedMessagesRef.current = updated;
      setParsedMessages({ ...updated });
    }
  }, []);

  return { parsedMessages, parseMessages };
}

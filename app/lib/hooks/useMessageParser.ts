import type { UIMessage } from 'ai';
import { useCallback, useRef, useState } from 'react';
import { StreamingMessageParser } from '~/lib/runtime/message-parser';
import { workbenchStore } from '~/lib/stores/workbench';
import { createScopedLogger } from '~/utils/logger';

const logger = createScopedLogger('useMessageParser');

const messageParser = new StreamingMessageParser({
  callbacks: {
    onArtifactOpen: (data) => {
      logger.trace('onArtifactOpen', data);

      workbenchStore.showWorkbench.set(true);
      workbenchStore.addArtifact(data);
    },
    onArtifactClose: (data) => {
      logger.trace('onArtifactClose');

      workbenchStore.updateArtifact(data, { closed: true });
    },
    onActionOpen: (data) => {
      logger.trace('onActionOpen', data.action);

      if (data.action.type !== 'shell') {
        workbenchStore.addAction(data);
      }
    },
    onActionClose: (data) => {
      logger.trace('onActionClose', data.action);

      if (data.action.type === 'shell') {
        workbenchStore.addAction(data);
      }

      workbenchStore.runAction(data);
    },
  },
});

export function useMessageParser() {
  const [parsedMessages, setParsedMessages] = useState<{ [key: number]: string }>({});
  const accumulatedRef = useRef<{ [key: number]: string }>({});

  const parseMessages = useCallback((messages: UIMessage[], isLoading: boolean) => {
    if (!isLoading) {
      messageParser.reset();
      accumulatedRef.current = {};

      const finalParsed: { [key: number]: string } = {};

      for (const [index, message] of messages.entries()) {
        if (message.role === 'assistant') {
          const text = Array.isArray((message as any).parts)
            ? (message as any).parts
                .filter((p: any) => p?.type === 'text' && typeof p.text === 'string')
                .map((p: any) => p.text)
                .join('')
            : ((message as any).content ?? '');

          finalParsed[index] = messageParser.parse(message.id, text);
        }
      }

      messageParser.reset();
      setParsedMessages(finalParsed);
      return;
    }

    const newAccumulated = { ...accumulatedRef.current };

    for (const [index, message] of messages.entries()) {
      if (message.role === 'assistant') {
        const text = Array.isArray((message as any).parts)
          ? (message as any).parts
              .filter((p: any) => p?.type === 'text' && typeof p.text === 'string')
              .map((p: any) => p.text)
              .join('')
          : ((message as any).content ?? '');

        const delta = messageParser.parse(message.id, text);
        newAccumulated[index] = (newAccumulated[index] || '') + delta;
      }
    }

    accumulatedRef.current = newAccumulated;
    setParsedMessages({ ...newAccumulated });
  }, []);

  return { parsedMessages, parseMessages };
}

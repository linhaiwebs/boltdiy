import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import type { Provider, ProviderConfig } from './types';

export const zhipuaiConfig: ProviderConfig = {
  id: 'zhipuai',
  name: 'ZhipuAI (智谱AI)',
  apiKeyEnvVar: 'ZHIPUAI_API_KEY',
  models: [
    {
      id: 'glm-5',
      name: 'GLM-5',
      description: 'Next-gen flagship model for Agentic Engineering. SOTA in coding & agent tasks with 744B parameters.',
      provider: 'zhipuai',
      maxTokens: 128000,
      contextWindow: 200000,
      capabilities: {
        tools: true,
        reasoning: true,
        coding: true,
        fast: false,
      },
      pricing: {
        input: 0.004,
        output: 0.018,
      },
      isDefault: true,
    },
    {
      id: 'glm-4.7',
      name: 'GLM-4.7',
      description: 'Latest flagship base model with comprehensive upgrades in reasoning, creation, and understanding.',
      provider: 'zhipuai',
      maxTokens: 65536,
      contextWindow: 200000,
      capabilities: {
        tools: true,
        reasoning: true,
        coding: true,
      },
      pricing: {
        input: 0.002,
        output: 0.008,
      },
    },
    {
      id: 'glm-4.7-flashx',
      name: 'GLM-4.7-FlashX',
      description: 'Fast and cost-effective version with 200K context window for quick responses.',
      provider: 'zhipuai',
      maxTokens: 65536,
      contextWindow: 200000,
      capabilities: {
        tools: true,
        coding: true,
        fast: true,
      },
      pricing: {
        input: 0.0005,
        output: 0.003,
      },
    },
    {
      id: 'glm-4.7-flash',
      name: 'GLM-4.7-Flash',
      description: 'Free model with 200K context for development and testing. Best value for experimentation.',
      provider: 'zhipuai',
      maxTokens: 65536,
      contextWindow: 200000,
      capabilities: {
        tools: true,
        coding: true,
        fast: true,
      },
      pricing: {
        input: 0,
        output: 0,
      },
    },
    {
      id: 'glm-4.6v',
      name: 'GLM-4.6V',
      description: 'Multimodal model with vision understanding for images, videos, files, and text.',
      provider: 'zhipuai',
      maxTokens: 65536,
      contextWindow: 128000,
      capabilities: {
        vision: true,
        tools: true,
        coding: true,
      },
      pricing: {
        input: 0.001,
        output: 0.003,
      },
    },
    {
      id: 'glm-4.6v-flashx',
      name: 'GLM-4.6V-FlashX',
      description: 'Fast multimodal model for quick visual understanding tasks.',
      provider: 'zhipuai',
      maxTokens: 65536,
      contextWindow: 128000,
      capabilities: {
        vision: true,
        tools: true,
        coding: true,
        fast: true,
      },
      pricing: {
        input: 0.00015,
        output: 0.0015,
      },
    },
    {
      id: 'glm-4.6v-flash',
      name: 'GLM-4.6V-Flash',
      description: 'Free multimodal model for visual understanding development and testing.',
      provider: 'zhipuai',
      maxTokens: 65536,
      contextWindow: 128000,
      capabilities: {
        vision: true,
        tools: true,
        coding: true,
        fast: true,
      },
      pricing: {
        input: 0,
        output: 0,
      },
    },
    {
      id: 'glm-4-plus',
      name: 'GLM-4-Plus',
      description: 'Legacy flagship model with enhanced reasoning capabilities.',
      provider: 'zhipuai',
      maxTokens: 8192,
      contextWindow: 128000,
      capabilities: {
        vision: true,
        tools: true,
        reasoning: true,
        coding: true,
      },
      pricing: {
        input: 0.05,
        output: 0.05,
      },
    },
    {
      id: 'glm-4-long',
      name: 'GLM-4-Long',
      description: 'Extended context model supporting up to 1M tokens for long document processing.',
      provider: 'zhipuai',
      maxTokens: 8192,
      contextWindow: 1000000,
      capabilities: {
        tools: true,
        coding: true,
        reasoning: true,
      },
      pricing: {
        input: 0.001,
        output: 0.001,
      },
    },
    {
      id: 'glm-4-air',
      name: 'GLM-4-Air',
      description: 'Balanced legacy model offering good performance at competitive pricing.',
      provider: 'zhipuai',
      maxTokens: 8192,
      contextWindow: 128000,
      capabilities: {
        tools: true,
        coding: true,
      },
      pricing: {
        input: 0.0005,
        output: 0.0005,
      },
    },
    {
      id: 'glm-4-airx',
      name: 'GLM-4-AirX',
      description: 'Legacy model with enhanced reasoning capabilities.',
      provider: 'zhipuai',
      maxTokens: 8192,
      contextWindow: 128000,
      capabilities: {
        tools: true,
        reasoning: true,
        coding: true,
      },
      pricing: {
        input: 0.01,
        output: 0.01,
      },
    },
    {
      id: 'glm-4-0520',
      name: 'GLM-4-0520',
      description: 'Stable legacy release with reliable performance and consistent outputs.',
      provider: 'zhipuai',
      maxTokens: 8192,
      contextWindow: 128000,
      capabilities: {
        vision: true,
        tools: true,
        coding: true,
      },
      pricing: {
        input: 0.1,
        output: 0.1,
      },
    },
  ],
};

export const zhipuaiProvider: Provider = {
  config: zhipuaiConfig,
  createModel: (apiKey: string, modelId?: string) => {
    const zhipuai = createOpenAICompatible({
      name: 'zhipuai',
      apiKey,
      baseURL: 'https://open.bigmodel.cn/api/paas/v4/',
    });
    const selectedModel = modelId || 'glm-5';

    return zhipuai(selectedModel);
  },
};

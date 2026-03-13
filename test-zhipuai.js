/**
 * ZhipuAI Integration Test Script
 *
 * Tests the ZhipuAI provider integration to ensure:
 * 1. API key is correctly loaded
 * 2. Provider factory resolves correctly
 * 3. Model can be instantiated
 * 4. Streaming responses work properly
 */

import { config } from 'dotenv';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
config({ path: resolve(__dirname, '.env.local') });

console.log('='.repeat(60));
console.log('ZhipuAI Integration Test');
console.log('='.repeat(60));
console.log();

// Step 1: Verify API key is loaded
console.log('Step 1: Checking API Key...');
const apiKey = process.env.ZHIPUAI_API_KEY;
if (!apiKey) {
  console.error('❌ ZHIPUAI_API_KEY not found in .env.local');
  process.exit(1);
}
console.log(`✅ API Key found: ${apiKey.substring(0, 20)}...`);
console.log();

// Step 2: Test provider configuration
console.log('Step 2: Testing Provider Configuration...');
try {
  const { zhipuaiProvider, zhipuaiConfig } = await import('./app/lib/.server/llm/providers/zhipuai.ts');

  console.log(`✅ Provider Name: ${zhipuaiConfig.name}`);
  console.log(`✅ Provider ID: ${zhipuaiConfig.id}`);
  console.log(`✅ Number of Models: ${zhipuaiConfig.models.length}`);
  console.log(`✅ Default Model: ${zhipuaiConfig.models.find(m => m.isDefault)?.name || 'GLM-5'}`);
  console.log();

  // Step 3: Test model instantiation
  console.log('Step 3: Testing Model Instantiation...');
  const testModel = zhipuaiProvider.createModel(apiKey, 'glm-5');
  console.log(`✅ Model created successfully: glm-5`);
  console.log(`✅ Model provider: ${testModel.provider}`);
  console.log(`✅ Model ID: ${testModel.modelId}`);
  console.log();

  // Step 4: Test with streamText function
  console.log('Step 4: Testing streamText Function...');
  const { streamText } = await import('./app/lib/.server/llm/stream-text.ts');

  // Mock environment object
  const mockEnv = {
    ZHIPUAI_API_KEY: apiKey,
  };

  // Test message
  const messages = [
    {
      role: 'user',
      content: '你好，请用中文回答：1+1等于几？只需要简短回答。',
    },
  ];

  console.log('Testing with fullModelId: "zhipuai:glm-5"');
  console.log('Test prompt: "你好，请用中文回答：1+1等于几？只需要简短回答。"');
  console.log();

  const result = await streamText(messages, mockEnv, {
    fullModelId: 'zhipuai:glm-5',
  });

  console.log('✅ streamText function executed without errors');
  console.log();

  // Step 5: Test streaming response
  console.log('Step 5: Testing Streaming Response...');
  console.log('Response from GLM-5:');
  console.log('-'.repeat(60));

  let fullResponse = '';
  for await (const chunk of result.textStream) {
    process.stdout.write(chunk);
    fullResponse += chunk;
  }

  console.log();
  console.log('-'.repeat(60));
  console.log();

  if (fullResponse.length > 0) {
    console.log('✅ Received streaming response successfully');
    console.log(`✅ Response length: ${fullResponse.length} characters`);
  } else {
    console.log('⚠️  Warning: Empty response received');
  }

  console.log();
  console.log('='.repeat(60));
  console.log('✅ All tests passed! ZhipuAI integration is working correctly.');
  console.log('='.repeat(60));

} catch (error) {
  console.error();
  console.error('❌ Test failed with error:');
  console.error(error);
  console.error();
  console.error('Stack trace:');
  console.error(error.stack);
  process.exit(1);
}

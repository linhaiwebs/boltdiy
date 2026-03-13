/**
 * Simple ZhipuAI API Test Script
 * Tests the ZhipuAI API directly without project dependencies
 */

const apiKey = 'e3f0dceeaf6a4de689dd645082bcaa25.wZEBA4bXCveNATNa';

console.log('='.repeat(60));
console.log('ZhipuAI API Direct Test');
console.log('='.repeat(60));
console.log();

console.log('API Key:', apiKey.substring(0, 20) + '...');
console.log('Endpoint: https://open.bigmodel.cn/api/paas/v4/chat/completions');
console.log('Model: glm-5');
console.log();

// Test with native fetch
async function testZhipuAI() {
  try {
    console.log('Sending test request...');
    console.log('Test prompt: "你好，请用中文回答：1+1等于几？只需要简短回答。"');
    console.log();

    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'glm-5',
        messages: [
          {
            role: 'user',
            content: '你好，请用中文回答：1+1等于几？只需要简短回答。',
          },
        ],
        stream: false,
        max_tokens: 100,
      }),
    });

    console.log('Response Status:', response.status, response.statusText);
    console.log();

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error Response:');
      console.error(errorText);
      console.error();
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    console.log('✅ API Response received successfully');
    console.log();
    console.log('Response Details:');
    console.log('-'.repeat(60));
    console.log('Model:', data.model);
    console.log('Created:', new Date(data.created * 1000).toISOString());
    console.log('Usage:');
    console.log('  - Prompt tokens:', data.usage?.prompt_tokens || 'N/A');
    console.log('  - Completion tokens:', data.usage?.completion_tokens || 'N/A');
    console.log('  - Total tokens:', data.usage?.total_tokens || 'N/A');
    console.log();
    console.log('Response Content:');
    console.log('-'.repeat(60));

    if (data.choices && data.choices.length > 0) {
      const content = data.choices[0].message?.content || 'No content';
      console.log(content);
      console.log('-'.repeat(60));
      console.log();

      if (content.length > 0) {
        console.log('✅ Response length:', content.length, 'characters');
        console.log('✅ Finish reason:', data.choices[0].finish_reason);
      }
    } else {
      console.log('⚠️  Warning: No choices in response');
      console.log('Full response:', JSON.stringify(data, null, 2));
    }

    console.log();
    console.log('='.repeat(60));
    console.log('✅ Test completed successfully!');
    console.log('✅ ZhipuAI GLM-5 model is working correctly.');
    console.log('='.repeat(60));

  } catch (error) {
    console.error();
    console.error('❌ Test failed with error:');
    console.error('Error message:', error.message);
    console.error();
    if (error.cause) {
      console.error('Cause:', error.cause);
    }
    console.error();
    console.error('Stack trace:');
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the test
testZhipuAI();

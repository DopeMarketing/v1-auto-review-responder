import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.CHATGPT_API_KEY,
});

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  id: string;
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
  }>;
}

export async function generateResponse(messages: ChatMessage[]): Promise<string> {
  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4',
      messages,
      max_tokens: 150,
    });
    return response.choices[0]?.message?.content || '';
  } catch (error) {
    throw new Error(`Failed to generate response: ${error}`);
  }
}

export async function generateReview(prompt: string): Promise<string> {
  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
    });
    return response.choices[0]?.message?.content || '';
  } catch (error) {
    throw new Error(`Failed to generate review: ${error}`);
  }
}
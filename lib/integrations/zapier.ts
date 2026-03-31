import axios from 'axios';

const client = axios.create({
  baseURL: 'https://hooks.zapier.com/hooks/catch',
  headers: {
    'Authorization': `Bearer ${process.env.ZAPIER_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export interface ZapierTrigger {
  id: string;
  url: string;
  status: string;
}

export interface ZapierWebhookData {
  [key: string]: any;
}

export async function triggerWebhook(hookId: string, data: ZapierWebhookData): Promise<any> {
  try {
    const response = await client.post(`/${hookId}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to trigger webhook: ${error}`);
  }
}

export async function sendReviewAlert(reviewData: ZapierWebhookData): Promise<any> {
  try {
    const response = await client.post('/review-alert', {
      timestamp: new Date().toISOString(),
      ...reviewData,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to send review alert: ${error}`);
  }
}
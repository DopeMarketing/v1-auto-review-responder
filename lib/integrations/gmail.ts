import { google } from 'googleapis';

const gmail = google.gmail({
  version: 'v1',
  auth: process.env.GMAIL_API_KEY,
});

export interface GmailMessage {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  payload: {
    headers: Array<{
      name: string;
      value: string;
    }>;
  };
}

export interface EmailData {
  to: string;
  subject: string;
  body: string;
}

export async function sendEmail(emailData: EmailData): Promise<any> {
  try {
    const message = [
      `To: ${emailData.to}`,
      `Subject: ${emailData.subject}`,
      '',
      emailData.body,
    ].join('\n');
    
    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: Buffer.from(message).toString('base64'),
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to send email: ${error}`);
  }
}

export async function getMessages(query?: string): Promise<GmailMessage[]> {
  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: query,
    });
    return response.data.messages || [];
  } catch (error) {
    throw new Error(`Failed to get messages: ${error}`);
  }
}
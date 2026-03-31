import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export interface TwilioMessage {
  sid: string;
  body: string;
  to: string;
  from: string;
  status: string;
  dateCreated: Date;
}

export interface SendMessageData {
  to: string;
  from: string;
  body: string;
}

export async function sendSMS(messageData: SendMessageData): Promise<TwilioMessage> {
  try {
    const message = await client.messages.create({
      body: messageData.body,
      from: messageData.from,
      to: messageData.to,
    });
    return message as TwilioMessage;
  } catch (error) {
    throw new Error(`Failed to send SMS: ${error}`);
  }
}

export async function getMessages(limit: number = 20): Promise<TwilioMessage[]> {
  try {
    const messages = await client.messages.list({ limit });
    return messages as TwilioMessage[];
  } catch (error) {
    throw new Error(`Failed to get messages: ${error}`);
  }
}
import Vapi from '@vapi-ai/web';

const vapiToken = process.env.NEXT_PUBLIC_WEB_TOKEN;

if (!vapiToken) {
  throw new Error('Vapi token is not defined. Please set NEXT_PUBLIC_WEB_TOKEN in your .env.local file.');
}

export const vapi = new Vapi(vapiToken);
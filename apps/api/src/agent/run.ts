import 'dotenv/config';

import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { getModel } from './model.helper';
import { getClientByName } from './tools/getClient';
const MODEL = getModel();

const run = async (message: string) => {
  const response = await generateText({
    model: openai(MODEL),
    prompt: message,
    tools: {
      getClientByName,
    },
  });
  return response.content;
};

export default run;

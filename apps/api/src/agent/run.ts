import "dotenv/config";

import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { getModel } from "./model.helper";

const MODEL = getModel();

const run = async (message: string) => {
    const response = await generateText({
        model: openai(MODEL),
        prompt: message        
    });
    return response.text;
};

export default run;
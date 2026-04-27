import "dotenv/config";

import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

const MODEL = "gpt-4o-mini";

const run = async (message: string) => {
    console.log(message);
    const response = await generateText({
        model: openai(MODEL),
        prompt: message        
    });
    return response.text;
};

export default run;
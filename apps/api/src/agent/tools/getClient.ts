import { tool, jsonSchema } from 'ai';
import * as v from 'valibot';
import { valibotSchema } from '@ai-sdk/valibot';
import { toJsonSchema } from '@valibot/to-json-schema'
import { clientService } from '@rmp/invoices-api';

const clientSearchSchema = v.object({
  companyName: v.pipe(v.string(), v.description('partial name of company name to search')),
});

type ClientSearchSchemaType = v.InferInput<typeof clientSearchSchema>;

export const getClientByName = tool({
  description: 'Search the clients by partial or full matching of companyName',
  inputSchema: jsonSchema(toJsonSchema(clientSearchSchema)) as any,
  execute: async ({ companyName } : ClientSearchSchemaType) => {
    const data = await clientService.getClientByName(companyName)
    return data
  },
});

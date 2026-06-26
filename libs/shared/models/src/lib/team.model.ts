import * as v from 'valibot';
import { rmpAddressSchema, rmpStringSchema } from './shared.model';


export const rmpTeamSchema = v.object({
    id: rmpStringSchema,
    companyName: rmpStringSchema,
    companyGSTIN: v.pipe(v.string(),v.minLength(10)),
    address: rmpAddressSchema,
    website: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    contactPhone: rmpStringSchema,
    currency: v.string(),
    createdAt: rmpStringSchema,
    updatedAt: rmpStringSchema
});

export type RMPTeam = v.InferOutput<typeof rmpTeamSchema>;

export interface RMPTeamModel {
    id: string;
    company_name: string;
    company_gstin: string;
    company_address_line: string;
    company_postal_code: string;
    company_country: string;
    company_city: string;
    company_state: string;
    website: string;
    contact_email: string;
    contact_phone: string;
    currency: string;
    created_at: string;
    updated_at: string;
}
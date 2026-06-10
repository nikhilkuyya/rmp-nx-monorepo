import { rmpAddressSchema, rmpStringSchema } from "./shared.model";
import * as v from 'valibot';

export const rmpClientSchema = v.object({
    id: v.optional(v.string()),
    companyName: rmpStringSchema,
    companyGSTIN: v.pipe(v.string(), v.minLength(10)),
    address: rmpAddressSchema,
    currency: v.optional(v.string()),
    invoiceEmail: v.pipe(v.string(),v.email()),
    createdAt: v.pipe(v.string()),
    updatedAt: v.pipe(v.string())
});

export type RMPClient = v.InferInput<typeof rmpClientSchema>;

export const rmpCreateClientPayloadSchema = v.object({
    companyName: rmpStringSchema,
    companyGSTIn: v.pipe(v.string(),v.minLength(10)),
    address: rmpAddressSchema,
    invoiceEmail: v.pipe(v.string(),v.email())
});

export type RMPCreateClientPaylod  = v.InferOutput<typeof rmpCreateClientPayloadSchema>;

export interface RMPClientModel {
    id: string;
    companyName: string;
    companyGSTIN: string;
    companyAddress: string;
    companyPostalCode: string;
    companyCountry: string;
    companyCity: string;
    companyState: string;
    currency: string;
    invoiceEmail: string;
    createdAt: string;
    updatedAt: string;
}
import * as v from 'valibot';

export const rmpStringSchema = v.pipe(
        v.string(),
        v.minLength(3),
        v.maxLength(60)
);

export type RmpString = v.InferOutput<typeof rmpStringSchema>

export const rmpAddressSchema = v.object({
    addressLine: rmpStringSchema,
    postalCode: v.pipe(v.string(), v.minLength(6), v.maxLength(10)),
    city: rmpStringSchema,
    state: rmpStringSchema,
    country: rmpStringSchema
})

export type RMPAddress = v.InferInput<typeof rmpAddressSchema>;
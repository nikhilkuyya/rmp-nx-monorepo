import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('clients').del();

  // Inserts seed entries
  await knex('clients').insert([
    {
      id: 'c2718fe2-431e-4c4e-a35f-031e2bdcb8eb',
      company_name: 'SYNDY PHARMA',
      company_gstin: '36ACCFS3263R1ZJ',
      company_address: '159/C, Phase-II, IDA, Cherlapally',
      company_postal_code: '500051',
      company_country: 'Bharat',
      company_state: 'Telangana',
      company_city: 'Hyderabad',
      currency: 'INR',
      invoice_email: 'info@syndygroups@gmail.com',
    },
    {
      id: '67cb938e-358d-45e4-acf1-5c22672334cd',
      company_name: 'O.T.C. PAINTS & CHEM PRIVATE LIMITED',
      company_gstin: '36AAACO4458P1ZW',
      company_address: 'IDA D-30, 10-I,  PHASE 1, Pashamyaram',
      company_postal_code: '502307',
      company_country: 'BHARAT',
      company_state: 'Telangana',
      company_city: 'Sangareddy',
      currency: 'INR',
      invoice_email: 'otcompaints1999@gmail.com',
    },
    {
      id: '19bd4f35-048e-47a8-b63f-31633f7d1ecd',
      company_name: 'TKM PHARMA',
      company_gstin: '36AACFT0383P1ZR',
      company_address: 'PLOT NO. 25, SURVERY, NO.460, MANKHAL, Rangareddy',
      company_postal_code: '501359',
      company_country: 'Bharat',
      company_state: 'Telangana',
      company_city: 'Hydarabad',
      currency: 'INR',
      invoice_email: 'reach@tkmpharma.com',
    },
  ]);
}

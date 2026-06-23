import type { Knex } from 'knex';

module.exports.seed = async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('teams').del();

  // Inserts seed entries
  await knex('teams').insert([
    {
      id: '534921bc-c4e6-48fd-8106-724aaee578b7',
      company_name: 'Ram Mohan Packaging',
      company_gstin: '36AGKPK6777E1Z0',
      company_address_line: '2-3-699/A/4, Govind Nagar, Amberpet',
      company_postal_code: '500013',
      company_country: 'Bharat',
      company_state: 'Telangana',
      company_city: 'Hyderabad',
      website: '',
      contact_email: 'rmp55577@gmail.com',
      contact_phone: '9642435577',
      currency: 'INR',
    },
  ]);
}

import { RMPClient, RMPClientModel, RMPCreateClientPaylod } from '@rmp/shared-models';

export function mapClientModelToDBModel(model: RMPCreateClientPaylod): RMPClientModel {
  return {
    company_name: model.companyName,
    company_gstin: model.companyGSTIn,
    invoice_email: model.invoiceEmail,
    company_address_line: model.address.addressLine,
    company_city: model.address.city,
    company_country: model.address.country,
    company_postal_code: model.address.postalCode,
    company_state: model.address.state,       
  };
}

export function mapDBModelToClientModel(model: RMPClientModel) : RMPClient {
  return {
    address: {
      addressLine: model.company_address_line,
      city: model.company_city,
      country: model.company_country,
      postalCode: model.company_postal_code,
      state: model.company_state
    },
    companyGSTIN: model.company_gstin,
    companyName: model.company_name,
    createdAt: model.created_at || '',
    updatedAt: model.updated_at || '',
    invoiceEmail: model.invoice_email,
    currency: model.currency,
    id: model.id
  }
}
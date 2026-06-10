import { RMPClient, RMPClientModel } from '@rmp/shared-models';

export function clientModelToDBMapper(model: RMPClient): RMPClientModel {
  return {
    id: model.id || '',
    companyName: model.companyName,
    companyAddress: model.address.address,
    companyCity: model.address.city,
    companyCountry: model.address.country,
    companyGSTIN: model.companyGSTIN,
    companyPostalCode: model.address.postalCode,
    companyState: model.address.state,
    currency: model.currency || '',
    createdAt: model.createdAt,
    invoiceEmail: model.invoiceEmail,
    updatedAt: model.updatedAt,
  };
}

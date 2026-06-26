import { RMPTeam, RMPTeamModel } from '@rmp/shared-models';

export function mapRMPTeamModelToDomain(team: RMPTeamModel): RMPTeam {
  return {
    id: team.id,
    companyName: team.company_name,
    companyGSTIN: team.company_gstin,
    contactPhone: team.contact_phone,
    contactEmail: team.contact_email,
    website: team.website,
    address: {
      addressLine: team.company_address_line,
      city: team.company_city,
      country: team.company_country,
      postalCode: team.company_postal_code,
      state: team.company_state,
    },
    createdAt: team.created_at,
    currency: team.currency,
    updatedAt: team.updated_at,
  };
}

export function mapRMPTeamDomainToModel(team: RMPTeam): RMPTeamModel {
  return {
    id: team.id,
    company_name: team.companyName,
    company_gstin: team.companyGSTIN,
    company_address_line: team.address.addressLine,
    company_city: team.address.city,
    company_country: team.address.country,
    company_postal_code: team.address.postalCode,
    company_state: team.address.state,
    contact_email: team.contactEmail || '',
    contact_phone: team.contactPhone,
    created_at: team.createdAt,
    currency: team.currency,
    updated_at: team.updatedAt,
    website: team.website || '',
  };
}

import { RMPAddress } from "./shared.model";

export interface RMPClientModel {
    id: string;
    companyName: string;
    companyGSTIn: string;
    address: RMPAddress;    
    currency: string;
    invoiceEmail: string;
    createdAt: string;
    updatedAt: string;    
}

export interface RMPCreateClientPaylod {
    companyName: string;
    companyGSTIn: string;
    address: RMPAddress;
    invoiceEmail: string;
}


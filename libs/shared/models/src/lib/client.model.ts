import { RMPAddress } from "./shared.model";

export interface RMPClient {
    id: string;
    companyName: string;
    companyGSTIn: string;
    address: RMPAddress;    
    currency: string;
    invoiceEmail: string;
    createdAt: string;
    updatedAt: string;    
}

export interface RMPClientPaylod {
    companyName: string;
    companyGSTIn: string;
    address: RMPAddress;
    invoiceEmail: string;
}


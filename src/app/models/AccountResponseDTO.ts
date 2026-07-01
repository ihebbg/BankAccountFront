import { CustomerResponseDTO } from "./CustomerResponseDTO";

export interface AccountResponseDTO {
    idBankAccount: number;
    balance: number;
    created: Date;
    currency: string;
    status: number,
    accountType: string;
    nameCustomer: string

}
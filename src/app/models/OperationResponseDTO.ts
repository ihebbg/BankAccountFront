import { AccountResponseDTO } from "./AccountResponseDTO";

export interface OperationResponseDTO {
  idAccountOperation: number;
  date: string,
  amount: number,
  type: string,
  accountType: string,
  nameCustomer:string

} 
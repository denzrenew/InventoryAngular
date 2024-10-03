/**
 * Interface model used for updating a bank
 */
export default interface UpdateBankPayload {
  id: number;
  accountNumber: string;
  accountHolderName: string;
  bankName: string;
  bankBranch: string;
  accountType: string;
  routingNumber: string;
  swiftBicCode: string;
  iban: string;
  notes: string;
  bsb: string;
  otp: number;
}
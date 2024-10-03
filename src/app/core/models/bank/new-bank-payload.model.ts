/**
 * Interface model used for creating a bank
 */
export default interface NewBankPayload {
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
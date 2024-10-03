export default interface BankDetailsModel {
    id: number;
    userId: number;
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
}
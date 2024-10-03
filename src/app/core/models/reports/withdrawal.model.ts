/**
 * Model for the Withdrawal
 */
 export default interface WithdrawalModel {
    id: number;
    userId: number;
    category: string;
    details: string;
    amount: number;
    status: string;
    dateTransfer: Date | null,
    createdDate: Date;
    lastModified: null,
    firstName: string;
    lastName: string;
    email: string;
    bankId: number;
    accountNumber: string;
    accountHolderName: string;
    bankName: string;
    bankBranch: string;
    accountType: string;
    routingNumber: string;
    swiftBicCode: string;
    iban: string;
    notes: string;
}
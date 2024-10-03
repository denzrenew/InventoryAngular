/**
 * Model for the Contract
 */
export default interface ContractModel {
    id: number;
    userId: number;
    source: string;
    transactionType: string;
    financial: string;
    amount: number;
    dateReceive: Date | null;
    createdDate: Date;
    lastModified: Date | null;
    firstName: string;
    lastName: string;
    email: string;
}
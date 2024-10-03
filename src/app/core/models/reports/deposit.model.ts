/**
 * Model for the Contract
 */
 export default interface DepositModel {
    id: number;
    userId: number;
    category: string;
    details: string;
    amount: number;
    status: string;
    dateTransfer: Date;
    createdDate: Date;
    firstName: string;
    lastName: string;
    email: string;
}
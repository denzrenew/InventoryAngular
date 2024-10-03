export default interface AdminWithdrawalModel {
    category: string;
    details: string;
    amount: number | string;
    userId: number | string;
    bankId: number | string;
}
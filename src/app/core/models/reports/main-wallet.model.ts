/**
 * Model for the MainWallet
 */
export default interface MainWalletModel {
    id: number;
    userId: number;
    amount: number;
    createdDate: Date;
    lastModified: Date | null;
    firstName: string;
    lastName: string;
    email: string;
}
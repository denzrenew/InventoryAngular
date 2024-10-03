/**
 * The Main wallet model response from the GetMainWalletByUserId endpoint
 */
export interface MainWallet {
    id: number;
    userId: number;
    amount: number;
    createdDate: Date;
    lastModified: Date;
}
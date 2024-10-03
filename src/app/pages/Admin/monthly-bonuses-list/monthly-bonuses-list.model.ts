import MonthlyBonusResponseModel from "src/app/core/models/monthly-bonuses/monthly-bonus.response.model";
import TransferToMainWalletModel from "src/app/core/models/monthly-bonuses/transfer-to-main-wallet.model";

export default interface MonthlyBonusModel {
    pageSize: number;
    pageNo: number;
    pagesArray: number[];
    totalPages: number;
    loading: boolean;
    firstLoad: boolean;
    silentRetrieval: boolean; // Silently retrieves all the items
    isProcessing: boolean;
    model: MonthlyBonusResponseModel[];
    totalNumberCount?: number;
    selectedItems: TransferToMainWalletModel[];
}
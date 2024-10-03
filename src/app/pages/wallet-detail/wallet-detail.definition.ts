import { TableColumn } from "../Generic/interface/TableColumn";
import { tableColumns } from './definition';
import { tableColumns2 } from './definition2';
import { tableColumnsGB1 } from './definition1-groupbonus';
import { tableColumnsMB1 } from './definition1-monthlyBonus';

export default interface WalletDefinition {
  walletType: string;
  listApi: string;
  transferPostUrl: string;
  transferAllPostUrl: string;
  transferCheckUrl: string;
  totalUrl: string;
  columns: TableColumn[];
  columns2: TableColumn[];
}

export const WALLET_TYPES = {
  REFERRAL_BONUS: 'referralbonus',
  UNILEVEL: 'unilevel',
  FAST_START: 'faststart',
  DIAMOND: 'diamond',
  GOLD: 'gold',
  PLATINUM: 'platinum',
};

export const WALLET_CONFIGURATION = {
  // DIRECT BONUSES
  [WALLET_TYPES.REFERRAL_BONUS]: {
    walletType: 'Sales Commission ',
    listApi: "/DirectBonus/GetDirectBonusByUserId",
    transferPostUrl: "/DirectBonus/TransferToMainWallet",
    transferAllPostUrl: "/DirectBonus/TransferAllDirectToMainWallet",
    transferCheckUrl: "/DirectBonus/ValidateTransferToMainWallet",
    totalUrl: "/MainWallet/GetDirectWalletAmount",
    columns: tableColumnsMB1,
    columns2: tableColumnsMB1
  },
  [WALLET_TYPES.UNILEVEL]: {
    walletType: 'Group Sales Commission ',
    listApi: "/DirectBonus/GetUnilevelByUserId",
    transferPostUrl: "/DirectBonus/TransferToMainWallet",
    transferAllPostUrl: "/DirectBonus/TransferAllUnilevelToMainWallet",
    transferCheckUrl: "/DirectBonus/ValidateTransferToMainWallet",
    totalUrl: "/MainWallet/GetUnileveWalletAmount",
    columns: tableColumnsGB1,
    columns2: tableColumnsGB1
  },

  // MONTHLY BONUSES
  [WALLET_TYPES.FAST_START]: {
    walletType: 'Subscription Points',
    listApi: "/MonthlyBonus/GetFastStartUserId",
    transferPostUrl: "/MonthlyBonus/TransferToMainWallet",
    transferAllPostUrl: "/MonthlyBonus/TransferAllByCategoryToMainWallet",
    transferCheckUrl: "/MonthlyBonus/ValidateTransferToMainWallet",
    totalUrl: "/MainWallet/GetFastStartWalletAmount",
    columns: tableColumns,
    columns2: tableColumns2
  },
  [WALLET_TYPES.DIAMOND]: {
    walletType: 'Diamond Bonus',
    listApi: "/MonthlyBonus/GetDiamondUserId",
    transferPostUrl: "/MonthlyBonus/TransferToMainWallet",
    transferAllPostUrl: "/MonthlyBonus/TransferAllByCategoryToMainWallet",
    transferCheckUrl: "/MonthlyBonus/ValidateTransferToMainWallet",
    totalUrl: "/MainWallet/GetDiamondWalletAmount",
    columns: tableColumns,
    columns2: tableColumns2
  },
  [WALLET_TYPES.GOLD]: {
    walletType: 'Gold Bonus',
    listApi: "/MonthlyBonus/GetGoldUserId",
    transferPostUrl: "/MonthlyBonus/TransferToMainWallet",
    transferAllPostUrl: "/MonthlyBonus/TransferAllByCategoryToMainWallet",
    transferCheckUrl: "/MonthlyBonus/ValidateTransferToMainWallet",
    totalUrl: "/MainWallet/GetGoldWalletAmount",
    columns: tableColumns,
    columns2: tableColumns2
  },
  [WALLET_TYPES.PLATINUM]: {
    walletType: 'Platinum Bonus',
    listApi: "/MonthlyBonus/GetPlatinumUserId",
    transferPostUrl: "/MonthlyBonus/TransferToMainWallet",
    transferAllPostUrl: "/MonthlyBonus/TransferAllByCategoryToMainWallet",
    transferCheckUrl: "/MonthlyBonus/ValidateTransferToMainWallet",
    totalUrl: "/MainWallet/GetPlatinumWalletAmount",
    columns: tableColumns,
    columns2: tableColumns2
  }
};
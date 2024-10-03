/**
 * Model that represents the Consolidated Wallet
 */
export default interface ConsolidatedWalletModel {
  id: number;
  parentUserId: number;
  parentFirstName: string;
  parentLastName: string;
  parentEmail: string;
  childUserId: number;
  referFirstName: string;
  referLastName: string;
  referEmail: string;
  packageAmount: number;
  packageReward: number;
  dateReceive: Date;
  isTransferred: boolean;
  dateTransferred: Date | null;
  createdDate: Date;
  lastModified: Date | null;
  contractId: number;
}
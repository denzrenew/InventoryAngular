/**
 * Retrieves all the wallets
 */
export default interface WalletsModel {
    directWallet: {
      transferred: number;
      untransferred: number;
    }
    monthlyWallet: {
      transferred: number;
      untransferred: number;
    }
    groupWallet: {
      transferred: number;
      untransferred: number;
    }
    mainWallet: number;
    totalLifetimeEarnings?: number;
}
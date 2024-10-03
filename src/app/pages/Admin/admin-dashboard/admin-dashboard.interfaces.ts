import { ChartType } from "../../dashboards/default/dashboard.model";

interface LoadingScreens {
  profile: boolean, // Profile section
  efficiency: boolean, // Efficiency section
  wallets: { 
    direct: boolean, 
    monthly: boolean, 
    group: boolean, 
  }, // Wallets section
  myNetwork: boolean, // Network section
  referrals: { direct: boolean, unallocated: boolean, } // Referrals section
}

interface Charts {
  pieChart: any;
  directBonusChart: ChartType;
  monthlyBonusChart: ChartType;
  groupBonusChart: ChartType;
  totalEarningsChart: ChartType;
}

export { LoadingScreens, Charts };
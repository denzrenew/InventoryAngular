import UnallocatedUsers from "src/app/core/models/group/unallocated.model";
import EfficiencyData from "../../dashboards/default/interfaces/efficiency-data.interface";
import { UserProfile } from "../../dashboards/default/interfaces/user-profile.interface";
import { DirectBonus } from "src/app/core/models/direct-bonus/direct-bonus.model";
import VolumeModel from "src/app/core/models/group/volume.model";
import WalletsModel from "src/app/core/models/wallets.model";

export default interface AdminDashboardModels {
    userProfile: UserProfile;
    efficiencyData: EfficiencyData;
    wallets: WalletsModel;
    unallocatedUsers: UnallocatedUsers[];
    directReferralUsers: DirectBonus[];
    volumeModel?: VolumeModel;
    contractAmount: number;
    series: number[];
}
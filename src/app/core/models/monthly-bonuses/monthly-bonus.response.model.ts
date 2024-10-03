export default interface MonthlyBonusResponseModel {
    id: number;
    userId: number;
    packageAmount: number;
    packageReward: number;
    rewardType: string;
    dateReceive: Date | null;
    isTransferred: boolean;
    dateTransferred: Date | null;
    createdDate: Date | null;
    firstName: string;
    lastName: string;
    email: string;
    degree: number;
    flashOutValue: string | null;
}
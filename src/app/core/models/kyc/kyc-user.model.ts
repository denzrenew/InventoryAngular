/**
 * Model representation of a user for KYC
 */
export default interface KycUserModel {
    id: number;
    isActive: boolean;
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    primaryApproval: string;
    secondaryApproval: string;
}
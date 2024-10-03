/**
 * The expected payload when updating a user in KYC
 */
export default interface KycUpdatePayload {
    userId: number,
    comment: string;
    isApproved: boolean;
}
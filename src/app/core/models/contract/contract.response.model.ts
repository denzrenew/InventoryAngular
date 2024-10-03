/**
 * Response model from GetContractByUserId
 */
export default interface ContractResponseModel {
    id: number;
    ownerUserId: number;
    referByUserId: number;
    amount: number;
    isActive: boolean,
    degree: number,
    startAt: Date;
    expiration: Date;
    contractAttachment: string | null;
    contractType: string;
    isAutoRenew: boolean;
    createdDate: Date;
    lastModified: Date | null
}
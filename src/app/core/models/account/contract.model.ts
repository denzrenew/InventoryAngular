/**
 * Returned model for the Contract/GetContractByUserId
 */
export default interface ContractModel {
    id: number;
    ownerUserId: number;
    referByUserId: number;
    amount: number;
    isActive: boolean,
    degree: number;
    startAt: Date;
    expiration: Date;
    contractAttachment: string;
    isAutoRenew: boolean;
    createdDate: Date;
    lastModified: Date | null;
}
export default interface KycInitialData {
    primaryData: string[];
    secondaryData: string[];
    primaryVerification?: PrimaryVerificationModel;
    secondaryVerification?: SecondaryVerificationModel;
}

/**
 * Primary Verification payload or data result
 */
export interface PrimaryVerificationModel {
    identificationType: string;
    identificationDocNo: string;
    identificationCardNo: string;
    identificationIssuingAuth: string;
    identificationExpiration: string;
    indentificationFront: string;
    indentificationBack: string;
    identificationFront?: string;
    identificationBack?: string;

    createdDate?: Date;
    lastModified?: Date;
    isApproved?: boolean;
    comment?: string;
}

/**
 * Secondary Verification payload or data result
 */
export interface SecondaryVerificationModel {
    identificationType: string;
    identificationFront: string;
    identificationBack: string;

    createdDate?: Date;
    lastModified?: Date;
    isApproved?: boolean;
    comment?: string;
}
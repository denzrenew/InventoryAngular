/**
 * The jwt_decode value
 */
export default interface AuthModel {
    aud: string;
    exp: number;
    id: string;
    iss: string;
    role: string;
    userId: string;
    primaryIdentification: string;
    primaryComment: string;
    secondaryIdentification: string;
    secondaryComment: string;
    bankStatus: string;
}
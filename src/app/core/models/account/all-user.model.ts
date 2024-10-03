/**
 * The expected model response from the endpoint: /Account/GetAllUsers
 */
export default interface AllUserModel {
    id: number;
    isActive: boolean;
    firstName: string;
    lastName: string;
    middleName: string;
    country: string;
    mobile: string;
    referralCode: string;
    email: string;
    username: string;
    accountType: string;
    hasTwoAuth: boolean;
}
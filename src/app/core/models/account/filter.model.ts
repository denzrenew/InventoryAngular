/**
 * The filter model for the Account/GetAll endpoint
 */
export default interface FilterModel {
    isActive?: boolean;
    firstName?: string;
    lastName?: string;
    country?: string;
    mobile?: string;
    referralCode?: string;
    username?: string;
    email?: string;
}
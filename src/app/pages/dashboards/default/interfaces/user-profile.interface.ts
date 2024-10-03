/**
 * Expected response from the api
 */
export interface UserProfile {
    accountType: string | null;
    birthDate: Date | null;
    country: string | null;
    countryCode: string | null;
    email: string | null;
    firstName: string | null;
    isActive: boolean | null;
    lastName: string | null;
    middleName: string | null;
    mobile: string | null;
    profilePicture: string | null;
    referralCode: string | null;
}
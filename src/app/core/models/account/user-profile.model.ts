/**
 * The user model response from the api server
 */
export default interface UserProfileModel {
    isActive: boolean;
    firstName: string;
    attachment: string;
    lastName: string;
    middleName: string;
    country: string;
    countryCode: string;
    mobile: string;
    birthDate: string;
    referralCode: string;
    profilePicture: string;
    email: string;
    accountType: string;
    hasTwoAuth: boolean | null;

    // Additional properties
    birthPlace?: string;
    nationality?: string;
    occupation?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    youtube?: string;
    facebook?: string;
    whatsapp?: string;
    instagram?: string;
    twitter?: string;
   

}

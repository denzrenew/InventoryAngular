/**
 * The model for posting update data for user
 */
export default interface UpdateUser {
    isActive: boolean;
    firstName: string;
    lastName: string;
    middleName: string;
    country: string;
    countryCode: string;
    mobile: string;
    birthDate: Date | null;

    birthPlace?: string;
    nationality?: string;
    occupation?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    attachment?: string;
    facebook?: string;
    youtube?: string;
    twitter?: string;
    whatsapp?: string;
    instagram?: string;
}
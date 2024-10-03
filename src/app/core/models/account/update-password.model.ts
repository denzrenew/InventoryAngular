/**
 * Expected model for the endpoint "/Api/Account/UpdatePassword"
 */
export default interface UpdatePassword {
    password: string;
    confirmPassword: string;
}
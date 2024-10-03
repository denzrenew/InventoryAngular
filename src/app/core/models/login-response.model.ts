/**
 * API Model response after logging in
 */
export interface LoginResponse {
    status: string;
    access_token: string;
    exp: Date;
    refresh_token: string;
}
/**
 * General response model from the API
 */
export interface ApiResponse<T> {
    status: string;
    data: T | null;
    totalRecordCount?: number | null;
    totalRecord?: number | null;
};
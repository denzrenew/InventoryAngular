/**
 * Model used for retrieving large data
 */
export default interface QueryModel {
    filters: string | object;
    pageSize: number;
    pageNo: number;
}
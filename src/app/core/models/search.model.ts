/**
 * Contains all the possible filter fields to be used when requesting from an api server
 */
export default interface SearchModel {
    filters: string;
    pageSize: number;
    pageNo: number;
}
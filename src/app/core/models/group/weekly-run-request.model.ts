/**
 * The expected `GET` parameters for the endpoint `/Group/GetGroupBonusByUserId`
 */
export default interface WeeklyRunRequestModel {
  filters: object;
  pageSize: number;
  pageNo: number;
  isTransferred: boolean;
}
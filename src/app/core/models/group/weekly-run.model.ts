/**
 * The expected response model from the endpoint `api/Group/GetGroupBonusByUserId`
 */
export default interface WeeklyRunModel {
  id: number;
  groupId: number;
  degree: number;
  parentId: number;
  bonusAmount: number;
  totalAmountLeft: number;
  totalAmountRight: number;
  spillOverLeftAmount: number;
  spillOverRightAmount: 0,
  processDate: Date | null;
  isTransferred: boolean;
  isSpillOverProcessed: boolean;
  createdDate: Date;
  lastModified: Date | null;
}
export const LEFT_SIDE = 1;
export const RIGHT_SIDE = 2;

export default interface OrgChartModel {
    id: number | string;
    parentId: number;
    referralCode: string;
    position: number;
    firstName: string | null;
    lastName: string | null;
}
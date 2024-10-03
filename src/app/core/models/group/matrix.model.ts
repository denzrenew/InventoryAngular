/**
 * Interface model representation from the endpoints for /Group/Matrix
 */
export default interface Matrix {
  id: number;
  childUserId: number;
  parentUserId: number;
  placementSide: number;
  level: number;
  parentReferralCode: string;
  childReferralCode: string;
  contractAmount: number;
  contractIsActive: boolean,
  contractDegree: number;
  parentFirstName: string;
  parentLastName: string;
  childFirstName: string;
  childLastName: string;
}
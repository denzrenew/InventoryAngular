/**
 * The expected response from the endpoint /api/DirectBonus/GetDirectBonusByUserId
 */
export interface DirectBonus {
  id: number;
  parentUserId: number,
  parentFirstName: string;
  parentLastName: string;
  parentEmail: string;
  childUserId: number,  
  referFirstName: string;
  referLastName: string;
  referEmail: string;
  packageAmount: number,
  packageReward: number,
  degree: number,
  isUpgrade: boolean,
  dateReceive: Date;
  isTransferred: boolean | null,
  dateTransferred: Date | null,
  flashOutValue: number | null,
  createdDate: Date;
  lastModified: Date | null;
}
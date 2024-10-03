/**
 * Return model from the getUnPositionedUsers endpoint
 */
export default interface UnallocatedUsers {
    id: number;
    parentUserId: number;
    referByFirstName: string;
    referByLastName: string;
    referByEmail: string;
    childUserId: number;
    firstName: string;
    lastName: string;
    email: string;
    isPlaced: boolean;
    noOfDaysForAutoAllocate: boolean;
    createdDate: Date;
}
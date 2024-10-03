export default interface StateModel {
    loading: boolean;
    userId: number;
    validUpdateStates: string[];
}

export const InitialState = (): StateModel => {
    return {
        loading: true,
        userId: -1,
        validUpdateStates: [ "Approve", "Reject", ]
    }
}
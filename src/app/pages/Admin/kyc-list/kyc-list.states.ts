import { FormBuilder, FormGroup } from "@angular/forms";
import KycUserModel from "src/app/core/models/kyc/kyc-user.model";

export default interface StateModel {
    loading: boolean;
    isFirstLoad: boolean;
    isNavigating: boolean;
    kycUsers: KycUserModel[];
    search: {
      filters: string,
      pageSize: number,
      pageNo: number
    };
    searchForm: FormGroup;
    pagination: {
        pageNo: number,
        pageSize: number,
        pagesArray: number[],
        totalPages: number,
        totalRecord: number
    },
    statusList: string[],
}

const _searchForm = {
    isActive: [true, [ ]],
    firstName: [ '', [ ]],
    lastName: [ '', [ ]],
    middleName: [ '', [ ]],
    email: [ '', [ ]],
    primary: [ '', [ ]],
    secondary: [ '', [ ]],
}

export const _searchFormDefaults = {
    isActive: true,
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    primary: '',
    secondary: '',
}

export const InitialData = (formBuilder: FormBuilder): StateModel => {
    return {
        loading: true,
        isFirstLoad: true,
        isNavigating: true,
        kycUsers: [],
        search: {
            filters: "{'':''}",
            pageNo: 1,
            pageSize: 10
        },
        searchForm: formBuilder.group(_searchForm),
        pagination: {
            pageNo: 1,
            pageSize: 10,
            pagesArray: [],
            totalRecord: 0,
            totalPages: 1,
        },
        statusList: [
            "Approved",
            "Rejected",
            "Completed",
            "Incomplete"
        ]
    }
}
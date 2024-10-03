import { Validators } from "@angular/forms"

/**
 * Get the update form
 */
export const getForm = () => {
    return {
        id: ['', [ Validators.required, ]],
        isReadByAdmin: [false, []],
        adminReply: ['', [ Validators.required, Validators.minLength(5), Validators.maxLength(500) ]],
    };
}

/**
 * Retrieve the search form
 */
export const searchForm = {
    value: ['', []],
}
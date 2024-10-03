/**
 * The search form for the profile's list
 */
const searchForm = {
    isActive: [true, []],
    firstName: ['', []],
    lastName: ['', []],
    country: ['', []],
    mobile: ['', []],
    referralCode: ['', []],
    username: ['', []],
    email: ['', []],
}

export const searchFormDefaults = {
    isActive: true,
    firstName: '',
    lastName: '',
    country: '',
    mobile: '',
    referralCode: '',
    email: '',
    username: '',
}

export default searchForm;
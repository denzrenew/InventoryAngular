import { formatDate } from "@angular/common";
import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import UserProfileModel from "src/app/core/models/account/user-profile.model";
import Country from "src/app/core/models/country";

const dt = new Date();
const maxDate = new Date(dt.setFullYear(dt.getFullYear() - 16));
const minDate = new Date(dt.setFullYear(dt.getFullYear() - 120));
let validCountries: string[] = [];

const validateBirthday = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value);

      if (selectedDate > maxDate) {
        return { maxDate: true };
      }

      if (selectedDate < minDate) {
        return { minDate: true };
      }

      return null;
  }
}

const mobileNumberValidator = (control: AbstractControl): ValidationErrors | null => {
  // Use a regular expression to check if the input contains valid characters
  const validCharacters = /^[0-9+()-]*$/;
  const isValid = validCharacters.test(control.value);

  // If the input is valid, return null (no errors)
  return isValid ? null : { invalidMobileNumber: true };
}

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
  const password = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { 'passwordMismatch': true };
  }

  return null;
}

export function isValidCountry(): (control: AbstractControl) => { [key: string]: boolean } | null {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const selectedItem = control.value;

    if (selectedItem && !validCountries.includes(selectedItem)) {
      return { invalidCountry: true };
    }

    return null;
  };
}

/**
 * Sets the valid countries
 * @param countries 
 */
export const setValidCountries = (countries: Country[]): void => {
  validCountries = countries.map(i => i.country);
}

/**
 * Retrieves the form for personal details
 * @param model 
 * @returns 
 */
export const getUserUpdateFormGroup = (model: UserProfileModel) => {
  return {
    isActive: [ true, [] ],
    firstName: [ model.firstName, [ Validators.required, Validators.minLength(2), Validators.maxLength(50) ]],
    lastName: [ model.lastName, [ Validators.required, Validators.minLength(2), Validators.maxLength(50) ]],
    middleName: [ model.middleName, [ Validators.minLength(2), Validators.maxLength(50) ]],
    country: [ model.country, [ Validators.required, isValidCountry() ]],
    countryCode: [ model.countryCode, [ Validators.required ]],
    mobile: [ model.mobile, [ Validators.required, Validators.minLength(5), Validators.maxLength(20), mobileNumberValidator ]],
    birthDate: [ formatDate(model.birthDate, "yyyy-MM-dd", "en"), [ Validators.required, validateBirthday() ]],
    birthPlace: [ model.birthPlace, [ Validators.required, Validators.maxLength(50) ]],
    nationality: [ model.nationality, [ Validators.required, Validators.maxLength(30) ]],
    occupation: [ model.occupation, [ Validators.required, Validators.maxLength(30) ]],
    address: [ model.address, [ Validators.required, Validators.maxLength(100) ]],
    city: [ model.city, [ Validators.required, Validators.maxLength(30) ]],
    state: [ model.state, [ Validators.required, Validators.maxLength(30) ]],
    zipCode: [ model.zipCode],
    facebook: [ model.facebook],
    youtube: [ model.youtube],
    twitter: [ model.twitter],
    whatsapp: [ model.whatsapp],
    instagram: [ model.instagram],
    attachment: [ '', ],
  }
}

/**
 * Retrieves the form for updating the referral code
 * @returns 
 */
export const getUpdateReferralFormGroup = () => {
  return {
    newReferralCode: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(50) ]]
  }
}

/**
 * Retrieves the form for changing of password
 * @returns 
 */
export const getChangePassFormGroup = () => {

  //get email here
  return {
    pinCode: ['', [ Validators.required]],
    newPassword: ['', [ Validators.required, Validators.minLength(6), Validators.maxLength(100) ]],
    confirmPassword: ['', [ Validators.required, Validators.minLength(6), Validators.maxLength(100) ]]
  }
}

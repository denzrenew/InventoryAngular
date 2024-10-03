import { formatDate } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import AuthModel from "src/app/core/models/account/auth.model";
import UserProfileModel from "src/app/core/models/account/user-profile.model";
import BankDetailsModel from "src/app/core/models/bank/bank-details.model";
import Country from "src/app/core/models/country";
import KycInitialData, { PrimaryVerificationModel, SecondaryVerificationModel } from "src/app/core/models/kyc/kyc-initial-data.model";

export default interface StateModel {
  isMobile: boolean;
  loading: boolean;
  load: {
    personalInfo: boolean,
    verifications: boolean,
    bank: boolean
  };
  retrievedOTP: boolean;
  isSubmitting: {
    personalInfo: boolean,
    primaryVerification: boolean,
    secondaryVerification: boolean,
    bankRegistration: boolean
  }
  userModel?: UserProfileModel;
  kycModel: KycInitialData;
  bankTypes: string[];
  bank?: BankDetailsModel;

  primaryVerificationComment: string;
  primaryVerificationStatus: string,
  secondaryVerificationComment: string;
  secondaryVerificationStatus: string;

  personalVerification?: FormGroup;
  primaryVerification: FormGroup;
  secondaryVerification: FormGroup;
  bankRegistration: FormGroup;

  formStep: 0 | 1 | 2 | 3; // Steps of the form
  countries: Country[];
  selectedCountry?: Country;

  tabLocks: {
    personal: boolean,
    primary: boolean,
    secondary: boolean,
    bank: boolean
  };
}

export const personalVerification = (userModel: UserProfileModel) => {
  return {
    firstName: [userModel.firstName, [ Validators.required ]],
    middleName: [userModel.middleName, [ ]],
    lastName: [userModel.lastName, [ Validators.required ]],
    birthDate: [formatDate(userModel.birthDate, "yyyy-MM-dd", "en"), [ Validators.required ]],
    mobile: [userModel.mobile, [ Validators.required ]],
    country: [userModel.country, [ Validators.required ]],
    birthPlace: [userModel.birthPlace, [ Validators.required, Validators.maxLength(50) ]],
    nationality: [userModel.nationality, [ Validators.required, Validators.maxLength(30) ]],
    occupation: [userModel.occupation, [ Validators.required, Validators.maxLength(30) ]],
    address: [userModel.address, [ Validators.required, Validators.maxLength(100) ]],
    city: [userModel.city, [ Validators.required, Validators.maxLength(30) ]],
    state: [userModel.state, [ Validators.required, Validators.maxLength(30) ]],
    zipCode: [userModel.zipCode, [ Validators.required, Validators.maxLength(10) ]],
    attachment: [ '', [] ],
  };
}

export const primaryVerification = (model?: PrimaryVerificationModel) => {
  return {
    IdentificationType: [ model?.identificationType ?? '', [Validators.required, Validators.maxLength(50)] ],
    IdentificationDocNo: [ model?.identificationDocNo ?? '', [Validators.required, Validators.maxLength(50)] ],
    IdentificationCardNo: [ model?.identificationCardNo ?? '', [Validators.required, Validators.maxLength(50)] ],
    IdentificationIssuingAuth: [ model?.identificationIssuingAuth ?? '', [Validators.required, Validators.maxLength(50)] ],
    IdentificationExpiration: [ model?.identificationExpiration ? formatDate(model?.identificationExpiration, "yyyy-MM-dd", "en") : '', [Validators.required, Validators.maxLength(50),] ],
    IndentificationFront: [ '', [] ],
    IndentificationBack: [ '', [] ],
  }
};

export const secondaryVerification = (model?: SecondaryVerificationModel) => {
  return {
    IdentificationType: [ model?.identificationType ?? '', [Validators.required, Validators.maxLength(50)] ],
    IndentificationFront: [ '', ],
    IndentificationBack: [ '', ],
  }
};

export const bankRegistrationForm = (model?: BankDetailsModel) => {

  return {
    accountType: [ model?.accountType ?? '', [ Validators.required ]],
    accountNumber: [ model?.accountNumber ?? '',[ Validators.required, Validators.maxLength(20)]],
    accountHolderName: [ model?.accountHolderName ?? '', [ Validators.required ]],

    bankName: [ model?.bankName ?? '', [ Validators.required ]],
    bankBranch: [ model?.bankBranch ?? '', [ Validators.required ]],
    routingNumber: [ model?.routingNumber ?? ''],

    bsb: [ model?.bsb ?? ''],
    swiftBicCode: [ model?.swiftBicCode ?? ''],
    iban: [ model?.iban ?? '', ],

    notes: [ model?.notes ?? '', [Validators.maxLength(255)]]
  }
}

/**
 * Generates the Initial data for the KYC component
 * @param formBuilder
 * @param authModel
 * @returns
 */
export const InitialData = (formBuilder: FormBuilder, authModel: AuthModel): StateModel => {
  return {
      kycModel: {
        primaryData: [],
        secondaryData: [],
      },
      bankTypes: [],
      isMobile: false,
      loading: true,
      retrievedOTP: false,
      isSubmitting: {
        personalInfo: false,
        primaryVerification: false,
        secondaryVerification: false,
        bankRegistration: false
      },
      primaryVerification: formBuilder.group(primaryVerification()),
      secondaryVerification: formBuilder.group(secondaryVerification()),
      primaryVerificationComment: authModel.primaryComment,
      primaryVerificationStatus: authModel.primaryIdentification,
      secondaryVerificationComment: authModel.secondaryComment,
      secondaryVerificationStatus: authModel.secondaryIdentification,
      bankRegistration: formBuilder.group(bankRegistrationForm()),

      formStep: 0,
      countries: [],
      load: {
        personalInfo: true,
        verifications: true,
        bank: true
      },
      tabLocks: {
        personal: false,
        primary: true,
        secondary: true,
        bank: true
      },
  };
}

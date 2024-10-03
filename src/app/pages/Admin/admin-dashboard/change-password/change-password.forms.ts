import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value: string = control.value || '';

        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        const hasNumber = /\d/.test(value);

        const valid = hasUppercase && hasLowercase && hasSpecialCharacter && hasNumber;

        return valid ? null : { 'weakPassword': true };
    };
}

function confirmPasswordValidator(passwordControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.root.get(passwordControlName)?.value;
      const confirmPassword = control.value;
  
      return password === confirmPassword ? null : { 'passwordMismatch': true };
    };
}

export const form = () => {
    return {
        password: ['', [ Validators.required, Validators.minLength(6), Validators.maxLength(100), ]],
        confirmPassword: ['', [ Validators.required, Validators.minLength(6), Validators.maxLength(100), confirmPasswordValidator('password') ]],
        // adminPassword: ['', [ Validators.required, Validators.minLength(8), Validators.maxLength(100), passwordValidator() ]],
        captcha: ['', [ Validators.required, ]],
    }
}

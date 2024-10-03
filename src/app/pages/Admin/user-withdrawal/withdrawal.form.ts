import { AbstractControl, Validators } from "@angular/forms";
import BankOptions from "src/app/core/models/bank/bank.model";

let validBanks: number[] = [];
const validCategories: string[] = [
    "Personal",
    "SMSF",
    "USDT TRC20",
];

export function isValidBank(): (control: AbstractControl) => { [key: string]: boolean } | null {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const selectedItem = control.value;
    
    if (selectedItem && !validBanks.includes(parseInt(selectedItem))) {
      return { invalidBank: true };
    }
  
    return null;
  };
}

export function isValidCategory(): (control: AbstractControl) => { [key: string]: boolean } | null {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const selectedItem = control.value;
    
      if (selectedItem && !validCategories.includes(selectedItem)) {
        return { invalidCategory: true };
      }
    
      return null;
    };
  }

const form = (bankOptions: BankOptions[], walletAmount: number) => {
  const selectedBank = bankOptions.length === 1 ? bankOptions[0].id : '';
  validBanks = bankOptions.map(bank => bank.id);
  let maxamount = walletAmount > 25000 ? 25000 : walletAmount
  return {
    category: [ '', [ Validators.required, isValidCategory() ]],
    amount: [ 0.00, [ Validators.required, Validators.max(maxamount), Validators.min(100) ]],
    fee: [ 0.00, [ Validators.required ]],
    bankId: [selectedBank, [ Validators.required, isValidBank() ]],
    details: ['', [ Validators.required, Validators.maxLength(250) ]]
  }
}

export default form;

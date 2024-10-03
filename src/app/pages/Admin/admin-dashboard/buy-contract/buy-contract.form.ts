import { Validators } from "@angular/forms";

const form = (mainWalletAmount: number = 0) => {
    
    return {
        amount: [0, [ Validators.required, Validators.max(mainWalletAmount), Validators.min(1), Validators.pattern("^[0-9]*$") ]],
        isAutoRenew: [ false ]
    }
}

export { form };

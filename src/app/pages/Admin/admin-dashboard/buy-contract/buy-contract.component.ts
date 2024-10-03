import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ApiResponse } from "src/app/core/models/api-response.model";
import ContractResponseModel from "src/app/core/models/contract/contract.response.model";
import { ContractService } from "src/app/core/services/contractService";
import { form } from "./buy-contract.form";
import { WalletsService } from "src/app/core/services/wallets.service";
import { MainWallet } from "src/app/core/models/main-wallet.model";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";

@Component({
    selector: 'app-buy-contract',
    templateUrl: './buy-contract.component.html',
    styleUrls: ['./buy-contract.component.scss']
})
export class BuyContractComponent implements OnInit {
  @Input() userId: number;
  @Input() callback?: any;
  @Input() modal?: any;

  protected loading = {
    contract: true,
    mainWallet: true,
    submit: false,
  };
  protected model?: ContractResponseModel;
  protected form?: FormGroup;
  protected mainWallet: number = 0;
  protected isNew: boolean = true;
  protected canCreateContract: boolean = true;
  
  constructor(private contractService: ContractService,
    private walletService: WalletsService,
    private toastService: ToastrService,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group(form(0));
  }

  ngOnInit(): void {
    this.retrieveMainWallet();
  }

  private retrieveMainWallet(): void {
    this.walletService.getMainWalletByUserId(
      (response: ApiResponse<MainWallet[]>) => {
        if(response && response.status === 'success' && response.data.length > 0) {
          this.mainWallet = response.data[0].amount;
          
          this.form = this.formBuilder.group(
            form(this.mainWallet > 0 
              ? this.mainWallet 
              : -1
            )
          );
        }
      },
      (error: any) => console.log("Error retrieving main wallet in buy-contract-component", error),
      () => {
        this.loading.mainWallet = false;
        this.retrieveContracts();
      },
      this.userId);
  }

  private retrieveContracts() {
    this.contractService.getContractByUserId(
      (response: ApiResponse<ContractResponseModel[]>) => {
        if(response && response.status === 'success') {
          if(response.data.length > 0) {
            const expiration = new Date(response.data[0].expiration);
            const contractAmount = response.data[0].amount;

            this.canCreateContract = contractAmount <= 0 && expiration < new Date();

            this.model = response.data[0];
            this.isNew = false;
        }
      }
    }, 
    (error: any) => console.log("Error retrieving contract in buy-contract-component", error), 
    () => {
      if(this.isNew && this.mainWallet <= 0) {
        this.canCreateContract = false;
      }
      this.loading.contract = false;
    }, 
    this.userId);
  }

  protected onSubmit(): void {    
    if(this.model && this.model.amount > 0 && this.model.expiration) return;
    this.loading.submit = true;

    this.contractService.createContractAsync(
      (response: ApiResponse<null>) => {
        if(response && response.status === 'success') {
          this.toastService.success("Successfully created contract!");
          this.callback && this.callback(this.modal);
        }
      },
      (error: any) => {
        this.toastService.error("Failed to create contract");
        if(!environment.production) console.log("Failed to create contract", error);
      },
      () => this.loading.submit = false,
      {
        amount: this.form.get('amount')?.value,
        isAutoRenew: false,
        userId: this.userId
      }
    );
  }

  protected isInvalid(key: string): boolean {
    const control = this.form?.get(key);

    return (control?.invalid && control?.touched);
  }

  protected errorMessage(key: string): string {
    const control = this.form.get(key);

    if(control?.hasError('required')) {
      return `Subscription Amount is required`;
    }

    if(control?.hasError('max')) {
      return `Subscription Amount should not exceed the main wallet balance`;
    }

    if(control?.hasError('min')) {
      return `Subscription Amount should be more than 0.`;
    }

    return '';
  }
}

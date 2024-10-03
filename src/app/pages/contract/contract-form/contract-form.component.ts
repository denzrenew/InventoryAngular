import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { ApiResponse } from 'src/app/core/models/api-response.model';
import ContractResponseModel from 'src/app/core/models/contract/contract.response.model';
import { ContractService } from 'src/app/core/services/contractService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.scss']
})
export class ContractFormComponent implements OnInit {
  private routeSub: Subscription;
  formId:string = ""
  error:any = '';
  successmsg:any = false;
  autorenewSuccessmsg:any = false;
  submitted:any = false;
  autoRenewOn :boolean = false;
  isLoading: boolean;
  expirationDate: string =""
  submitting: boolean;
  renewing: boolean;
  contractList : any = [];

  form: UntypedFormGroup

  constructor(private toastr: ToastrService,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contractService: ContractService)
  {
    this.submitting = false;
    this.renewing = false;
    this.isLoading = true;
  }

  ngOnInit() {

    this.routeSub = this.route.params.subscribe(params => {
      this.formId = params['id'];
    });

    this.form = this.formBuilder.group({
      mainWalletBalance: ['', Validators.compose([this.hasFund(), Validators.required])],
      currentPlan: ['',],
      investAmount: ['', Validators.compose([Validators.required])],
      autoRenew: [false]
    });

    this.getContractInfo();
    this.getWalletInfo();
  }

  getContractInfo() {
    this.isLoading = true;

    const format = 'dd/MM/yyyy';
    const locale = 'en-US'

    this.contractService.getContractByUserId(
      (response: ApiResponse<ContractResponseModel[]>) => {
        if(response.status === 'success') {
          const { data } = response;
          
          if(data.length <= 0) {
            this.formId = 'new';
            this.form.controls['currentPlan'].setValue('0');
          } else {
            this.autoRenewOn = data[0].isAutoRenew;

            const totalAmount = data
              .map(i => i.amount)
              .reduce((current, next) => current + next, 0);

            this.contractList = data;
            this.form.controls['currentPlan'].setValue(totalAmount);
            this.expirationDate = `${formatDate(data[0].expiration, format, locale)}`;
          }
        }
      },
      (error) => {
        if(!environment.production) console.log(error);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  getWalletInfo() {
    this.contractService.getWalletInfo().subscribe (
      data=>{
        if (data.status !== "success") {
          console.log('oops', "Could not retreive data time.")
        } else  {
          if (data.data.length === 0) {
            console.log('Info', "No fund yet")
            this.form.controls['mainWalletBalance'].setValue ('0');
          } else {
            this.form.controls['mainWalletBalance'].setValue (data.data[0].amount);
          }
        }
      }, error => {
        console.log('oops', error.status)
      }
    )
  }

  hasFund(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
        control.value !== '0'
            ? null : {zeroFound: true};
  }


  get f() { return this.form.controls; }

  checkboxChange(e:any) {
    this.autorenewSuccessmsg = false;
    this.contractService.updateContractRenewal(e.target.checked)
    .pipe(first())
    .subscribe(
      data => {
        this.autorenewSuccessmsg = true;
      },
      error => {
        this.error = error ? error : '';
      });
  }

  onRenew() {
    this.renewing = true;

    let renrewAmount = Number(this.form.controls["currentPlan"].value) ;
    this.contractService.renewContract(renrewAmount)
      .pipe(first())
      .subscribe(data => {
        if (data.status !== 'failed') {
          this.toastr.success('Plan Successfully Renewed!', 'Saving Record', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          });
          this.router.navigate(['/dashboard']);
        } else {
          this.renewing = false;
          this.error = data.message;
        }
      },
      error => {
        this.renewing = false;
        this.error = error ? error : '';
      });
  }

  onViewPDF() {

    this.contractService.getContractPDF()
      .pipe(first())
      .subscribe(data => {
        if (data.status !== 'failed') {
          this.toastr.success('Your subscription contract is sent to your email.!', 'Info', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          });
        } else {
          this.renewing = false;
          this.error = data.message;
        }
      },
      error => {
        this.renewing = false;
        this.error = error ? error : '';
      });
  }

  onSubmit() {
    if(this.form.invalid) return;

    if (Number(this.form.controls["investAmount"].value)  > Number(this.form.controls["mainWalletBalance"].value) )    {
      this.error = 'There is not enough fund on your wallet..';
      return;
    }

    this.submitting = true;
    this.submitted = true;
    this.autorenewSuccessmsg = false;


      let body = {
        amount : Number(this.form.controls["investAmount"].value),
        isAutoRenew : false
      }

      this.contractService.addContract(body)
        .pipe(first())
        .subscribe(data => {
          if (data.status !== 'failed') {
            this.toastr.success('Plan Successfully created.!', 'Saving Record', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right'
            });
            this.router.navigate(['/dashboard']);
          } else {
            this.error = data.message;
          }
        },
        error => {
          this.submitting = false;
          this.error = error ? error : '';
        });

  }


}

import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { BankService } from 'src/app/core/services/bank.service';
import { BaiscTableEmitService } from 'src/app/pages/Generic/basic-table/basic-emitservice';

@Component({
  selector: 'app-bank-detail-admin-form',
  templateUrl: './bank-detail-admin-form.component.html',
  styleUrls: ['./bank-detail-admin-form.component.scss']
})
export class BankDetailAdminFormComponent {
  form:UntypedFormGroup
  formId:string="";
  selectedAccountType:string="";
  error:any="";
  successMessage: any = false;
  submitted:any = false;
  isOTPSent: boolean = false;
  constructor(private toastr : ToastrService ,
    private formBuilder: UntypedFormBuilder, 
    private route: ActivatedRoute, 
    private router: Router, 
    private bankService: BankService,
    private _EmitService : BaiscTableEmitService,
    private spinner: NgxSpinnerService){

 }
 ngOnInit(){
  this.route.queryParams
  .subscribe(params => {          
    this.formId = params['id'] ?? 'new'            
    }
  );

  if (this.formId === 'new') {
    this.router.navigate(['/bank-detail-admin-form']);
  } else {
    this._EmitService.recieveValue().subscribe(
    (d:any)=>{
      console.log(d)
      if(d != null)
      {
        this.form = this.formBuilder.group({      
          bankName: [d.bankName, Validators.compose([Validators.required])],
          accountNumber: [d.accountNumber, Validators.compose([Validators.required])],
          accountHolderName: [d.accountHolderName, Validators.compose([Validators.required])],
          notes: [d.notes, Validators.compose([Validators.required])]
        });
        //this.selectedAccountType = 
      }}); 
    }
  }

  get f() { return this.form.controls; }

  validateForm(): boolean {
    return this.form.invalid ? false : true;
  }

  onSubmit(){
    this.submitted = true;

    if (this.form.controls["otp"].value === '') {
      this.error = 'OTP is Required.';
      return;
    }
    if (!this.validateForm()) {
      return;
    }
 
    if (!this.validateForm()) {
      return;
    }

    const error = (error: any) => {
      this.error = error ? error : "Bad request. Please contact your system administrator for help.";
    }

    const complete = () => {
      this.submitted = false;
    }

    let body = {        
      id : Number(this.formId),
      bankName : this.form.controls["bankName"].value,
      accountNumber : this.form.controls["accountNumber"].value,
      accountHolderName : this.form.controls["accountHolderName"].value,
      notes : this.form.controls["notes"].value,

    }
    
    this.bankService.updateBankAsync(body)
    .pipe(first())
    .subscribe(
      data => {
       
        this.toastr.success('Successfully Saved!', 'Saving Record', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(['/bank-admin']);
        if (this.successMessage) {
          this.formId = 'saved';  
          this.error = null           
        }
        this.spinner.hide();
        console.log(data)
      },
      error => {
        this.error = error ;
        this.spinner.hide();
      });
  }
  onBackClick(){
    this.router.navigate(['/bank-admin']);
  }

}

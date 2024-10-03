import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { WithdrawService } from 'src/app/core/services/withdraw.service';
import { BaiscTableEmitService } from 'src/app/pages/Generic/basic-table/basic-emitservice';

@Component({
  selector: 'app-withdrawal-approval-form',
  templateUrl: './withdrawal-approval-form.component.html',
  styleUrls: ['./withdrawal-approval-form.component.scss']
})
export class WithdrawalApprovalFormComponent {
  form:UntypedFormGroup
  formId:string="";
  selectedAccountType:string="";
  error:any="";
  successMessage: any = false;
  submitted:any = false;
  constructor(private toastr : ToastrService ,
    private formBuilder: UntypedFormBuilder, 
    private route: ActivatedRoute, 
    private router: Router, 
    private withdrawService: WithdrawService,
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
    this.router.navigate(['/withdrawal-admin']);
  } else {
    this._EmitService.recieveValue().subscribe(
    (d:any)=>{
      console.log(d)
      if(d != null)
      {
        this.form = this.formBuilder.group({      
          amount: [d.amount, ''],
          firstName: [d.firstName, ''],
          lastName: [d.lastName,, ''],
          accountHolderName: [d.accountHolderName, ''],
          details: [d.details, ''],
          bankName: [d.bankName, ''],
          bankBranch: [d.bankBranch, ''],
          accountNumber: [d.accountNumber, ''],          
          currentState: [d.status, '']
        });
        //this.selectedAccountType = 
      }}); 
    }
  }

  get f() { return this.form.controls; }

  onSubmit(){
    this.submitted = true;
    this.spinner.show();

    let body = {        
      id : Number(this.formId),
      status : this.form.controls["currentState"].value
    }
    
    this.withdrawService.updateWithdrawalAsync(body)
    .pipe(first())
    .subscribe(
      data => {
       
        this.toastr.success('Successfully Saved!', 'Saving Record', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(['/withdrawal-admin']);
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
    this.router.navigate(['/withdrawal-admin']);
  }

}

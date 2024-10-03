import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DepositService } from 'src/app/core/services/deposit.service';
import { BaiscTableEmitService } from 'src/app/pages/Generic/basic-table/basic-emitservice';

@Component({
  selector: 'app-direct-referral-admin-form',
  templateUrl: './direct-referral-admin-form.component.html',
  styleUrls: ['./direct-referral-admin-form.component.scss']
})
export class DirectReferralAdminFormComponent {
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
      this.router.navigate(['/all-direct-referral']);
   } else {
    this._EmitService.recieveValue().subscribe(
      (d:any)=>{
        if(d != null)
        {
          this.form = this.formBuilder.group({      
            parentUserId: [d.parentUserId, ''],
            parentFirstName: [d.parentFirstName, ''],
            parentLastName: [d.parentLastName,, ''],
            parentEmail: [d.parentEmail, ''],
            childUserId: [d.childUserId, ''],
            referFirstName: [d.referFirstName, ''],
            referLastName: [d.referLastName, ''],
            referEmail: [d.referEmail, ''],
            packageAmount: [d.packageAmount, ''],
            packageReward: [d.packageReward, ''],
            degree: [d.degree, ''],
            isUpgrade: [d.isUpgrade, ''],
            dateReceive: [d.dateReceive, ''],
            isTransferred: [d.isTransferred, ''],
            dateTransferred: [d.dateTransferred, ''],
            createdDate: [d.createdDate, ''],
            flashOutValue: [d.flashOutValue, '']
          });
          //this.selectedAccountType = 
      }}); 
    }
  }

  get f() { return this.form.controls; }
   
  onBackClick(){
    this.router.navigate(['/all-direct-referral']);
  }
}
function first(): any {
  throw new Error('Function not implemented.');
}


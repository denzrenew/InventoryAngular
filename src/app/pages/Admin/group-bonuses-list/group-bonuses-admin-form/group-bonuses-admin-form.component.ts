import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { DepositService } from 'src/app/core/services/deposit.service';
import { BaiscTableEmitService } from 'src/app/pages/Generic/basic-table/basic-emitservice';

@Component({
  selector: 'app-group-bonuses-admin-form',
  templateUrl: './group-bonuses-admin-form.component.html',
  styleUrls: ['./group-bonuses-admin-form.component.scss']
})
export class GroupBonusesAdminFormComponent {
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
    private depositService: DepositService,
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
      this.router.navigate(['/all-group-bonuses']);
   } else {
    this._EmitService.recieveValue().subscribe(
      (d:any)=>{
        if(d != null)
        {
          this.form = this.formBuilder.group({      
            referFirstName: [d.referFirstName, ''],
            referLastName: [d.referLastName, ''],
            referEmail: [d.referEmail,, ''],
            parentEmail: [d.parentEmail, ''],
            parentFirstName: [d.parentFirstName, ''],
            parentLastName: [d.parentLastName, ''],
            packageAmount: [d.packageAmount, ''],
            packageReward: [d.packageReward, ''],            
            createdDate: [d.createdDate, ''],
            dateTransferred: [d.dateTransferred, ''],
            isTransferred: [d.isTransferred, ''],
            firstName: [d.firstName, ''],
            lastName: [d.lastName, ''],
            email: [d.email, ''],
            flashOutBonus: [d.flashOutBonus, ''],
          });          
      }}); 
    }
  }

  get f() { return this.form.controls; }
 
  onBackClick(){
    this.router.navigate(['/all-consolidated-bonuses']);
  }
}

import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaiscTableEmitService } from 'src/app/pages/Generic/basic-table/basic-emitservice';

@Component({
  selector: 'app-monthly-bonuses-admin-form',
  templateUrl: './monthly-bonuses-admin-form.component.html',
  styleUrls: ['./monthly-bonuses-admin-form.component.scss']
})
export class MonthlyBonusesAdminFormComponent {
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
      this.router.navigate(['/all-monthly-bonuses']);
   } else {
    this._EmitService.recieveValue().subscribe(
      (d:any)=>{
        if(d != null)
        {
          this.form = this.formBuilder.group({      
            userId: [d.userId, ''],
            rewardType: [d.rewardType, ''],
            degree: [d.degree, ''],
            packageAmount: [d.packageAmount, ''],
            packageReward: [d.packageReward, ''],
            reward: [d.reward, ''],
            dateReceive: [d.dateReceive, ''],
            createdDate: [d.createdDate, ''],
            dateTransferred: [d.dateTransferred, ''],
            isTransferred: [d.isTransferred, ''],
            firstName: [d.firstName, ''],
            lastName: [d.lastName, ''],
            email: [d.email, ''],
            flashOutValue: [d.flashOutValue, ''],
          });          
      }}); 
    }



  }

  get f() { return this.form.controls; }
 
  onBackClick(){
    this.router.navigate(['/all-monthly-bonuses']);
  }
}

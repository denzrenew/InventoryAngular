import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaiscTableEmitService } from 'src/app/pages/Generic/basic-table/basic-emitservice';

@Component({
  selector: 'app-profile-admin-form',
  templateUrl: './profile-admin-form.component.html',
  styleUrls: ['./profile-admin-form.component.scss']
})
export class ProfileAdminFormComponent {
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
      this.router.navigate(['/all-profile']);
   } else {
    this._EmitService.recieveValue().subscribe(
      (d:any)=>{
        if(d != null)
        {
          this.form = this.formBuilder.group({      
            isActive: [d.isActive, ''],
            firstName: [d.firstName, ''],
            lastName: [d.lastName,, ''],
            middleName: [d.middleName,, ''],
            country: [d.country,, ''],
            mobile: [d.mobile,, ''],
            referralCode: [d.referralCode,, ''],
            accountType: [d.accountType,, ''],
            email: [d.email, ''],            
            hasTwoAuth: [d.hasTwoAuth, '']
          });          
      }}); 
    }
  }

  get f() { return this.form.controls; }
   
  onBackClick(){
    this.router.navigate(['/all-profile']);
  }
}

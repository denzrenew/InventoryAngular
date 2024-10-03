import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { DepositService } from 'src/app/core/services/deposit.service';
import { BaiscTableEmitService } from 'src/app/pages/Generic/basic-table/basic-emitservice';

@Component({
  selector: 'app-genealogy-admin-form',
  templateUrl: './genealogy-admin-form.component.html',
  styleUrls: ['./genealogy-admin-form.component.scss']
})
export class GenealogyAdminFormComponent {
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
      this.router.navigate(['/all-genealogy']);
   } else {
    this._EmitService.recieveValue().subscribe(
      (d:any)=>{
        if(d != null)
        {
          this.form = this.formBuilder.group({      
            parentUserId: [d.parentUserId, ''],
            referByFirstName: [d.referByFirstName, ''],
            referByLastName: [d.referByLastName,, ''],
            referByEmail: [d.referByEmail, ''],
            childUserId: [d.childUserId, ''],
            firstName: [d.firstName, ''],
            lastName: [d.lastName, ''],
            email: [d.email, ''],
            isPlaced: [d.isPlaced, ''],
            createdDate: [d.createdDate, '']
          });          
      }}); 
    }
  }

  get f() { return this.form.controls; }
 
  onBackClick(){
    this.router.navigate(['/all-genealogy']);
  }
}

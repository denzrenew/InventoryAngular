import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup ,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize, first } from 'rxjs';
import { BankService } from 'src/app/core/services/bank.service';
import { BaiscTableEmitService } from '../../Generic/basic-table/basic-emitservice';

@Component({
  selector: 'app-bank-details-form',
  templateUrl: './bank-details-form.component.html',
  styleUrls: ['./bank-details-form.component.scss']
})
export class BankDetailsFormComponent {
  bankForm:UntypedFormGroup
  formId:string="";
  selectedAccountType:string="";
  error:any="";
  successMessage: any = false;
  submitted:any = false;
  isSubmitting: boolean = false;
  

  constructor(private toastr : ToastrService ,
    private formBuilder: UntypedFormBuilder, 
    private route: ActivatedRoute, 
    private router: Router, 
    private bankService: BankService,
    private _EmitService : BaiscTableEmitService,
    private spinner: NgxSpinnerService){
      // this.isSubmitting = true;
 }

  ngOnInit(){
    this.route.queryParams
      .subscribe(params => {
        this.formId = params['id'] ?? 'new'            
      }
    );



    if (this.formId === 'new') {              
      this.bankForm = this.formBuilder.group({      
        accountNumber: ['',Validators.compose([Validators.required, Validators.maxLength(20)])],
        accountHolderName: ['', Validators.compose([Validators.required])],
        bankName: ['', Validators.compose([Validators.required])],
        notes: ['', Validators.compose([Validators.required, Validators.maxLength(255)])]
      });
   } else {
    this._EmitService.recieveValue().subscribe(
      (d:any)=>{
        if(d != null)
        {
          this.bankForm = this.formBuilder.group({      
            accountNumber: [d.accountNumber,Validators.compose([Validators.required, Validators.maxLength(20)])],
            accountHolderName: [d.accountHolderName, Validators.compose([Validators.required])],
            bankName: [d.bankName, Validators.compose([Validators.required])],
            notes: [d.notes, Validators.compose([Validators.required, Validators.maxLength(255)])]
          });
      }}); 
    }
  }

  get f() { return this.bankForm.controls; }

  validateForm(): boolean {
    return this.bankForm.invalid ? false : true;
  }
 
  onSubmit(){
    this.submitted = true;
    
    if (!this.validateForm()) {
      return;
    }

    if(this.formId == 'new'){    
      this.isSubmitting = true;
      const data = this.bankForm.value;

      const success = (response: any) => {
        this.toastr.success('Successfully Saved!', 'Saving Record', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(['/bankdetails']);
        if (this.successMessage) {
          this.formId = 'saved';  
          this.error = null;
        }
      }

      const error = (error: any) => {
        this.error = error ? error : "Bad request. Please contact your system administrator for help.";
      }

      const complete = () => {
        this.isSubmitting = false;
      }

      this.bankService.createBankAsync(data)
        .pipe(finalize(complete))
        .subscribe({ next: success, error });
    } else {
      let body = {   
        id: Number(this.formId),     
        accountNumber: this.bankForm.controls["accountNumber"].value,
        accountHolderName: this.bankForm.controls["accountHolderName"].value,
        bankName: this.bankForm.controls["bankName"].value,
        notes: this.bankForm.controls["notes"].value

      }
      
      this.bankService.updateBankAsync(body)
      .pipe(first())
      .subscribe(
        data => {
         
          this.toastr.success('Successfully Saved!', 'Saving Record', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          });
          this.router.navigate(['/bankdetails']);
          if (this.successMessage) {
            this.formId = 'saved';  
            this.error = null           
          }
          this.spinner.hide();
          console.log(data)
        },
        error => {
          this.error = error ? "Bad request. Please contact your system administrator for help." : '';
          this.spinner.hide();
        });
    }
  }

  onBackClick(){
    this.router.navigate(['/bankdetails']);
  }
}

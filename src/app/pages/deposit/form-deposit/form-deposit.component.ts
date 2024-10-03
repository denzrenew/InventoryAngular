import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, first } from 'rxjs';
import { DepositService } from 'src/app/core/services/deposit.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-form-deposit',
  templateUrl: './form-deposit.component.html',
  styleUrls: ['./form-deposit.component.scss']
})
export class FormDepositComponent implements OnInit {
  private routeSub: Subscription;
  formId:string = "";
  error:any = '';
  successMessage:any = false;
  submitted:any = false;
  hasAttachment:boolean = false;
  conversion:number= 1
  packageList : string []= []
  @Input() toFormData!: Function;
  form: UntypedFormGroup
  private attachment?: File;
  constructor(
    private toastr : ToastrService,
    private formBuilder: UntypedFormBuilder,
     private route: ActivatedRoute,
     private router: Router,
      private depositService: DepositService,
      private spinner: NgxSpinnerService){

  }

  ngOnInit(){
    this.route.queryParams
    .subscribe(params => {
      this.formId = params['id'] ?? 'new'
      }
    );

    //get packageList
    this.depositService.getpackageList(this.formId).pipe(first())
    .subscribe(
      data => {
        this.packageList = data.data;
      },
      error => {
        this.error = error ? "Bad request" : '';
      });

      this.form = this.formBuilder.group({
        depositCategory: ['None',Validators.compose([Validators.required])],
        amount: ['0.00', Validators.compose([Validators.required])],
        depositDetails: ['']
      });

}

  get f() { return this.form.controls; }

  validateForm() : boolean{
    let valid = true;
    if (this.form.controls["depositCategory"].value === 'None' || this.form.controls["depositCategory"].value == '')    {
      this.error = 'Deposit category is required. Please select deposit category.';
      valid = false
    }

    let amount = this.form.controls["amount"].value
    if(amount.toString().length > 20){
      this.error = 'You have entered the maximum amount allowed for deposit.';
      valid = false
    } else {
      if (Number(amount) === 0 )    {
        this.error = 'Amount is required. Please enter your deposit amount to proceed.';
        valid = false
      }
      else if(Number(amount) < 100)
        {
          this.error = 'Minimum amount allowed is 500 AUD.';
        valid = false
        }
    }

    let details = this.form.controls["depositDetails"].value;
    if (details === '')    {

    } else {
      if (details.length > 255){
        this.error = 'Your details has exceeded tha maximum allowed characters';
        valid = false
      }
    }
    return valid
  }
  // Function to convert file to Base64
  protected convertToBlob(file: File): Promise<Blob> {
    return new Promise<Blob>((resolve, reject) => {
      const reader = new FileReader();

      // When the file is read successfully
      reader.onloadend = () => {
          // Retrieve the file content as a Blob
          const blob = new Blob([reader.result], { type: file.type });
          resolve(blob);
      };

      // If there's an error reading the file
      reader.onerror = (error) => {
          reject(error);
      };

      // Read the file content as a Blob
      reader.readAsArrayBuffer(file);
    });
  }
  protected async onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.attachment = file;
      this.hasAttachment = true;
    } else {
      this.hasAttachment = false;
    }
  }

  protected async onSubmit(): Promise<void> {
    this.spinner.show();
    this.submitted = true;
    if (!this.validateForm()) {
      this.spinner.hide();
      return
    }

    if(this.form.invalid){
      this.spinner.hide();
      return;
    } else{

      if(this.formId == 'new'){

        const formData = new FormData();
        formData.append("Category", this.form.controls["depositCategory"].value);
        formData.append("Details", this.form.controls["depositDetails"].value);
        formData.append("Amount", this.form.controls["amount"].value);
        if(this.hasAttachment) {
          const attachment64String = await this.convertToBlob(this.attachment);
          const attachBlob = new Blob([attachment64String], { type: this.attachment.type });
          formData.append("attachment", attachBlob, this.attachment.name);
        }


        this.depositService.createDeposit(formData)
        .pipe(first())
        .subscribe(
          data => {
            console.log(data);
            this.toastr.success('Successfully Saved!', 'Saving Record', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right'
            });

            this.router.navigate(['/deposit']);
            if (this.successMessage) {
              this.formId = 'saved';
              this.error = null
            }


          this.spinner.hide();
          },
          error => {
            console.error('Error:', error);
            this.error = error;
            // Handle the error here, for example, show an error message to the user.
            this.toastr.error(error, 'Error', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right'
            });
            this.spinner.hide();
          }
        )
      }
    }
  }

  onBackClick(){
    this.router.navigate(['/deposit']);
  }
}



export interface DepositModel {
  Category: string;
  Details: string;
  Amount: Number;
}











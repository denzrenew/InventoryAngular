import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { BankService } from 'src/app/core/services/bank.service';
import { DepositService } from 'src/app/core/services/deposit.service';
import { BaiscTableEmitService } from 'src/app/pages/Generic/basic-table/basic-emitservice';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-depoist-approval-form',
  templateUrl: './depoist-approval-form.component.html',
  styleUrls: ['./depoist-approval-form.component.scss']
})
export class DepoistApprovalFormComponent {
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
      this.router.navigate(['/deposit-admin']);
   } else {
    this._EmitService.recieveValue().subscribe(
      (d:any)=>{
        if(d != null)
        {
          this.form = this.formBuilder.group({
            amount: [d.amount, ''],
            firstName: [d.firstName, ''],
            lastName: [d.lastName,, ''],
            email: [d.email, ''],
            depositDetails: [d.details, ''],
            currentState: [d.status, ''],
            filePath: [d.filePath, '']
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
    this.depositService.updateDepositAsync(body)
    .pipe(first())
    .subscribe(
      data => {

        this.toastr.success('Successfully Saved!', 'Saving Record', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(['/deposit-admin']);
        if (this.successMessage) {
          this.formId = 'saved';
          this.error = null
        }
        this.spinner.hide();
      },
      error => {
        this.error = error ;
        this.spinner.hide();
      });
  }
  onBackClick(){
    this.router.navigate(['/deposit-admin']);
  }

  onDownload(){
    let filename = this.form.controls["filePath"].value
    if(filename == null || filename == "")
    {
      this.toastr.error('No file to download', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }

    let body = {
      fileName : filename
    };

    this.depositService.downloadAttachmentAsync(body)
    .pipe(first())
    .subscribe(
      data => {
        let contentType = data.headers.get('Content-Type');
        let options = !!contentType ? { type: contentType } : {};
        let blob = new Blob(!!data.body ? [data.body] : undefined, options);
        saveAs(blob, filename);
      },
      error => {
        this.error = 'ric' + error ;
        this.spinner.hide();
      });
  }
}

import { Component } from '@angular/core';
import { BaiscTableEmitService } from '../../Generic/basic-table/basic-emitservice';
import {formatDate} from '@angular/common';
import { AuthService } from 'src/app/core/services/auth2.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { orderservice } from 'src/app/core/services/orderservice';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {


  constructor(private _EmitService : BaiscTableEmitService
    ,private spinner: NgxSpinnerService
    ,private toastr : ToastrService 
    ,private authService: AuthService
    ,private router: Router
    ,private orderService : orderservice
  ) {

  }

  referenceNumber:string;
  status:string='Pending';
  name:string;
  isPaid:string;
  dateCreated:string;
  mobile:string;
  error:string;
  grandTotal:string;
  orderlines: any[] = [];
  isAdmin:boolean=false;
  ngOnInit(){

    if(this.authService.getAccessTokenData().role === 'Administrator') {
      this.isAdmin = true;
    }

    this._EmitService.recieveValue().subscribe(
      (d:any)=>{
        console.log(d);
        if(d != null) {
          this.referenceNumber = d.referenceNumber ;
          this.status = d.status ;
          this.name = d.name ;
          this.mobile = d.mobile ;
          this.grandTotal = d.grandTotal ;
          this.isPaid = d.isPaid ? 'YES' : 'NO';
          this.dateCreated = formatDate(d.dateCreated,'MM-dd-yyyy','en-US'); 
          try {
            this.orderlines = JSON.parse(d.item);
          } catch (e) {
            console.error("Invalid JSON array string", e);
          }
          console.log(this.orderlines);
      }
    }); 

  }
  updateStatus(status: string, notes: string) {
    this.spinner.show();
    const payload = {
      status: status,
      orderReferenceNumber: this.referenceNumber,
      notes: notes
    };

    
    this.orderService.updateOrderAsync(payload)
    .pipe(first())
    .subscribe(
      data => {
        this.toastr.success(data.data, 'Saving Record', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(['/orderlist']);
        this.spinner.hide();
      },
      error => {
        this.error = error ? "Bad request. Please contact your system administrator for help." : '';
        this.spinner.hide();
      });

    /*this.http.post(apiUrl, payload).subscribe(response => {
      console.log('Status updated successfully', response);
    }, error => {
      console.error('Error updating status', error);
    });*/
  }

  updateIspaid(notes: string) {
    this.spinner.show();
    const payload = {
      status: '',
      orderReferenceNumber: this.referenceNumber,
      notes: notes
    };

    
    this.orderService.updateIspaidAsync(payload)
    .pipe(first())
    .subscribe(
      data => {
        this.toastr.success(data.data, 'Saving Record', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(['/orderlist']);
        this.spinner.hide();
      },
      error => {
        this.error = error ? "Bad request. Please contact your system administrator for help." : '';
        this.spinner.hide();
      });

    /*this.http.post(apiUrl, payload).subscribe(response => {
      console.log('Status updated successfully', response);
    }, error => {
      console.error('Error updating status', error);
    });*/
  }
}

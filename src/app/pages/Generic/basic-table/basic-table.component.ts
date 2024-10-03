import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DatePipe, formatNumber } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/core/services/system.service';
import { RowMeta, TableColumn } from '../interface/TableColumn';
import { environment } from 'src/environments/environment';
import { first } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BaiscTableEmitService } from './basic-emitservice';
import { ExportService } from 'src/app/core/services/export.service';
declare var bootbox:any;

@Component({
  selector: 'app-basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.scss']
})
export class BasicTableComponent implements OnInit {

  constructor(private service:SystemService, 
    private spinner: NgxSpinnerService, 
    private toastService: ToastrService, 
    private router:Router,
    private  _EmitService: BaiscTableEmitService,
    private exportService: ExportService) { }
  @Input() columns: Array<TableColumn> = [{} as TableColumn];
  data: Array<RowMeta> = [{} as RowMeta];
  @Input() listApi: string = "";
  @Input() deleteApi: string = "";
  @Input() addFormRoute: string = "";
  @Input() detailFormRoute: string = "";
  @Input() allocateRoute: string = "";
  @Input() transferPostUrl: string = "";
  @Input() transferCheckUrl: string = "";
  @Input() totalAmountURL: string = "";
  @Input() showAction: boolean = false;
  @Input() showFilter: boolean = false;
  @Input() isTransferred: boolean = false;
  @Input() showViewDetails: boolean = false;
  @Input() showAllocate: boolean = false;
  @Input() showTransfer: boolean = false;
  @Input() showTotal: boolean = false;

  /* ====== EXPORT ======  */
  @Input() hasExport: boolean = false;
  @Input() exportFn?: any;
  @Input() exportLabel1?: string;

  @Input() exportLabel2?: string;
  @Input() exportFn2?: any;
  /* ====== EXPORT ======  */

  protected isDownloading: boolean = false;

  //@Input() showCheckbox: boolean = false;
  filters: any = {};
  columnToSort!: TableColumn;
  oldColumn!: TableColumn;
  totalRow: number = 0;
  totalAmount: string = '';
  pageNumber :number =1;
  //@ViewChild('searchCollectorInput') searchCollection: ElementRef[];
  ngOnInit(): void {
    this.addFormRoute = this.addFormRoute.replace("new","")
    let p: TableColumn = {field:"none", fieldType: "", name:"", class:"",sortDirection:"asc" } 
    this.initalizeColumnSort(p)
    this.getData()

    console.log(this.exportFn);
  }
  initalizeColumnSort(column:TableColumn): void {
    this.columnToSort = column
    this.oldColumn = column
   }
   paginate(page: any): void {
     this.pageNumber = page;
     this.getData(); 
   }
   sortData(column:TableColumn): void {
     if (!column.sortable) {
       return
     }
     if (!this.columnToSort) {
       this.columnToSort = column;
       this.columnToSort.sortDirection = 'asc';
       this.oldColumn = this.columnToSort 
       return;
     }
 
     this.columnToSort = column;
     if (this.columnToSort.field === column.field) {
       if (this.columnToSort.field !== this.oldColumn.field) {
         this.columnToSort.sortDirection = "asc"
       } else {
         this.columnToSort.sortDirection =
         this.columnToSort.sortDirection === 'desc' ? 'asc' : 'desc';
       }
       this.oldColumn = this.columnToSort 
     }
     this.getData()
   }
 
   getSortIcon(column: TableColumn): string {
     if (!this.columnToSort) {
       return '';
     }
 
     if (column.field === this.columnToSort.field) {
       return this.columnToSort.sortDirection === 'desc'
         ? 'fa-chevron-down'
         : 'fa-chevron-up';
     }
 
     return '';
   }
 
   filterChange(column: TableColumn, $event: any) {
     this.filters[column.field] = $event.target.value;
   }
   onFilter(): void {
     this.getData();
   }
   resetFilter(): void {
     var elements = document.getElementsByClassName("searchCollectorInput");
     for(var i=0; i<elements.length ; i++){
        (elements[i] as HTMLInputElement).value = "" ;
     }
     this.columns.forEach(element => {
       this.filters[element.field] = ""
     });
     
     this.getData(); 
   }

   getData() {
    this.spinner.show();
      if (this.showTotal) {
          this.getTotalAmount()
      }
     this.service.getGenericList(environment.appapiConfig.apiUrl + this.listApi, this.pageNumber,
      this.columnToSort.field + "",this.columnToSort.sortDirection + "", this.filters, this.isTransferred).subscribe(
      data=>{
        console.log(data.data)
       this.totalRow = data.totalRecordCount
       this.data = data.data
       this.spinner.hide();
      }, error => {

      }
        

      )
 
   }

   getTotalAmount() {
     this.service.getTotalAmount(environment.appapiConfig.apiUrl + this.totalAmountURL,this.isTransferred).subscribe(
      data=>{
       this.totalAmount = formatNumber(Number(data.data), 'en-US', '1.2-2');
      }, error => {

      }
        

      )
 
   }
 
     getValue(row: any, column: TableColumn): string {
     let value = row[column.field];
     if (column.format) {
       switch (column.format) {
         case 'status':
           return value ? 'Active' : 'Inactive';
         case 'yesno':
           return value ? 'Yes' : 'No';           
         case 'negative-money':
           return ' ' + formatNumber(Number(value) * -1, 'en-US', '1.2-2');           
         case 'money':
           return ' ' + formatNumber(Number(value), 'en-US', '1.2-2');                      
         case 'active':
           return value ? 'Yes' : 'No';
         case 'MM/dd/yyyy':
           return new DatePipe('en-US').transform(value) || value;      
         case 'mm/dd/yyyy':
           return new DatePipe('en-US').transform(value, 'MM/dd/yyyy') || value;                
       }
     }
     return value;
   }

   edit(value : any)
   {
     this._EmitService.sendValue(value);
     this.router.navigateByUrl(this.addFormRoute + '?id=' + value.id);
   }
   view(value : any)
   {
     this._EmitService.sendValue(value);
     this.router.navigateByUrl(this.detailFormRoute + '?id=' + value.id);
   }

   triggerAction(action: string, data: any): void {
      if (action === "transfer") {
        //call the api for checking
        let transid = data.id
        this.spinner.show();
        let response = this.service.transferBonus(this.transferPostUrl , transid).pipe(first()).subscribe(
            result => {
              if (result.status !== 'failed') {
                  this.toastService.success('Bonus Successfully transferred', 'Saving Record', {
                    timeOut: 3000,
                    positionClass: 'toast-bottom-right'
                  });
                  window.location.reload();
                  //this.getData()
              } else {
                this.toastService.error("" + data.message , 'Failed..', {
                  timeOut: 3000,
                  positionClass: 'toast-bottom-right'
                });
              }

            }, error => {
              this.toastService.error("" + error , 'Failed..', {
                timeOut: 3000,
                positionClass: 'toast-bottom-right'
              });
              this.spinner.hide();
              
              }
            ); 
    
      }
  }
}



import { Component } from '@angular/core';
import { ReportsService } from 'src/app/core/services/reports.service';
import { tableColumns } from './definition';
import { TableColumn } from '../../Generic/interface/TableColumn';

@Component({
  selector: 'app-main-wallet-reports',
  templateUrl: './main-wallet-reports.component.html',
  styleUrls: ['./main-wallet-reports.component.scss']
})
export class MainWalletReportsComponent {
  apiEndpoint: string = '';
  columns: TableColumn[] = tableColumns;

  constructor(private reportsService: ReportsService) {
    this.apiEndpoint = this.reportsService.getDefaultData('main-wallet');
  }
}

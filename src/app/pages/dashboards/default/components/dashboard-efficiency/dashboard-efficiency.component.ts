import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from '../../dashboard.model';
import EfficiencyData from '../../interfaces/efficiency-data.interface';
import { WalletsService } from 'src/app/core/services/wallets.service';
import { ApiResponse } from '../../interfaces/response.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-efficiency',
  templateUrl: './dashboard-efficiency.component.html',
  styleUrls: ['./dashboard-efficiency.component.scss']
})
export class DashboardEfficiencyComponent implements OnInit {
  @Input() protected subscriptionType!: string;

  protected loading: boolean = true;
  protected series: number[] = [ 0, 0, 0 ];

  protected chart: ChartType = {
    chart: {
      height: 320,
      type: 'bar',
    },
    series: [{
      data: [
        { x: 'Direct Referral', y: this.series[0], fillColor: '#f1b44c' }, 
        { x: 'Monthly Bonus', y: this.series[1], fillColor: '#50a5f1' }, 
        { x: 'Consolidated Bonus',y: this.series[2], fillColor: '#3452e1' }
      ]
    }],
    legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        verticalAlign: 'middle',
        floating: false,
        fontSize: '14px',
        offsetX: 0,
        offsetY: -10
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#fff', '#fff', '#fff'], // Set color to white
      },
      formatter: (val: number, opts: any) => `${(val * 2).toFixed(2)}%`,
    },
    labels: ['Direct Referral', 'Monthly Bonus', 'Consolidated Bonus', ],
    colors: [ '#73a580', '#50a5f1', '#3452e1' ],
    responsive: [{
        breakpoint: 600,
        options: {
            chart: {
                height: 240
            },
            legend: {
                show: false
            },
        }
    }],
  };

  constructor(private walletsService: WalletsService) {
  }

  ngOnInit(): void {
      this.initWallet();
  }

  private initWallet(): void {
    this.loading = true;

    this.walletsService.getAllWalletsBalance(
      (response: ApiResponse<number[]>) => {
        if(response.status === 'success') {
          this.setSeriesData(response.data);
        }
      },
      (error: any) => {
        if(!environment.production) console.log(error);
      },
      () => this.loading = false
    )
  }

  private setSeriesData(data: number[]): void {
    this.chart.series = [{
      data: [
        { x: 'Direct Referral', y: data[0].toFixed(2), fillColor: '#f1b44c' }, 
        { x: 'Monthly Bonus', y: data[1].toFixed(2), fillColor: '#50a5f1' }, 
        { x: 'Consolidated Bonus',y: data[2].toFixed(2), fillColor: '#3452e1' }
      ]
    }];
  }
}

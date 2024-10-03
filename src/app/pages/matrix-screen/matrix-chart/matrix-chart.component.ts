import { 
  OnChanges,
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef } from '@angular/core';
import { OrgChart } from 'd3-org-chart';

@Component({
  selector: 'app-matrix-chart',
  templateUrl: './matrix-chart.component.html',
  styleUrls: ['./matrix-chart.component.scss']
})
export class MatrixChartComponent implements OnInit, OnChanges  {
  @ViewChild('chartContainer') chartContainer: ElementRef;
  @Input() data: any[];
  chart;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (!this.chart) {
      this.chart = new OrgChart();
    }    
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }
  updateChart() {
    if (!this.data) {
      return;
    }
    if (!this.chart) {
      return;
    }
    this.chart
      .container(this.chartContainer.nativeElement)
      .data(this.data)
      .nodeWidth(d => 200)
      .nodeHeight(d => 120)
      .render();
  }

}

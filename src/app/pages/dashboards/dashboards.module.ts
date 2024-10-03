import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { UIModule } from '../../shared/ui/ui.module';
import { WidgetModule } from '../../shared/widget/widget.module';

import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from './saas/shared/shared.module'

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule,BsDropdownConfig} from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SimplebarAngularModule } from 'simplebar-angular';

import { DefaultComponent } from './default/default.component';
import { SaasComponent } from './saas/saas.component';
import { JobsComponent } from './jobs/jobs.component';
import { QRCodeModule } from 'angularx-qrcode';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardNetworkComponent } from './default/components/dashboard-network/dashboard-network.component';
import { DashboardEfficiencyComponent } from './default/components/dashboard-efficiency/dashboard-efficiency.component';

const DashboardComponents = [ DashboardNetworkComponent, DashboardEfficiencyComponent ];

@NgModule({
  declarations: [ DefaultComponent, SaasComponent,  JobsComponent, ...DashboardComponents ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardsRoutingModule,
    UIModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    CarouselModule.forRoot(),
    WidgetModule,
    NgApexchartsModule,
    SharedModule,
    SimplebarAngularModule,
    ModalModule.forRoot(),
    QRCodeModule,
    TranslateModule,
  ],
  providers: [
    BsDropdownConfig
  ],
})
export class DashboardsModule { }

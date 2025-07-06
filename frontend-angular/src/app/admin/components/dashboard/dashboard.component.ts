import { Component,ViewEncapsulation } from '@angular/core';
import { AppBlogCardsComponent } from 'src/app/components/blog-card/blog-card.component';
import { AppDailyActivitiesComponent } from 'src/app/components/daily-activities/daily-activities.component';
import { AppNewCustomersComponent } from 'src/app/components/new-customers/new-customers.component';
import { AppRevenueForecastComponent } from 'src/app/components/revenue-forecast/revenue-forecast.component';
import { AppRevenueProductComponent } from 'src/app/components/revenue-product/revenue-product.component';
import { AppTotalIncomeComponent } from 'src/app/components/total-income/total-income.component';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-dashboard',
  imports: [  MaterialModule,
      AppNewCustomersComponent,
      AppTotalIncomeComponent,
      AppDailyActivitiesComponent,
      AppBlogCardsComponent,
      AppRevenueProductComponent,
      AppRevenueForecastComponent,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent {

}

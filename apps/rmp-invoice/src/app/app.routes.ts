import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { InvoicesComponent } from './invoices/invoices';

export const appRoutes: Route[] = [{
    path: '',
    component: DashboardComponent,
},
{
    path: 'invoices',
    component: InvoicesComponent,
}];

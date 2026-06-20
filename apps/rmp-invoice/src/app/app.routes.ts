import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { InvoicesComponent } from './invoices/invoices';
import { PromptAgent } from './prompt-agent/prompt-agent';
import { NewRMPClient } from './clients/create';
import { UserComponent } from '../test/test';

export const appRoutes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'invoices',
    component: InvoicesComponent,
  },
  {
    path: 'prompt-agent',
    component: PromptAgent,
  },
  {
    path: 'client',
    component: NewRMPClient,
  },
  {
    path: 'test',
    component: UserComponent
  },
  {
    path: '**',
    redirectTo: 'prompt-agent',
  },
];

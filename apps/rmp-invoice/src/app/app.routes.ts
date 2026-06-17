import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { InvoicesComponent } from './invoices/invoices';
import { PromptAgent } from './prompt-agent/prompt-agent';
import { NewClient } from './clients/create';

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
    component: NewClient,
  },
  {
    path: '**',
    redirectTo: 'prompt-agent',
  },
];

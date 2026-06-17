import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RmpButtonDirective } from "@rmp/shared-ui-ang";

@Component({
  selector: 'rmp-header',
  template: `
    <header data-role="header" class="flex align-center items-center">
        <h1 data-role="header-title" class="flex-1 ">RMP Invoice</h1>
        <nav class="flex-1 flex items-center gap-4">
            <a routerLink="/" data-role="dashboard-link">Dashboard</a>
            <a routerLink="/invoices" data-role="invoices-link">Invoices</a>
            <a routerLink="/client" data-role="client-link">Client</a>
            <a routerLink="/prompt-agent" data-role="prompt-agent-link">Prompt Agent</a>
            <button rmpButton variant="secondary" size="medium" data-role="create-invoice-button">Create Invoice</button>
        </nav>
    </header>
  `,
  imports: [RouterModule, RmpButtonDirective],
})
export class HeaderComponent {}
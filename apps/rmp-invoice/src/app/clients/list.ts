import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { ClientService } from "../services/client.service";

@Component({
    selector: 'rmp-client-list',
    templateUrl: './list.html',
    imports: [CommonModule]
})
export class RMPClientList {
    private clientService = inject(ClientService);
    private params = signal(undefined);
    clients = this.clientService.getClients(this.params);
}
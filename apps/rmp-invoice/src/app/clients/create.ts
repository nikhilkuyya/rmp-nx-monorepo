import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { form, FormField, submit } from '@angular/forms/signals';
import { RMPCreateClientPaylod } from '@rmp/shared-models';
import { RMPInput, RmpButtonDirective } from '@rmp/shared-ui-ang';
import { NewRMPAddress } from './address';
import { ClientService } from '../services/client.service';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'rmp-create-client',
  templateUrl: './create.html',
  imports: [RMPInput, FormField, CommonModule, NewRMPAddress, RmpButtonDirective],
})
export class CreateRMPClient {
  private clientService = inject(ClientService);

  rmpClientModel = signal<RMPCreateClientPaylod>({
    companyName: '',
    companyGSTIn: '',
    address: {
      addressLine: '',
      city: '',
      postalCode: '',
      state: 'Telangana',
      country: 'BHARAT',
    },
    invoiceEmail: '',
  });

  rmpClientForm = form(this.rmpClientModel);

  handleSubmit() {
    submit(this.rmpClientForm, async (form) => {
      try {
        await firstValueFrom(this.clientService.createClient(form().value()));
        form().reset();
        return undefined;
      } catch (error) {
        console.error(error);
        return undefined;
      }
    });
  }
}

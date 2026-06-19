import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { RMPCreateClientPaylod } from '@rmp/shared-models';
import { RMPInput } from '@rmp/shared-ui-ang';
import { NewRMPAddress } from './address';
@Component({
  selector: 'rmp-new-client',
  templateUrl: './create.html',
  imports: [RMPInput, FormField, CommonModule, NewRMPAddress],
})
export class NewClient {
    
  rmpClientModel = signal<RMPCreateClientPaylod>({
    companyName: '',
    companyGSTIn: '',
    address: {
        address: '',
        city: '',
        postalCode: '',
        state: 'Telangana',
        country: 'BHARAT',
    },
    invoiceEmail: '',
  });

  rmpClientForm = form(this.rmpClientModel);
}

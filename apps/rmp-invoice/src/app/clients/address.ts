import { CommonModule } from '@angular/common';
import { Component, model } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { RMPAddress } from '@org/models';
import { RMPInput } from '@rmp/shared-ui-ang';

@Component({
  selector: 'rmp-address',
  template: `
    <fieldset>
      <rmp-input [formField]="addressForm.address" id="rmp-address-form-address" label="Address" />
      <rmp-input [formField]="addressForm.city" id="rmp-address-form-city" label="City" />
      <rmp-input
        [formField]="addressForm.postalCode"
        id="rmp-address-form-postal-code"
        label="Postal Code"
      />
    </fieldset>
  `,
  imports: [FormField, RMPInput, CommonModule],
})
export class NewRMPAddress {
  address = model.required<RMPAddress>();

  addressForm = form<RMPAddress>(this.address);
}

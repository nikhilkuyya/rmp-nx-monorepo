import { CommonModule } from '@angular/common';
import { Component, model } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { RMPAddress } from '@org/models';
import { RMPInput } from '@rmp/shared-ui-ang';

@Component({
  selector: 'rmp-address',
  template: `
    <fieldset class="flex flex-wrap p-4 my-2 border-1">
      <legend>Address</legend>
      <rmp-input [formField]="addressForm.addressLine" id="rmp-address-form-address" label="Address Line" class="flex-auto basis-full"/>
      <rmp-input [formField]="addressForm.city" id="rmp-address-form-city" label="City" class="flex-1"/>
      <rmp-input class="flex-1"
        [formField]="addressForm.postalCode"
        id="rmp-address-form-postal-code"
        label="Postal Code"        
      />
      
    </fieldset>
  `,
  imports: [FormField, RMPInput, CommonModule],
})
export class NewRMPAddress {
  value = model.required<RMPAddress>();

  addressForm = form<RMPAddress>(this.value);
}

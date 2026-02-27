import { Component, input } from "@angular/core";

@Component({
    selector: 'rmp-checkbox',
    template: `
    <div class="space-x-2">
        <input type="checkbox" [checked]="checked()" [id]="id()"  
        class="accent-red-500" />
        <label [for]="id()">{{ label() }}</label>
    </div>
    `,
})
export class RMPCheckbox {
    checked = input<boolean>(false);
    label = input.required<string>();
    id = input.required<string>();
}
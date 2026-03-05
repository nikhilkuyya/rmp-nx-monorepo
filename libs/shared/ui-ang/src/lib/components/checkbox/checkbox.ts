import { Component, input, output } from "@angular/core";

@Component({
    selector: 'rmp-checkbox',
    template: `
    <div class="space-x-2">
        <input type="checkbox" [checked]="checked()" [id]="id()"  
        class="accent-accent" (change)="onCheckboxChange($event)" />
        <label [for]="id()">{{ label() }}</label>
    </div>
    `,
})
export class RMPCheckbox {
    checked = input<boolean>(false);
    label = input.required<string>();
    id = input.required<string>();
    checkedBoxChange = output<boolean>();

    onCheckboxChange(event: Event) {
        const changed = (event.target as HTMLInputElement).checked;
        event.stopPropagation();
        this.checkedBoxChange.emit(changed);
    }
}
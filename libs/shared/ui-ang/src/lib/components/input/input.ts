import { Component, input } from "@angular/core";
import { inputVariants } from "./input-variant";

@Component({
    selector: 'rmp-input',
    template: `
    <div class="space-y-2">
        <label [for]="id() + '-label'" [for]="id() + '-input'" class="block">{{ label() }}</label>
        <input [class]="baseWrapperClasses" [id]="id() + '-input'" type="text" 
           [value]="value()" [required]="required()" 
           [attr.maxlength]="maxlength()" [disabled]="disabled()" />
    </div>
    `,
})
export class RMPInput {
    id = input.required<string>();
    label = input.required<string>();

    value = input<string>('');
    required = input<boolean>(false);
    disabled = input<boolean>(false);
    maxlength = input<number>(100);

    get baseWrapperClasses() {
        return inputVariants();
    }
}
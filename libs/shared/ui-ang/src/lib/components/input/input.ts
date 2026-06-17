import { Component, input, model } from '@angular/core';
import { inputVariants } from './input-variant';

@Component({
  selector: 'rmp-input',
  template: `
    <div class="space-y-2">
      <label [for]="id() + '-label'" [for]="id() + '-input'" class="block">{{ label() }}</label>
      <input
        [class]="baseWrapperClasses"
        [id]="id() + '-input'"
        type="text"
        [value]="value()"
        [disabled]="disabled()"
        (input)="onInputChange($event)"
      />
    </div>
  `,
})
export class RMPInput {
  id = input.required<string>();
  label = input.required<string>();

  readonly value = model<string>('');
  // required = input<boolean>(false);
  disabled = input<boolean>(false);
  // maxlength = input<number>(100);

  get baseWrapperClasses() {
    return inputVariants();
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
  }
}

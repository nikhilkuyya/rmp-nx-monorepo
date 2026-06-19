import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { RmpButtonDirective, RMPCheckbox} from "@rmp/shared-ui-ang";

@Component({
  selector: 'rmp-test',
  templateUrl: './test.html',
  imports: [RmpButtonDirective, RMPCheckbox]
})
export class TestComponent {
  checked = signal<boolean>(false);

  onCheckboxChange(changed: boolean) {
    this.checked.set(changed);
  }

}


@Component({
  selector: 'rmp-two-way-binding',
  template: `
    <input type="text" [formField]="userForm.name" />
    <button (click)="setName('Bob')">Set Name to Bob</button>
    <button (click)="setSignalName('Signal Bob')">Set Signal to Bob</button>
    <p>Current name: {{ userModel().name }}</p>
  `,
  imports: [FormField]
})
export class UserComponent {
  userModel = signal({name: ''});
  userForm = form(this.userModel);
  setName(name: string) {
    this.userForm.name().value.set(name);
    // Input automatically displays 'Bob'
  }

  setSignalName(name: string){
    this.userModel.set({
      name: name
    })
  }
}
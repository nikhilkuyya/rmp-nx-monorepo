import { Component, signal } from '@angular/core';
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
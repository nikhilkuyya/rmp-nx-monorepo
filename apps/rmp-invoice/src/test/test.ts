import { Component } from '@angular/core';
import { RmpButtonDirective , ButtonVariant, ButtonSize, RMPCheckbox} from "@rmp/shared/ui-ang";
@Component({
  selector: 'app-test',
  templateUrl: './test.html',
  imports: [RmpButtonDirective]
})
export class TestComponent {
  constructor() {
    console.log('TestComponent constructor');
  }
}
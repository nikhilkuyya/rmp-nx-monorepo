import { Component } from '@angular/core';
import { RMPCheckbox, RmpButtonDirective } from '@rmp/shared/ui-ang';

@Component({
  selector: 'app-test',
  templateUrl: './test.html',
  imports: [RMPCheckbox, RmpButtonDirective]
})
export class TestComponent {
  constructor() {
    console.log('TestComponent constructor');
  }
}
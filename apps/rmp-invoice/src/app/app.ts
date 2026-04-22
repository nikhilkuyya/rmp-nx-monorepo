import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout';

@Component({
  imports: [LayoutComponent],
  selector: 'rmp-root',
  template: `<div class="bg-primary-light">
  <rmp-layout></rmp-layout>
  </div>`,
})
export class App {
}

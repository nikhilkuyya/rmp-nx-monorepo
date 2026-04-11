import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout';

@Component({
  imports: [LayoutComponent],
  selector: 'rmp-root',
  template: '<rmp-layout></rmp-layout>',
})
export class App {
}

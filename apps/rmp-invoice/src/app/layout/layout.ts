import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./header";

@Component({
  selector: 'rmp-layout',
  templateUrl: './layout.html',
  imports: [RouterModule, HeaderComponent],
})
export class LayoutComponent {}
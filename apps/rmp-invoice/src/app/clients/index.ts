import { Component } from "@angular/core";
import { RMPClientList } from "./list";
import { CreateRMPClient } from "./create";

@Component({
    selector: 'rmp-client',
    template: `
        <rmp-client-list> </rmp-client-list>
        <rmp-create-client> </rmp-create-client>
    `,
    imports: [RMPClientList, CreateRMPClient]
})
export class RMPClient {

}
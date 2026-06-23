import { inject, Injectable, Resource, Signal } from '@angular/core';
import { RMPClient, RMPCreateClientPaylod } from '@rmp/shared-models';
import { API_ROOT } from '@rmp/invoice-web-core';
import { HttpClient, httpResource } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiRoot = inject(API_ROOT);
  private httpClient = inject(HttpClient);
  getClients(params: Signal<{ name: string } | undefined>): Resource<RMPClient[]> {
    return httpResource(
      () => {
        const requestParams = {
          ...params(),
        };
        return {
          url: `${this.apiRoot}/api/client`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
      {
        defaultValue: [],
      },
    );
  }

  createClient(clientPayload: RMPCreateClientPaylod) {
    return this.httpClient.post(`${this.apiRoot}/api/client`, {
      ...clientPayload,
    });
  }
}

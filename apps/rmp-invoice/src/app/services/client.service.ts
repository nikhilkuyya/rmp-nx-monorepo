import {  inject, Injectable, Resource, Signal } from '@angular/core';
import { RMPClient } from '@rmp/shared-models';
import { API_ROOT } from '@rmp/invoice-web-core';
import { httpResource } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private apiRoot = inject(API_ROOT);

    getClients(params: Signal<{name: string} | undefined>): Resource<RMPClient[]> {
        return httpResource(
            () => {
                const requestParams = {
                    ...params()
                }                                
                return {
                    url: `${this.apiRoot}/api/client`,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },                    
                }                
            },
            {
                defaultValue: []
            }
        )
    }
}
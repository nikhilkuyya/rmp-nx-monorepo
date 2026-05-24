import { inject, Injectable, Resource, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { API_ROOT } from '@rmp/invoice-web-core';
@Injectable({
  providedIn: 'root',
})
export class PromptService {
  apiRoot = inject(API_ROOT);
  getPromptResponse(prompt: Signal<string>): Resource<string> {
    return httpResource(
      () => {
        const promptValue = prompt();
        if (!promptValue) return undefined;
        return {
          url: `${this.apiRoot}/api/agent`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            prompt: promptValue,
          },
        };
      },
      {
        defaultValue: '',
      },
    );
  }
}

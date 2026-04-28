import { Injectable, Resource, Signal } from "@angular/core";
import { httpResource } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PromptService {

    getPromptResponse(prompt: Signal<string>): Resource<string> {
        return httpResource(() => {
            const promptValue = prompt();
            if (!promptValue) return undefined;
            return {
                url: 'http://localhost:3333/api/agent',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    prompt: promptValue
                }
            }
        },
            {
                defaultValue: ''
            });
    }

}
import { CommonModule } from "@angular/common";
import { HttpClient, httpResource } from "@angular/common/http";
import { Component, effect, inject, signal } from "@angular/core";
import { form } from "@angular/forms/signals";
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RmpButtonDirective } from "@rmp/shared/ui-ang";

@Component({
    selector: 'rmp-prompt-agent',
    templateUrl: './prompt-agent.html',
    imports: [CommonModule, ReactiveFormsModule, RmpButtonDirective],
})
export class PromptAgent {
    promptFormModel = signal<{ prompt: string, response: string }>({ prompt: '', response: '' });
    promptForm = inject(NonNullableFormBuilder).group({
        prompt: ['', Validators.required],
    });
    httpClient = inject(HttpClient);

    promptFormSignal = form(this.promptFormModel);

    promptResource = httpResource(() => {
        return {
            url: 'http://localhost:3333/api/agent',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    }, {
        defaultValue: {
            prompt: '',
        },
    })

    constructor() {
        effect(() => {
            if (this.promptResource.hasValue()) {
                this.promptForm.patchValue(this.promptResource.value() as any);
            }
        });
    }

    onSubmit(event: Event) {
        event.preventDefault();

        this.httpClient.post('http://localhost:3333/api/agent', this.promptForm.getRawValue()).subscribe((response) => {
            this.promptFormModel.set({ ...this.promptFormModel(), response: response as string });
        });
    }
}
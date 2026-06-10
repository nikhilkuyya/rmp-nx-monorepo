import { CommonModule } from "@angular/common";
import { Component, inject, linkedSignal, signal } from "@angular/core";
import { RmpButtonDirective } from "@rmp/shared-ui-ang";
import { PromptService } from "../services/prompt.service";
import { form, FormField, required } from '@angular/forms/signals';

@Component({
    selector: 'rmp-prompt-agent',
    templateUrl: './prompt-agent.html',
    imports: [CommonModule, RmpButtonDirective, FormField],
})
export class PromptAgent {

    promptService = inject(PromptService);
    model = signal({
        prompt: '',
    });
    promptForm = form(this.model, (path) => {
        required(path.prompt);
    });

    submitPrompt = signal('')

    promptHttpResource = this.promptService.getPromptResponse(this.submitPrompt);
   
    promptResponse = linkedSignal(() => this.promptHttpResource.hasValue() ? this.promptHttpResource.value() : '');
    
    onSubmit(event: Event) {
        event.preventDefault();
        this.submitPrompt.set(this.promptForm.prompt().controlValue());        
    }
}
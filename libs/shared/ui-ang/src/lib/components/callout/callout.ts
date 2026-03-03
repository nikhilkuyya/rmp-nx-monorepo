import { Component, input } from "@angular/core";
import { cva, VariantProps } from "class-variance-authority";

const calloutVariants = cva('p-3 border-4 rounded-xl space-y-2', {
    variants: {
        type: {
            info: ['bg-info', 'border-accent'],
            accent: ['bg-accent', 'border-primary'],
            primary: ['bg-primary', 'border-accent'],
        },
    },
});

export type CalloutType = VariantProps<typeof calloutVariants>;

@Component({
    selector: 'rmp-callout',
    template: `<div [class]="baseWrapperClasses">
            <h3 class="font-bold">{{ title() }}</h3>
            <ng-content></ng-content>
    </div>
    `,
})
export class RMPCallout {
    title = input.required<string>();
    description = input.required<string>();
    type = input.required<CalloutType['type']>();
    icon = input.required<string>();

    get baseWrapperClasses() {
        return calloutVariants({
            type: this.type(),
        });
    }
}
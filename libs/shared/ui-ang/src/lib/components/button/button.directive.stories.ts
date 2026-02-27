import type { ButtonSize, ButtonVariant } from "./button.directive";
import { RmpButtonDirective } from "./button.directive";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { Component } from "@angular/core";

@Component({
    selector: 'rmp-button',
    template: `
        <button rmpButton [variant]="variant" [size]="size">Hello</button>
    `,
})
class ButtonComponent  {
    variant: ButtonVariant = 'primary';
    size: ButtonSize = 'medium';
}

const meta: Meta<ButtonComponent> = {
    title: 'Button',
    component: ButtonComponent,
    decorators: [   
        moduleMetadata({
            imports: [RmpButtonDirective],
        }),
    ],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'outline', 'ghost', 'link'],
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
        },
    }
};

export default meta;

type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        size: 'large',
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        size: 'medium',
    },
}
import type { ButtonVariants } from "./button.directive";
import { RmpButtonDirective } from "./button.directive";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";

const meta: Meta<RmpButtonDirective> = {
    title: 'Components/Button',
    component: RmpButtonDirective,    
    render: (args: ButtonVariants) => {
        const { variant, size } = args;
        return {
            template: `<button rmpButton [variant]="variant" [size]="size">Hello</button>`,
            props: args,
        }
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'outline', 'ghost', 'link'],
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
        },
    },
    args: {
        variant: 'primary',
        size: 'medium',
    },    
};

export default meta;

type Story = StoryObj<RmpButtonDirective>;

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

export const DarkMode: Story = {
    parameters: {
        themes: {
            themeOverride: 'dark',
        }
    }
}

export const MobileViewPort: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    }
}
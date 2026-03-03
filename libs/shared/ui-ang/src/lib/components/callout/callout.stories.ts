import { Meta, StoryObj } from "@storybook/angular";
import { RMPCallout } from "./callout";

const meta: Meta<RMPCallout> = {
    title: 'Components/Callout',
    component: RMPCallout,
    render: (args) => {
        return {
            template: `<rmp-callout [title]="title" [type]="type">
                <p>Callout Test Description</p>
            </rmp-callout>`,
            props: args,
        };
    },
    argTypes: {
        type: {
            control: 'select',
            options: ['info', 'accent', 'primary'],
        },
    },
};
export default meta;

type Story = StoryObj<RMPCallout>;

export const Default: Story = {
    args: {
        title: 'Callout Title',
        type: 'info',
    },
};
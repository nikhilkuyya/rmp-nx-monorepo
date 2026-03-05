import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { RMPCallout } from "./callout";
import { CALLOUT_CONTEXT } from "./callout.context";

const meta: Meta<RMPCallout> = {
    title: 'Components/Callout',
    component: RMPCallout,
    render: (args, { loaded: { firstData } }) => {
        return {
            template: `<rmp-callout [title]="firstData" [type]="type">
                <p>Callout Test Description</p>
            </rmp-callout>`,
            props: { ...args, firstData },
        };
    },
    loaders: [
        async () => {
            const data = await Promise.resolve('Task 1 completed');
            return {
                firstData: data,
            };
        }
    ],
    decorators: [
        moduleMetadata({
            providers: [{
                provide: CALLOUT_CONTEXT,
                useValue: 'test context',
            }],
        }),
    ],
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
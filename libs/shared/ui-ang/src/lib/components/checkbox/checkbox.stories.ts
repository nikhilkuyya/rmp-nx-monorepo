import { Meta, StoryObj } from "@storybook/angular";
import { RMPCheckbox } from "./checkbox";

const meta: Meta<RMPCheckbox> = {
    title: 'Components/Checkbox',
    component: RMPCheckbox, 
    args: {
        label: 'Checkbox',
        id: 'checkbox-1',
        checked: false,
    }   
};
export default meta;

type Story = StoryObj<RMPCheckbox>;

export const Default: Story = {
    args: {
        checked: false,
        label: 'Checkbox Label',
        id: 'checkbox-2',
    },
};
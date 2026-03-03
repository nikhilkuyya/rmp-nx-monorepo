import { Meta, StoryObj } from "@storybook/angular";
import { RMPInput } from "./input";

import { expect, userEvent, within } from '@storybook/test';

const meta: Meta<RMPInput> = {
    title: 'Components/Input',
    component: RMPInput,
    args: {
        label: 'Input Label',
        id: 'input-1',
        value: '',
        required: false,
        disabled: false,
    },
};
export default meta;

type Story = StoryObj<RMPInput>;

export const Default: Story = {
    args: {
        id: 'input-default-1',
        value: '',
        required: false,
        disabled: false,
    },
};

export const Required: Story = {
    args: {
        label: 'Input Required Label',
        id: 'input-required-1',
        value: '',
        required: true,
        disabled: false,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const text =  canvas.getByRole('textbox');
        await userEvent.type(text, 'Test');
    },
};

export const RestrictingMaxLength: Story = {
    args: {
        label: 'Input Maxlength Label',
        id: 'input-maxlength-1',
        value: '',
        maxlength: 10,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const text =  canvas.getByRole('textbox') as HTMLInputElement;
        const inputValue = 'H' + 'I'.repeat(10);
        await userEvent.type(text, inputValue);
        expect(text.value.length).toBe(10);
    },
};

export const Disabled: Story = {
    args: {
        id: 'input-disabled-1',
        value: '',
        required: false,
        disabled: true,
    },
};

export const CannotTypeIfDisabled: Story = {
    args: {
        id: 'input-disabled-1',
        value: '',
        required: false,
        disabled: true,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const text =  canvas.getByRole('textbox') as HTMLInputElement;
        expect(text).toBeDisabled();
        await userEvent.type(text, 'Test');
        expect(text.value).toBe('');
    },
};
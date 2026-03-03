import type { Preview } from '@storybook/angular';
import '../src/index.css';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

const preview: Preview = {
    tags: ['autodocs'],
    decorators: [
        withThemeByDataAttribute({
            themes: {
                light: 'light',
                dark: 'dark',
            },
            defaultTheme: 'light',
            attributeName: 'data-mode',
        }),
    ]
};

export default preview;
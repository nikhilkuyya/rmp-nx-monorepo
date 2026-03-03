import type { StorybookConfig } from '@storybook/angular';

const customWebpackConfig =  {
  module: {
      rules: [
          {
              test: /\.(?:css)$/i,
              use: ['style-loader', 'css-loader', 'postcss-loader'],
          },
      ],
  },
}

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    '../**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    "@storybook/addon-themes",
    "@storybook/addon-docs"
  ],
  framework: '@storybook/angular',
  webpackFinal: async (config) => {
    return {
      ...config,      
      module: {
        ...config.module,
        rules: [
          ...(customWebpackConfig.module.rules || []),
          ...(config?.module?.rules || []),          
        ],
      },
    };
  },
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs

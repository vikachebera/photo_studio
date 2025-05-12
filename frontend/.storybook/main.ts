import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test"
  ],
  framework: {
    name: "@storybook/react-vite",

    options: {}
  },
  // Remove the webpackFinal block since we're using Vite
  // Add Vite-specific configuration instead
  async viteFinal(config) {
    // Merge custom Vite config here if needed
    return {
      ...config,
      // Add CSS modules support for Vite
      css: {
        modules: {
          localsConvention: 'camelCase'
        }
      }
    };
  },
};

export default config;
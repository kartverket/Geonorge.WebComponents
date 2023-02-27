const path = require("path");

module.exports = {
    stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials"
    ],
    framework: "@storybook/web-components",
    core: {
        builder: "@storybook/builder-webpack5"
    },
    webpackFinal: async (config, { configType }) => {
        const fileLoaderRule = config.module.rules.find((rule) => !Array.isArray(rule.test) && rule.test.test(".svg"));
        fileLoaderRule.exclude = /\.svg$/;

        config.module.rules.push(
            {
                test: /\.html$/i,
                loader: "html-loader"
            },
            {
                test: /\.svg$/,
                loader: "svg-inline-loader",
                options: {
                    classPrefix: true
                }
            },
            {
              test: /\.s[ac]ss$/i,
              use: [
                'css-loader',
                'sass-loader',
              ],
            },
            {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader'],
            },
        );
        return config;
    }
};

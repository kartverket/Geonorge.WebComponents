import { Meta } from "@storybook/web-components";
import { html } from "lit-html";

import "./content-container";
import "../body-text/body-text";

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
    title: "Example/ContentContainer",
    // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
    argTypes: {}
} as Meta;

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args

const Template = (props) => {
    return html`<content-container>${props.children}</content-container>`;
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Default.args = {
    children: html`<body-text>Example text and <a href="#">example link</a>.</body-text>`
};

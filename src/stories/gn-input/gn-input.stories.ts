import { Meta } from "@storybook/web-components";
import { html } from "lit-html";

import "./gn-input";

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
    title: "Example/GnInput",
    // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
    argTypes: {
        block: { control: "boolean" }
    }
} as Meta;

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args

const Template = (props) => {
    return html`<gn-input ?block=${props.block}>${props.children}</gn-input>`;
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Default.args = {
    children: html`<input />`
};

export const BlockElement = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
BlockElement.args = {
    block: true,
    children: html`<input />`
};

import { Meta } from "@storybook/web-components";
import { html } from "lit-html";

import "./gn-label";

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
    title: "Example/GnLabel",
    // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
    argTypes: {
        block: { control: "boolean" }
    }
} as Meta;

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args

const Template = (props) => {
    return html`<gn-label ?block=${props.block}>${props.children}</gn-label>`;
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Default.args = {
    children: html`<label>Inline label</label>`
};

export const BlockElement = Template.bind({});
BlockElement.args = {
    block: true,
    children: html`<label>Block label</label>`
};


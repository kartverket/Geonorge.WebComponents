import { Meta } from "@storybook/web-components";
import { html } from "lit-html";

import "./gn-input";
import "../gn-label/gn-label";

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
    title: "Example/GnInput",
    // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
    argTypes: {
        block: { control: "boolean" },
        fullwidth: { control: "boolean" }
    }
} as Meta;

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args

const Template = (props) => {
    return html`<gn-input ?block=${props.block} ?fullwidth=${props.fullwidth}>${props.children}</gn-input>`;
};

const TemplateWithInlineLabel = (props) => {
    return html`<gn-label><label for="inline-label-input">Label for input</label></gn-label><gn-input ?block=${props.block} ?fullwidth=${props.fullwidth}>${props.children}</gn-input>`;
};

const TemplateWithBlockLabel = (props) => {
    return html`<gn-label block><label for="block-label-input">Label for input</label></gn-label><gn-input ?block=${props.block} ?fullwidth=${props.fullwidth}>${props.children}</gn-input>`;
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Default.args = {
    children: html`<input />`
};

export const BlockElement = Template.bind({});
BlockElement.args = {
    block: true,
    children: html`<input />`
};

export const Disabled = Template.bind({});
Disabled.args = {
    block: true,
    children: html`<input disabled value="disabled input" />`
};

export const InlineWithLabel = TemplateWithInlineLabel.bind({});
InlineWithLabel.args = {
    children: html`<input id="inline-label-input" />`
};

export const BlockElementWithLabel = TemplateWithBlockLabel.bind({});
BlockElementWithLabel.args = {
    block: true,
    children: html`<input id="block-label-input" />`
};

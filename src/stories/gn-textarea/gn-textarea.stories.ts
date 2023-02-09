import { Meta } from "@storybook/web-components";
import { html } from "lit-html";

import "./gn-textarea";
import "../gn-label/gn-label";

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
    title: "Example/GnTextarea",
    // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
    argTypes: {
        block: { control: "boolean" },
        fullwidth: { control: "boolean" },
        resize: { control: 'select', options: ['none', 'both', 'horizontal', 'vertical', 'initial', 'inherit'] },
    }
} as Meta;

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args

const Template = (props) => {
    return html`<gn-textarea ?block=${props.block} ?fullwidth=${props.fullwidth} resize=${props.resize}>${props.children}</gn-textarea>`;
};

const TemplateWithInlineLabel = (props) => {
    return html`<gn-label><label for="inline-label-textarea">Label for textarea</label></gn-label><gn-textarea ?block=${props.block} ?fullwidth=${props.fullwidth} resize=${props.resize}>${props.children}</gn-textarea>`;
};

const TemplateWithBlockLabel = (props) => {
    return html`<gn-label block><label for="block-label-textarea">Label for textarea</label></gn-label><gn-textarea ?block=${props.block} ?fullwidth=${props.fullwidth} resize=${props.resize}>${props.children}</gn-textarea>`;
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Default.args = {
    children: html`<textarea></textarea>`
};

export const BlockElement = Template.bind({});
BlockElement.args = {
    block: true,
    children: html`<textarea></textarea>`
};

export const InlineWithLabel = TemplateWithInlineLabel.bind({});
InlineWithLabel.args = {
    children: html`<textarea id="inline-label-textarea"></textarea>`
};

export const BlockElementWithLabel = TemplateWithBlockLabel.bind({});
BlockElementWithLabel.args = {
    block: true,
    children: html`<textarea id="block-label-textarea"></textarea>`
};

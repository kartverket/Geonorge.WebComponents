import { Meta } from "@storybook/web-components";
import { html } from "lit-html";

import "./gn-sr-only";

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
    title: "Example/GnSrOnly",
    // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
    argTypes: {
        block: { control: "boolean" }
    }
} as Meta;

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args

const Template = (props) => {
    return html`<gn-sr-only ?block=${props.block}>${props.children}</gn-sr-only>`;
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Default.args = {
    children: html`<div>Content for <span>screen readers</span> only`
};

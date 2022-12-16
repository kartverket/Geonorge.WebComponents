import { Meta } from "@storybook/web-components";
import { html } from "lit-html";

import "./gn-select";

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
    title: "Example/GnSelect",
    // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
    argTypes: { 
        block: { control: 'boolean' }
    }
} as Meta;

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args

const Template = (props) => {
    return html`<gn-select ?block=${props.block}>${props.children}</gn-select>`;
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Default.args = {
    children: html`<select><option>Option 1</option><option>Option 2</option><option>Option 3</option></select>`
};

export const BlockElement = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
BlockElement.args = {
    block: true,
    children: html`<select><option>Option 1</option><option>Option 2</option><option>Option 3</option></select>`
};

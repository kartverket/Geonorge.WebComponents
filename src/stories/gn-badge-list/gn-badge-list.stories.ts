import { Meta } from "@storybook/web-components";
import { html } from "lit-html";

import "./gn-badge-list";

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
    title: "Example/GnBadgeList",
    // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
    argTypes: {
        block: { control: "boolean" }
    }
} as Meta;

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args

const Template = (props) => {
    return html`<gn-badge-list ?block=${props.block}>${props.children}</gn-badge-list>`;
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Default.args = {
    children: html`<ul>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
    </ul>`
};

export const BlockElement = Template.bind({});
BlockElement.args = {
    block: true,
    children: html`<ul>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
    </ul>`
};

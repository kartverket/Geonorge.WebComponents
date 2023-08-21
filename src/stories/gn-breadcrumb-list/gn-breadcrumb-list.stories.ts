import { Meta } from "@storybook/web-components";
import { html } from "lit-html";
import "./gn-breadcrumb-list";

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
    title: "Example/GnBreadcrumbList",
    // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
    argTypes: {}
} as Meta;

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args

const Template = ({ children, id }) => {
    return html`<gn-breadcrumb-list id=${id}>${children}</gn-breadcrumb-list>`;
}
export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args

Default.args = {
    id: "gn-breadcrumb-list",
    children: html`<ul>
    <li><a href="">First breadcrumb</a></li>
    <li><a href="">Second breadcrumb</a></li>
    <li>Current breadcrumb</li>
</ul>`
};

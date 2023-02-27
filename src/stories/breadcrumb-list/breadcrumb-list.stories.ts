import { Meta } from "@storybook/web-components";
import { html } from "lit-html";
import "./breadcrumb-list";

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
    title: "Example/BreadcrumbList",
    // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
    argTypes: {}
} as Meta;

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args

const Template = ({ breadcrumbs, id }) => {
    return html`<breadcrumb-list id=${id} breadcrumbs=${JSON.stringify(breadcrumbs)}></breadcrumb-list>`;
}
export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args

Default.args = {
    id: "breadcrumb-list",
    breadcrumbs:[
        {
            name: "First breadcrumb",
            url: "#first-breadcrumb"
        },
        {
            name: "Second breadcrumb",
            url: "#second-breadcrumb"
        }
    ]
};

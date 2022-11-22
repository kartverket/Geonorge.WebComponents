import { Meta } from "@storybook/web-components";
import { html } from "lit-html";

import "./navigation-tabs";
import "./navigation-tab-heading/navigation-tab-heading";
import "./navigation-tab-content/navigation-tab-content";

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
    title: "Example/NavigationTabs",
    // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
    argTypes: {}
} as Meta;

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args

const Template = (props) => {
    return html`<navigation-tabs>${props.children}</navigation-tabs>`;
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Default.args = {
    children: html` <navigation-tab-heading slot="tab-heading">Tab 1</navigation-tab-heading>
        <navigation-tab-content slot="tab-content">Content for tab 1</navigation-tab-content>
        <navigation-tab-heading slot="tab-heading">Tab 2</navigation-tab-heading>
        <navigation-tab-content slot="tab-content">Content for tab 2</navigation-tab-content>`
};

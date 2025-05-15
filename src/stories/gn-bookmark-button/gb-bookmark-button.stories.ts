import { Meta } from "@storybook/web-components";
import { html } from "lit-html";

import "./gn-bookmark-button";

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
    title: "Example/GnBookmarkButton",
    // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
    argTypes: {}
} as Meta;

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args

const Template = (props) => {
    return html`<div>
        <gn-bookmark-button><button>Button</button></gn-bookmark-button>
    </div>`;
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Default.args = {};

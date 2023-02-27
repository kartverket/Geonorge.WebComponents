import { Meta } from "@storybook/web-components";
import { html } from "lit-html";

import "./gn-accordion";

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
    title: "Example/GnAccordion",
    // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
    argTypes: {
        title: { control: "text" }
    }
} as Meta;

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args

const Template = (props) => {
    return html`<gn-accordion title=${props.title} ?expanded=${props.expanded}>Accordion content here</gn-accordion>`;
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Default.args = {
    title: "Accordion title",
    expanded: false
};

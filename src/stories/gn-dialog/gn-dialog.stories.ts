import { Meta } from "@storybook/web-components";
import { html } from "lit-html";

import "./gn-dialog";
import "../body-text/body-text";

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
    title: "Example/GnDialog",
    // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
    argTypes: {
        show: { control: "boolean" },
        noPadding: { control: "boolean" },
        width: { control: "string" },
        overflow: {
            control: "select",
            options: ["auto", "hidden", "inherit", "initial", "overlay", "revert", "scroll", "unset", "visible"]
        }
    }
} as Meta;

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args

const Template = (props) => {
    return html`<gn-dialog
        ?show=${props.show}
        ?nopadding=${props.noPadding}
        width=${props.width}
        overflow=${props.overflow}
        >${props.children}</gn-dialog
    >`;
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Default.args = {
    children: html`<heading-text><h2>Dialog heading</h2></heading-text
        ><body-text>Example text and <a href="#">example link</a>.</body-text>`,
    show: true
};

export const CustomWidth = Template.bind({});
CustomWidth.args = {
    children: html`<body-text>Example text and <a href="#">example link</a>.</body-text>`,
    show: true,
    width: "700px"
};

import { Meta } from "@storybook/web-components";
import { html } from "lit-html";

import "./gn-icon";

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
    title: "Example/GnIcon",
    // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
    argTypes: {
        icon: {
            control: "select",
            options: ["status-deficient", "status-good", "status-satisfactory", "status-useable"]
        }
    }
} as Meta;

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args
const AllIconsTemplate = () => {
    return html`<div>
        <gn-icon icon="status-deficient"></gn-icon>
        <gn-icon icon="status-useable"></gn-icon>
        <gn-icon icon="status-satisfactory"></gn-icon>
        <gn-icon icon="status-good"></gn-icon>
    </div>`;
};

const SingleIconTemplate = (props) => {
    return html`<div>
        <gn-icon icon=${props.icon} width=${props.width} height=${props.height}></gn-icon>
    </div>`;
};

export const AllIcons = AllIconsTemplate.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
AllIcons.args = {};

export const SingleIcon = SingleIconTemplate.bind({});
SingleIcon.args = {
    icon: "status-satisfactory",
    width: "1em",
    height: "1em"
};

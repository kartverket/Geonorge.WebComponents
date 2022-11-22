import { Meta } from "@storybook/web-components";
import { html } from "lit-html";

import "./standard-button";

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
    title: "Example/StandardButton",
    // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
    argTypes: {
        color: { control: 'select', options: ['default', 'primary', 'success', 'warning', 'danger'] },
        disabled: { control: 'boolean' }
    }
} as Meta;

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args

const Template = (props) => {
    return html`<standard-button ?disabled=${props.disabled} color=${props.color} content=${props.content} />`;
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Default.args = {
    content: "default button"
};

export const Primary = Template.bind({});
Primary.args = {
    content: "primary button",
    color: "primary"
};

export const Success = Template.bind({});
Success.args = {
    content: "success button",
    color: "success"
};
export const Warning = Template.bind({});
Warning.args = {
    content: "warning button",
    color: "warning"
};

export const Danger = Template.bind({});
Danger.args = {
    content: "danger button",
    color: "danger"
};

export const Disabled = Template.bind({});
Disabled.args = {
    content: "danger button",
    disabled: true
};

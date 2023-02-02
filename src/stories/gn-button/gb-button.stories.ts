import { Meta } from "@storybook/web-components";
import { html } from "lit-html";

import "./gn-button";

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
    title: "Example/GnButton",
    // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
    argTypes: {
        color: { control: 'select', options: ['default', 'primary', 'success', 'warning', 'danger'] },
    }
} as Meta;

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args

const Template = (props) => {
    return html`<gn-button color=${props.color}><button>Button with ${props.color || 'default'} color</button></gn-button>`;
};

const DisabledTemplate = (props) => {
    return html`<gn-button color=${props.color || 'default'}><button disabled>Disabled button with ${props.color || 'default'} color</button></gn-button>`;
};

const LinkButtonTemplate = (props) => {
    return html`<gn-button color=${props.color || 'default'}><a href="#">Link button with ${props.color || 'default'} color</button></gn-button>`;
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Default.args = {
};

export const Primary = Template.bind({});
Primary.args = {
    color: "primary"
};

export const Success = Template.bind({});
Success.args = {
    color: "success"
};
export const Warning = Template.bind({});
Warning.args = {
    color: "warning"
};

export const Danger = Template.bind({});
Danger.args = {
    color: "danger"
};

export const DisabledButton = DisabledTemplate.bind({});
DisabledButton.args = {
};

export const LinkButton = LinkButtonTemplate.bind({});
LinkButton.args = {
};


import { Meta } from "@storybook/web-components";
import { html } from "lit-html";

import "./geonorge-footer";

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
    title: "Example/GeonorgeFooter",
    // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
    argTypes: {
        language: {
            control: "select",
            options: ["Norsk", "English"],
            mapping: { Norsk: "no", English: "en" }
        },
        environment: {
            control: "select",
            options: ["Development", "Test", "Production"],
            mapping: { Development: "dev", Test: "test", Production: "" }
        }
    }
} as Meta;

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args

const Template = (props) =>
    html`<geonorge-footer language=${props.language} environment=${props.environment} version=${props.version} />`;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Default.args = {
    language: "no",
    environment: "dev",
    version: "2.3.15"
};

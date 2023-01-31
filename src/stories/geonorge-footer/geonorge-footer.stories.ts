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
        },
        accessibilitystatementurl: {
            type: { name: "string", required: false },
            defaultValue: "https://uustatus.no/nb/erklaringer/publisert/8f3210cf-aa22-4d32-9fda-4460e3c3e05a",
            description: "URL for accessibility statement"
        },
        hideaccessibilitystatementlink: { control: "boolean" }
    }
} as Meta;

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args

const Template = (props) =>
    html`<geonorge-footer
        language=${props.language}
        environment=${props.environment}
        version=${props.version}
        accessibilitystatementurl=${props.accessibilitystatementurl}
        ?hideaccessibilitystatementlink=${props.hideaccessibilitystatementlink}
    />`;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Default.args = {
    language: "no",
    environment: "dev",
    version: "2.3.15"
};

export const WithCustomAccessibilityStatementLink = Template.bind({});
WithCustomAccessibilityStatementLink.args = {
    language: "no",
    environment: "dev",
    version: "2.3.15",
    accessibilitystatementurl: "custom-accessibility-url-here"
};

export const WithoutAccessibilityStatementLink = Template.bind({});
WithoutAccessibilityStatementLink.args = {
    language: "no",
    environment: "dev",
    version: "2.3.15",
    hideaccessibilitystatementlink: true
};

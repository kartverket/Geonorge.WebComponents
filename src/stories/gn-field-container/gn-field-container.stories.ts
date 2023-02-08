import { Meta } from "@storybook/web-components";
import { html } from "lit-html";

import "./gn-field-container";
import "../gn-label/gn-label";
import "../gn-input/gn-input";

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
    title: "Example/GnFieldContainer",
    // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
    argTypes: {
        block: { control: "boolean" },
        inlineblock: { control: "boolean" }
    }
} as Meta;

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args

const Template = (props) => {
    return html`<gn-field-container ?block=${props.block} ?inlineblock=${props.inlineblock}><gn-label block><label for="input-1">Input field 1</label></gn-label><gn-input><input id="input-1" /></gn-input></gn-field-container><gn-field-container ?block=${props.block} ?inlineblock=${props.inlineblock}><gn-label block><label for="input-1">Input field 2</label></gn-label><gn-input><input id="input-2" /></gn-input></gn-field-container>`;
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Default.args = {
};

export const Block = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Block.args = {
    block: true
};

export const InlineBlock = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
InlineBlock.args = {
    inlineblock: true
};
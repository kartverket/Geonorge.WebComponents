import { Meta } from "@storybook/web-components";
import { html } from "lit-html";

import "./heading-text";

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
    title: "Example/HeadingText",
    // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
    argTypes: { 
        tag: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5'] },
        size: { control: 'select', options: ['1', '2', '3', '4', '5'] } 
    }
} as Meta;

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args

const Template = (props) => {
    const headingElement = document.createElement(props.tag);
    props.underline && headingElement.setAttribute("underline", true);
    props.size && headingElement.setAttribute("size", props.size);
    headingElement.innerHTML = props.children.strings;
    return html`<heading-text>${headingElement}</heading-text>`;
};

export const Heading1 = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Heading1.args = {
    tag: "h1",
    children: html`Heading 1`
};

export const Heading1WithUnderline = Template.bind({});
Heading1WithUnderline.args = {
    tag: "h1",
    underline: true,
    children: html`Heading 1 with underline`
};

export const Heading2 = Template.bind({});
Heading2.args = {
    tag: "h2",
    children: html`Heading 2`
};

export const Heading2WithUnderline = Template.bind({});
Heading2WithUnderline.args = {
    tag: "h2",
    underline: true,
    children: html`Heading 2 with underline`
};

export const Heading3 = Template.bind({});
Heading3.args = {
    tag: "h3",
    children: html`Heading 3`
};

export const Heading4 = Template.bind({});
Heading4.args = {
    tag: "h4",
    children: html`Heading 4`
};

export const Heading5 = Template.bind({});
Heading5.args = {
    tag: "h5",
    children: html`Heading 5`
};

export const Heading1WithSize5 = Template.bind({});
Heading1WithSize5.args = {
    tag: "h1",
    size: "5",
    children: html`Heading 1 with size 5`
};

/*

 <heading-text><h1>Heading 1</h1></heading-text>
<heading-text><h1 underline>Heading 1 with underline</h1></heading-text>
<heading-text><h2>Heading 2</h2></heading-text>
<heading-text><h2 underline>Heading 2 with underline</h2></heading-text>
<heading-text><h3>Heading 3</h3></heading-text>
<heading-text><h4>Heading 4</h4></heading-text>
<heading-text><h5>Heading 5</h5></heading-text>
<heading-text><h1 size="5">Heading 1 with size 5</h1></heading-text>

*/

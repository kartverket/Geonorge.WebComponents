import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';

import './body-text';

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
  title: 'Example/BodyText',
  // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
  argTypes: {
  },
} as Meta;

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args

const Template = (props) => html`<body-text>${props.children}</body-text>`;


export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Default.args = {
  children: html`<p>normal tekst <b>fet <span>tekst</span></b></p>`
};

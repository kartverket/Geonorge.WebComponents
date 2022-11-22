import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';

import './gn-table';

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
  title: 'Example/GnTable',
  // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
  argTypes: {
  },
} as Meta;

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args

const Template = (props) => html`<gn-table ?hoverable=${props.hoverable}>${props.children}</gn-table>`;


export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Default.args = {
  hoverable: false,
  children: html`<table>
  <thead>
      <tr>
          <th>Heading 1</th>
          <th>Heading 2</th>
          <th>Heading 3</th>
      </tr>
  </thead>
  <tbody>
      <tr>
          <td>Row 1 Data 1</td>
          <td>Row 1 Data 2</td>
          <td>Row 1 Data 3</td>
      </tr>
      <tr>
          <td>Row 2 Data 1</td>
          <td>Row 2 Data 2</td>
          <td>Row 2 Data 3</td>
      </tr>
  </tbody>
</table>`
};

export const Hoverable = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Hoverable.args = {
  hoverable: true,
  children: html`<table>
  <thead>
      <tr>
          <th>Heading 1</th>
          <th>Heading 2</th>
          <th>Heading 3</th>
      </tr>
  </thead>
  <tbody>
      <tr>
          <td>Row 1 Data 1</td>
          <td>Row 1 Data 2</td>
          <td>Row 1 Data 3</td>
      </tr>
      <tr>
          <td>Row 2 Data 1</td>
          <td>Row 2 Data 2</td>
          <td>Row 2 Data 3</td>
      </tr>
  </tbody>
</table>`
};

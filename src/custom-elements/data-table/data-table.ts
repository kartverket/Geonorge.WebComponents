// Dependencies
import {
  Component, CustomElement, CustomElementOptions, Prop, Dispatch, DispatchEmitter,
  Listen, Watch, getElement, getShadowRootElement, Toggle
} from 'super-custom-elements';

interface DataTableOptions extends CustomElementOptions {
}

@Component({
  tag: 'data-table',
  template: import('./data-table.html'),
  style: import('./data-table.scss')
})

export class DataTable extends CustomElement {
  private static readonly elementSelector = 'data-table';
  private dataTableTemplateElement: HTMLTableElement;
  private dataTableElement: HTMLTableElement;

  @Prop() id: string;
  @Toggle() hoverable: boolean;

  constructor() {
    super();
  }

  setup(options?: DataTableOptions): void {
    this.connect(options.container);
    if (options.id) {
      this.id = options.id;
    }
  }

  connectedCallback() {
    (this.querySelectorAll('table'))
    this.childNodes.forEach(node => {
      this.appendChild(node);
    })
    this.dataTableElement = this.querySelector('table');
    this.dataTableTemplateElement = getShadowRootElement(this, '#data-table');
    if (this.hoverable) {
      this.dataTableElement.classList.add('hoverable');
    }
    this.dataTableTemplateElement.appendChild(this.dataTableElement);
  }

  public static setup(selector: string, options: DataTableOptions) {
    const element = getElement<DataTable>(selector);
  }
}

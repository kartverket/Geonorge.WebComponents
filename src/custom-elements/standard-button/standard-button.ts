// Dependencies
import {
    Component, CustomElement, CustomElementOptions, Prop, Dispatch, DispatchEmitter,
    Listen, Watch, getElement, getShadowRootElement, Toggle
  } from 'super-custom-elements';
  
  interface StandardButtonOptions extends CustomElementOptions {
  }
  
  @Component({
    tag: 'standard-button',
    template: import('./standard-button.html'),
    style: import('./standard-button.scss')
  })
  
  export class StandardButton extends CustomElement {
    private static readonly elementSelector = 'standard-button';
    private standardButtonElement: HTMLButtonElement;
  
    @Prop() id: string;
    @Prop() content: string;
    @Prop() color: string;
    @Toggle() disabled: boolean;
  
    constructor() {
      super();
    }
  
    setup(options?: StandardButtonOptions): void {
      this.connect(options.container);
      if (options.id) {
        this.id = options.id;
      }
    }
  
    connectedCallback() {
      this.standardButtonElement = getShadowRootElement(this, '#standard-button');
      this.standardButtonElement.innerHTML = this.content;
      this.standardButtonElement.disabled = this.disabled;
      const availableColors: Array<string> = ['default', 'primary', 'success', 'warning', 'danger'];
      const color = availableColors.includes(this.color) ? this.color : 'default';
      this.standardButtonElement.classList.add(color);
    }
  
    public static setup(selector: string, options: StandardButtonOptions) {
      const element = getElement<StandardButton>(selector);
    }
  }
  
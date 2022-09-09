// Dependencies
import { Component, CustomElement, CustomElementOptions, getShadowRootElement, Toggle } from "super-custom-elements";

// Assets
import ArrowDown from 'assets/svg/arrow-down.svg';

interface GnSelectOptions extends CustomElementOptions {}

@Component({
    tag: "gn-select",
    template: import("./gn-select.html"),
    style: import("./gn-select.scss")
})
export class GnSelect extends CustomElement {
    @Toggle() block: boolean;

    constructor() {
        super();
    }

    connectedCallback() {
        const arrowDownIconElement = getShadowRootElement(this, '#arrow-down-icon');
        arrowDownIconElement.innerHTML = ArrowDown;
      }

    setup(options?: GnSelectOptions): void {}
}

// Dependencies
import { Component, CustomElement, CustomElementOptions } from "super-custom-elements";

interface GnFieldContainerOptions extends CustomElementOptions {}

@Component({
    tag: "gn-field-container",
    template: import("./gn-field-container.html"),
    style: import("./template.scss")
})
export class GnFieldContainer extends CustomElement {
    constructor() {
        super();
    }

    setup(options?: GnFieldContainerOptions): void {}
}

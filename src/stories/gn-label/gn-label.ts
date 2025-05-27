// Dependencies
import { Component, CustomElement, CustomElementOptions, Toggle } from "super-custom-elements";

interface GnLabelOptions extends CustomElementOptions {}

@Component({
    tag: "gn-label",
    template: import("./gn-label.html"),
    style: import("./template.scss")
})
export class GnLabel extends CustomElement {
    @Toggle() block: boolean;

    constructor() {
        super();
    }

    setup(options?: GnLabelOptions): void {}
}

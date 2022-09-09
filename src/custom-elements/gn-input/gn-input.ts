// Dependencies
import { Component, CustomElement, CustomElementOptions, Toggle } from "super-custom-elements";

interface GnInputOptions extends CustomElementOptions {}

@Component({
    tag: "gn-input",
    template: import("./gn-input.html"),
    style: import("./gn-input.scss")
})
export class GnInput extends CustomElement {
    @Toggle() block: boolean;

    constructor() {
        super();
    }

    setup(options?: GnInputOptions): void {}
}

// Dependencies
import { Component, CustomElement, CustomElementOptions } from "super-custom-elements";

interface BodyTextOptions extends CustomElementOptions {}

@Component({
    tag: "body-text",
    template: import("./body-text.html"),
    style: import("./body-text.scss")
})
export class BodyText extends CustomElement {

    constructor() {
        super();
    }

    setup(options?: BodyTextOptions): void {}
}

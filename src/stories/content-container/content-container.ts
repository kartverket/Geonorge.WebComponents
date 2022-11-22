// Dependencies
import { Component, CustomElement, CustomElementOptions } from "super-custom-elements";

interface ContentContainerOptions extends CustomElementOptions {}

@Component({
    tag: "content-container",
    template: import("./content-container.html"),
    style: import("./content-container.scss")
})
export class ContentContainer extends CustomElement {

    constructor() {
        super();
    }

    setup(options?: ContentContainerOptions): void {}
}

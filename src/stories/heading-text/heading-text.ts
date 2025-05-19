// Dependencies
import { Component, CustomElement, CustomElementOptions, Prop, Toggle } from "super-custom-elements";

interface HeadingTextOptions extends CustomElementOptions {}

@Component({
    tag: "heading-text",
    template: import("./heading-text.html"),
    style: import("./template.scss")
})
export class HeadingText extends CustomElement {
    @Prop() size: string;
    @Prop() tag: string;
    @Toggle() underline: boolean;

    constructor() {
        super();
    }

    setup(options?: HeadingTextOptions): void {}
}

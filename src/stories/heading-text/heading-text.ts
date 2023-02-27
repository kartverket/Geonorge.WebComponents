// Dependencies
import { Component, CustomElement, CustomElementOptions, Prop, Toggle } from "super-custom-elements";

// Helpers
import { addGlobalFonts } from "../../functions/guiHelpers";

interface HeadingTextOptions extends CustomElementOptions {}

@Component({
    tag: "heading-text",
    template: import("./heading-text.html"),
    style: import("./heading-text.scss")
})
export class HeadingText extends CustomElement {
    @Prop() size: string;
    @Prop() tag: string;
    @Toggle() underline: boolean;

    constructor() {
        super();
        addGlobalFonts();
    }

    setup(options?: HeadingTextOptions): void {}
}

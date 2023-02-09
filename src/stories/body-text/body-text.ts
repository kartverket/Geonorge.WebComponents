// Dependencies
import { Component, CustomElement, CustomElementOptions } from "super-custom-elements";

// Helpers
import { addGlobalFonts } from "../../functions/guiHelpers";

interface BodyTextOptions extends CustomElementOptions {}

@Component({
    tag: "body-text",
    template: import("./body-text.html"),
    style: import("./body-text.scss")
})
export class BodyText extends CustomElement {
    constructor() {
        super();
        addGlobalFonts();
    }

    setup(options?: BodyTextOptions): void {}
}

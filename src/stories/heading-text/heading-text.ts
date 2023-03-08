// Dependencies
import { Component, CustomElement, CustomElementOptions, Prop, Toggle } from "super-custom-elements";

// Helpers
import { addGlobalFonts, addGlobalStylesheet } from "../../functions/guiHelpers";

// Stylesheets
import style from "./heading-text.scss";

interface HeadingTextOptions extends CustomElementOptions {}

@Component({
    tag: "heading-text",
    template: import("./heading-text.html")
})
export class HeadingText extends CustomElement {
    @Prop() size: string;
    @Prop() tag: string;
    @Toggle() underline: boolean;

    constructor() {
        super();
        addGlobalFonts();
        addGlobalStylesheet("heading-text-styles", style);
    }

    setup(options?: HeadingTextOptions): void {}
}

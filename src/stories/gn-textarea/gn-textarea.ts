// Dependencies
import { Component, CustomElement, CustomElementOptions, Prop, Toggle } from "super-custom-elements";

// Helpers
import { addGlobalStylesheet, addGlobalFonts } from "../../functions/guiHelpers";

// Stylesheets
import style from "./gn-textarea.scss";

interface GnTextareaOptions extends CustomElementOptions {}

@Component({
    tag: "gn-textarea",
    template: import("./gn-textarea.html")
})
export class GnTextarea extends CustomElement {
    @Toggle() block: boolean;
    @Toggle() fullwidth: boolean;
    @Prop() resize: string;

    constructor() {
        super();
        addGlobalFonts();
        addGlobalStylesheet("gn-textarea-styles", style);
    }

    setup(options?: GnTextareaOptions): void {}
}

// Dependencies
import { Component, CustomElement, CustomElementOptions, Toggle } from "super-custom-elements";

// Helpers
import { addGlobalStylesheet, addGlobalFonts } from "../../functions/guiHelpers";

// Stylesheets
import style from "./gn-label.scss";

interface GnLabelOptions extends CustomElementOptions {}

@Component({
    tag: "gn-label",
    template: import("./gn-label.html")
})
export class GnLabel extends CustomElement {
    @Toggle() block: boolean;

    constructor() {
        super();
        addGlobalFonts();
        addGlobalStylesheet("gn-label-styles", style);
    }

    setup(options?: GnLabelOptions): void {}
}

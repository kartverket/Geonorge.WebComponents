// Dependencies
import { Component, CustomElement, CustomElementOptions, Toggle } from "super-custom-elements";

// Helpers
import { addGlobalStylesheet } from "../../functions/guiHelpers";

// Stylesheets
import style from "./gn-input.scss";

interface GnInputOptions extends CustomElementOptions {}

@Component({
    tag: "gn-input",
    template: import("./gn-input.html")
})
export class GnInput extends CustomElement {
    @Toggle() block: boolean;
    @Toggle() fullwidth: boolean;

    constructor() {
        super();
        addGlobalStylesheet("gn-input-styles", style);
    }

    setup(options?: GnInputOptions): void {}
}

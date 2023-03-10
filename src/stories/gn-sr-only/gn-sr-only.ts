// Dependencies
import { Component, CustomElement, CustomElementOptions, Toggle } from "super-custom-elements";

// Helpers
import { addGlobalStylesheet } from "../../functions/guiHelpers";

// Stylesheets
import style from "./gn-sr-only.scss";

interface GnSrOnlyOptions extends CustomElementOptions {}

@Component({
    tag: "gn-sr-only",
    template: import("./gn-sr-only.html")
})
export class GnSrOnly extends CustomElement {
    @Toggle() block: boolean;

    constructor() {
        super();
        addGlobalStylesheet("gn-sr-only-styles", style);
    }

    setup(options?: GnSrOnlyOptions): void {}
}

// Dependencies
import { Component, CustomElement, CustomElementOptions } from "super-custom-elements";

// Helpers
import { addGlobalStylesheet } from "../../functions/guiHelpers";

// Stylesheets
import style from "./gn-field-container.scss";

interface GnFieldContainerOptions extends CustomElementOptions {}

@Component({
    tag: "gn-field-container",
    template: import("./gn-field-container.html")
})
export class GnFieldContainer extends CustomElement {
    constructor() {
        super();
        addGlobalStylesheet("gn-field-container-styles", style);
    }

    setup(options?: GnFieldContainerOptions): void {}
}

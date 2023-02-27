// Dependencies
import { Component, CustomElement, CustomElementOptions, Toggle } from "super-custom-elements";

// Stylesheets
import style from "./content-container.scss";

// Helpers
import { addGlobalStylesheet, addGlobalFonts } from "../../functions/guiHelpers";

interface ContentContainerOptions extends CustomElementOptions {}

@Component({
    tag: "content-container",
    template: import("./content-container.html")
})
export class ContentContainer extends CustomElement {
    @Toggle() fullwidth: boolean;

    constructor() {
        super();
        addGlobalFonts();
        addGlobalStylesheet("content-container-styles", style);
    }

    setup(options?: ContentContainerOptions): void {}
}

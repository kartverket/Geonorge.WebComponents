// Dependencies
import { Component, CustomElement, CustomElementOptions, getShadowRootElement, Toggle } from "super-custom-elements";

// Helpers
import { addGlobalStylesheet, addGlobalFonts } from "../../functions/guiHelpers";

// Assets
import ArrowDown from "../../assets/svg/arrow-down.svg";

// Stylesheets
import style from "./gn-select.scss";

interface GnSelectOptions extends CustomElementOptions {}

@Component({
    tag: "gn-select",
    template: import("./gn-select.html"),
    style: import("./template.scss")
})
export class GnSelect extends CustomElement {
    @Toggle() block: boolean;
    @Toggle() fullwidth: boolean;

    constructor() {
        super();
        addGlobalFonts();
        addGlobalStylesheet("gn-select-styles", style);
    }

    connectedCallback() {
        const arrowDownIconElement = getShadowRootElement(this, "#arrow-down-icon");
        arrowDownIconElement.innerHTML = ArrowDown;
    }

    setup(options?: GnSelectOptions): void {}
}

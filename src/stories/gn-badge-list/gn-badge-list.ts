// Dependencies
import { Component, CustomElement, CustomElementOptions, Toggle } from "super-custom-elements";

// Helpers
import { addGlobalStylesheet, addGlobalFonts } from "../../functions/guiHelpers";

// Stylesheets
import style from "./gn-badge-list.scss";

interface GnBadgeListOptions extends CustomElementOptions {}

@Component({
    tag: "gn-badge-list",
    template: import("./gn-badge-list.html")
})
export class GnBadgeList extends CustomElement {
    @Toggle() block: boolean;

    constructor() {
        super();
        addGlobalFonts();
        addGlobalStylesheet("gn-badge-list-styles", style);
    }

    setup(options?: GnBadgeListOptions): void {}
}

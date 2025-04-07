// Dependencies
import { Component, CustomElement, CustomElementOptions, Toggle } from "super-custom-elements";

// Helpers
import { addGlobalStylesheet } from "../../functions/guiHelpers";

// Stylesheets
import style from "./gn-list.scss";

interface GnListOptions extends CustomElementOptions {}

@Component({
    tag: "gn-list",
    template: import("./gn-list.html")
})
export class GnList extends CustomElement {
    @Toggle() block: boolean;

    constructor() {
        super();
        addGlobalStylesheet("gn-list-styles", style);
    }

    setup(options?: GnListOptions): void {}
}

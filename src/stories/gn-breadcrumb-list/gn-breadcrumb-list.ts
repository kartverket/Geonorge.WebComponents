// Dependencies
import { Component, CustomElement, CustomElementOptions, Toggle } from "super-custom-elements";

// Helpers
import { addGlobalStylesheet } from "../../functions/guiHelpers";

// Stylesheets
import style from "./gn-breadcrumb-list.scss";

interface GnBreadcrumbListOptions extends CustomElementOptions {}

@Component({
    tag: "gn-breadcrumb-list",
    template: import("./gn-breadcrumb-list.html")
})
export class GnBreadcrumbList extends CustomElement {
    @Toggle() block: boolean;
    @Toggle() fullwidth: boolean;

    constructor() {
        super();
        addGlobalStylesheet("gn-breadcrumb-list-styles", style);
    }

    setup(options?: GnBreadcrumbListOptions): void {}
}

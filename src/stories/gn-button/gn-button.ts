// Dependencies
import { Component, CustomElement, CustomElementOptions, Prop } from "super-custom-elements";

// Helpers
import { addGlobalStylesheet, addGlobalFonts } from "../../functions/guiHelpers";

// Stylesheets
import style from "./gn-button.scss";

interface GnButtonOptions extends CustomElementOptions {}

@Component({
    tag: "gn-button",
    template: import("./gn-button.html")
})
export class GnButton extends CustomElement {
    @Prop() color: string;

    constructor() {
        super();
        addGlobalFonts();
        addGlobalStylesheet("gn-button-styles", style);
    }

    setup(options?: GnButtonOptions): void {
        this.connect(options.container);
        if (options.id) {
            this.id = options.id;
        }
    }
}

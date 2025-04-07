// Dependencies
import { Component, CustomElement, CustomElementOptions, Prop, getElement, Toggle, Watch } from "super-custom-elements";

// Helpers
import { addGlobalStylesheet } from "../../functions/guiHelpers";

// Stylesheets
import style from "./gn-table.scss";

interface GnTableOptions extends CustomElementOptions {}

@Component({
    tag: "gn-table",
    template: import("./gn-table.html")
})
export class GnTable extends CustomElement {
    @Prop() id: string;
    @Toggle() hoverable: boolean;

    constructor() {
        super();
        addGlobalStylesheet("gn-table-styles", style);
    }

    setup(options?: GnTableOptions): void {
        this.connect(options.container);
        if (options.id) {
            this.id = options.id;
        }
    }

    public static setup(selector: string, options: GnTableOptions) {
        const element = getElement<GnTable>(selector);
    }
}

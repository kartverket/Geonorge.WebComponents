// Dependencies
import { Component, CustomElement, CustomElementOptions, Prop, getElement, Toggle } from "super-custom-elements";

interface GnTableOptions extends CustomElementOptions {}

@Component({
    tag: "gn-table",
    template: import("./gn-table.html"),
    style: import("./gn-table.scss")
})
export class GnTable extends CustomElement {
    @Prop() id: string;
    @Toggle() hoverable: boolean;

    constructor() {
        super();
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

// Dependencies
import { Component, CustomElement, CustomElementOptions, Prop, getElement, Toggle } from "super-custom-elements";

interface DataTableOptions extends CustomElementOptions {}

@Component({
    tag: "data-table",
    template: import("./data-table.html"),
    style: import("./data-table.scss")
})
export class DataTable extends CustomElement {
    @Prop() id: string;
    @Toggle() hoverable: boolean;

    constructor() {
        super();
    }

    setup(options?: DataTableOptions): void {
        this.connect(options.container);
        if (options.id) {
            this.id = options.id;
        }
    }

    public static setup(selector: string, options: DataTableOptions) {
        const element = getElement<DataTable>(selector);
    }
}

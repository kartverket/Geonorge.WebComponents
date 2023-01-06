// Dependencies
import {
    Component,
    CustomElement,
    CustomElementOptions,
    Prop,
    Watch,
    getElement,
    getShadowRootElement,
    Toggle
} from "super-custom-elements";

// Helpers
import { addGlobalStylesheet } from "../../functions/guiHelpers";

// Stylesheets
import style from "./gn-button.scss";

interface StandardButtonOptions extends CustomElementOptions {}

@Component({
    tag: "gn-button",
    template: import("./gn-button.html")
})
export class GnButton extends CustomElement {
    private static readonly elementSelector = "gn-button";

    @Prop() color: string;

    constructor() {
        super();
        addGlobalStylesheet("gn-button-styles", style);
    }

    setup(options?: StandardButtonOptions): void {
        this.connect(options.container);
        if (options.id) {
            this.id = options.id;
        }
    }

    public static setup(selector: string, options: StandardButtonOptions) {
        const element = getElement<GnButton>(selector);
    }
}

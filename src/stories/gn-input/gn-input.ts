// Dependencies
import {
    Component,
    CustomElement,
    CustomElementOptions,
    Prop,
    Toggle,
    Watch,
    getShadowRootElement
} from "super-custom-elements";

// Helpers
import { addGlobalStylesheet } from "../../functions/guiHelpers";

// Stylesheets
import style from "./gn-input.scss";

interface GnInputOptions extends CustomElementOptions {}

@Component({
    tag: "gn-input",
    template: import("./gn-input.html")
})
export class GnInput extends CustomElement {
    @Toggle() block: boolean;
    @Toggle() fullwidth: boolean;
    @Prop() width: string;

    constructor() {
        super();
        addGlobalStylesheet("gn-input-styles", style);
    }

    @Watch("width")
    widthChanged() {
        const inputContainerElement = getShadowRootElement(this, "#input-container");
        inputContainerElement.style.width = this.width;
    }

    setup(options?: GnInputOptions): void {}
}

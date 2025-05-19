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

interface GnInputOptions extends CustomElementOptions {}

@Component({
    tag: "gn-input",
    template: import("./gn-input.html"),
    style: import("./template.scss")
})
export class GnInput extends CustomElement {
    @Toggle() block: boolean;
    @Toggle() fullwidth: boolean;
    @Prop() width: string;

    constructor() {
        super();
    }

    @Watch("width")
    widthChanged() {
        const inputContainerElement = getShadowRootElement(this, "#input-container");
        inputContainerElement.style.width = this.width;
    }

    setup(options?: GnInputOptions): void {}
}

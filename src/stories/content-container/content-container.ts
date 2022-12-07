// Dependencies
import { addGlobalStylesheet } from "../../functions/guiHelpers";
import { Component, CustomElement, CustomElementOptions } from "super-custom-elements";
import style from "./content-container.scss";

interface ContentContainerOptions extends CustomElementOptions {}

@Component({
    tag: "content-container",
    template: import("./content-container.html")   
})
export class ContentContainer extends CustomElement {

    constructor() {
        super();
        addGlobalStylesheet("content-container-styles", style);
    }

    setup(options?: ContentContainerOptions): void {}
}

// Dependencies
import {
    Component,
    CustomElement,
    CustomElementOptions,
    getShadowRootElement,
    Prop,
    Toggle,
    Watch
} from "super-custom-elements";

// Helpers
import { addGlobalStylesheet, addGlobalFonts } from "../../functions/guiHelpers";

// Stylesheets
import style from "./gn-accordion.scss";

interface GnAccordionOptions extends CustomElementOptions {}

@Component({
    tag: "gn-accordion",
    template: import("./gn-accordion.html"),
    style: import("./template.scss")
})
export class GnAccordion extends CustomElement {
    @Prop() title: string;
    @Toggle() expanded: boolean;

    constructor() {
        super();
        addGlobalFonts();
        addGlobalStylesheet("gn-accordion-styles", style);
    }

    toggleExpand() {
        const contentElement = getShadowRootElement(this, "#content");
        contentElement.classList.add("initialized");

        const isExpanded = this.isExpanded(this.expanded);
        this.setAttribute("expanded", isExpanded ? "false" : "true");
    }

    isExpanded(expanded) {
        return expanded?.toString() === "" || expanded?.toString() === "true";
    }

    connectedCallback() {
        const panelButtonElement = getShadowRootElement(this, "#panel-button");
        panelButtonElement.onclick = () => this.toggleExpand();
        const panelTextElement = getShadowRootElement(this, "#panel-text");
        panelTextElement.innerText = this.title;
    }

    @Watch("title")
    titleChanged() {
        const panelTextElement = getShadowRootElement(this, "#panel-text");
        panelTextElement.innerText = this.title;
    }

    @Watch("expanded")
    expandedChanged() {
        const isExpanded = this.isExpanded(this.expanded);

        const panelButtonElement = getShadowRootElement(this, "#panel-button");
        const panelChevronElement = getShadowRootElement(this, "#panel-chevron");
        const contentElement = getShadowRootElement(this, "#content");

        if (isExpanded) {
            panelButtonElement.setAttribute("aria-expanded", "true");
            panelChevronElement.classList.add("expanded");
            contentElement.classList.add("expanded");
        } else {
            panelButtonElement.setAttribute("aria-expanded", "false");
            panelChevronElement.classList.remove("expanded");
            contentElement.classList.remove("expanded");
        }
    }

    setup(options?: GnAccordionOptions): void {
        this.connect(options.container);
        if (options.id) {
            this.id = options.id;
        }
    }
}

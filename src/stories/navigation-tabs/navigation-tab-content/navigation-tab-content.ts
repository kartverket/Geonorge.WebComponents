// Dependencies
import { Component, CustomElement, CustomElementOptions, Prop, getElement } from "super-custom-elements";

let navigationTabContentCounter = 0;

interface NavigationTabContentOptions extends CustomElementOptions {}

@Component({
    tag: "navigation-tab-content",
    template: import("./navigation-tab-content.html")
})
export class NavigationTabContent extends CustomElement {
    private static readonly elementSelector = "navigation-tab-content";

    static get observedAttributes() {
        return ["selected"];
    }

    @Prop() id: string;

    constructor() {
        super();
    }

    setup(options?: NavigationTabContentOptions): void {
        this.connect(options.container);
        if (options.id) {
            this.id = options.id;
        }
    }

    connectedCallback() {
        this.setAttribute("role", "tabpanel");
        if (!this.id) {
            this.id = `navigation-tab-content-${navigationTabContentCounter++}`;
        }
    }

    disconnectedCallback() {}

    public static setup(selector: string, options: NavigationTabContentOptions) {
        const element = getElement<NavigationTabContent>(selector);
    }
}

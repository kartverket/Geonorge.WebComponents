// Dependencies
import { Component, CustomElement, CustomElementOptions, getShadowRootElement, Prop } from "super-custom-elements";

// Helpers
import { addGlobalStylesheet, addGlobalFonts, getDocumentHeading } from "../../functions/guiHelpers";

// Stylesheets
import style from "./gn-bookmark-button.scss";

interface GnBookmarkButtonOptions extends CustomElementOptions {}

@Component({
    tag: "gn-bookmark-button",
    template: import("./gn-bookmark-button.html")
})
export class GnBookmarkButton extends CustomElement {
    private bookmarkButton: HTMLButtonElement;

    @Prop() id: string;
    @Prop() language: string;
    @Prop() environment: string;

    constructor() {
        super();
        addGlobalFonts();
        addGlobalStylesheet("gn-bookmark-button-styles", style);
    }

    connectedCallback() {
        this.bookmarkButton = getShadowRootElement(this, "#bookmark-button");
        if (this.bookmarkButton) {
            this.appendBookmarkButtonAfterFirstHeading();
        } else {
            console.error("Bookmark button not found in shadow DOM");
        }
    }

    appendBookmarkButtonAfterFirstHeading() {
        const headingContainer = document.createElement("div");
        const firstHeading = getDocumentHeading();
        if (firstHeading) {
            firstHeading.parentNode.insertBefore(headingContainer, firstHeading);
            headingContainer.appendChild(firstHeading);
        }

        if (firstHeading && this.bookmarkButton) {
            console.log(firstHeading);
            this.bookmarkButton.appendChild(
                document.createTextNode(`${this.language === "" ? "Bookmark" : "Lesezeichen"}`)
            );
            firstHeading.after(this.bookmarkButton);
        } else {
            console.error("First heading or bookmark button is missing");
        }
    }

    setup(options?: GnBookmarkButtonOptions): void {
        this.connect(options.container);
        if (options.id) {
            this.id = options.id;
        }
    }
}

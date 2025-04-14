// Dependencies
import { Component, CustomElement, CustomElementOptions, getShadowRootElement, Prop } from "super-custom-elements";

// Helpers
import { addGlobalStylesheet, getDocumentHeading } from "../../functions/guiHelpers";

// Assets
import StarIcon from "../../assets/svg/star.svg";

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
        addGlobalStylesheet("gn-bookmark-button-styles", style);
    }

    connectedCallback() {
        this.bookmarkButton = getShadowRootElement(this, "#gn-bookmark-button");
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
            firstHeading.style.display = "inline-block";
            firstHeading.parentNode.insertBefore(headingContainer, firstHeading);
            headingContainer.appendChild(firstHeading);
        }
        if (firstHeading && this.bookmarkButton) {
            this.bookmarkButton.innerHTML = StarIcon;
            this.bookmarkButton.setAttribute(
                "aria-label",
                this.language === "en" ? "Add shortcut to this page" : "Lagre snarvei for denne siden"
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

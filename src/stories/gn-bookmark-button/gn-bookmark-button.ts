// Dependencies
import { Component, CustomElement, CustomElementOptions, getShadowRootElement, Prop } from "super-custom-elements";

// Helpers
import { addGlobalStylesheet, getDocumentHeading } from "../../functions/guiHelpers";
import { deleteShortcutItem, fetchShortcutItems, postShortcutItem } from "../../functions/apiHelpers";

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
    @Prop() userinfo: string;
    @Prop() token: string;

    constructor() {
        super();
        addGlobalStylesheet("gn-bookmark-button-styles", style);
    }

    connectedCallback() {
        this.bookmarkButton = getShadowRootElement(this, "#gn-bookmark-button");
        if (this.bookmarkButton) {
            this.appendBookmarkButtonAfterFirstHeading();
            fetchShortcutItems(this.environment, "this.token").then((shortcutItems) => {
                const isAlreadyBookmarked = shortcutItems.some((item) => item.url === window.location.href);
                this.bookmarkButton.innerHTML = isAlreadyBookmarked ? StarIcon : StarIcon;
                this.bookmarkButton.setAttribute(
                    "aria-label",
                    this.language === "en" ? "Remove shortcut to this page" : "Fjern snarvei for denne siden"
                );
                this.bookmarkButton.addEventListener("click", () => {
                    if (isAlreadyBookmarked) {
                        this.removeBookmark();
                    }
                    this.addBookmark();
                });
            });
        } else {
            console.error("Bookmark button not found in shadow DOM");
        }
    }

    disconnectedCallback() {
        this.bookmarkButton.removeEventListener("click", this.addBookmark);
    }
    addBookmark() {
        const bookmarkData = {
            name: document.title,
            url: window.location.href
        };
        postShortcutItem(this.environment, this.token, bookmarkData)
            .then((data) => {
                console.log("Shortcut added successfully:", data);
                this.bookmarkButton.innerHTML = StarIcon;
                this.bookmarkButton.setAttribute(
                    "aria-label",
                    this.language === "en" ? "Remove shortcut to this page" : "Fjern snarvei for denne siden"
                );
            })
            .catch((error) => {
                console.error("Error adding bookmark:", error);
            });
    }
    removeBookmark() {
        deleteShortcutItem(this.environment, this.token, { url: window.location.href })
            .then((data) => {
                console.log("Shortcut removed successfully:", data);
                this.bookmarkButton.innerHTML = StarIcon;
                this.bookmarkButton.setAttribute(
                    "aria-label",
                    this.language === "en" ? "Add shortcut to this page" : "Lagre snarvei for denne siden"
                );
            })
            .catch((error) => {
                console.error("Error removing bookmark:", error);
            });
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

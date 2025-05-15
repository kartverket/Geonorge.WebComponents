// Dependencies
import {
    Component,
    CustomElement,
    CustomElementOptions,
    getElement,
    getShadowRootElement,
    Prop,
    Watch
} from "super-custom-elements";

// Components
import { GnButton } from "../gn-button/gn-button";
import { GnDialog } from "../gn-dialog/gn-dialog";

// Helpers
import { addGlobalStylesheet, getDocumentHeading } from "../../functions/guiHelpers";
import { deleteShortcutItem, fetchShortcutItem, postShortcutItem } from "../../functions/apiHelpers";

// Assets
import StarIcon from "../../assets/svg/star.svg";

// Stylesheets
import style from "./gn-bookmark-button.scss";

interface GnBookmarkButtonOptions extends CustomElementOptions {
    getAuthToken?: Function;
}

@Component({
    tag: "gn-bookmark-button",
    template: import("./gn-bookmark-button.html")
})
export class GnBookmarkButton extends CustomElement {
    private bookmarkButton: HTMLButtonElement;
    private dialogElement: HTMLElement;
    @Prop() id: string;
    @Prop() language: string;
    @Prop() environment: string;
    @Prop() token: string;
    getAuthToken: Function;

    constructor() {
        super();
        addGlobalStylesheet("gn-bookmark-button-styles", style);
    }

    setup(options?: GnBookmarkButtonOptions): void {
        this.connect(options.container);
        if (options.id) {
            this.id = options.id;
        }
    }

    connectedCallback() {
        this.dialogElement = getShadowRootElement(this, "gn-dialog");

        const gnButton = new GnButton();
        const gnDialog = new GnDialog();
    }

    disconnectedCallback() {
        // this.bookmarkButton.removeEventListener("click", this.addBookmark);
    }

    async getShortcutItem(environment: string, token: string) {
        try {
            const shortcutItem = await fetchShortcutItem(environment, token, window.location.href);
            return shortcutItem;
        } catch (error) {
            console.error("Error fetching shortcut items:", error);
        }
    }

    addBookmark(token: string) {
        const bookmarkData = {
            name: document.title,
            url: window.location.href
        };
        postShortcutItem(this.environment, token, bookmarkData)
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
    removeBookmark(token: string) {
        deleteShortcutItem(this.environment, token, { url: window.location.href })
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

    openDialog() {
        this.dialogElement.setAttribute("show", "true");
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
            this.bookmarkButton.onclick = () => {
                this.openDialog();
                /*const token = this.getAuthToken();
                if (!token) {
                    console.error("No token found");
                    return;
                }
                this.addBookmark(token);*/
            };
            this.bookmarkButton.setAttribute(
                "aria-label",
                this.language === "en" ? "Add shortcut to this page" : "Lagre snarvei for denne siden"
            );
            firstHeading.after(this.bookmarkButton);
        } else {
            console.error("First heading or bookmark button is missing");
        }
    }

    @Watch("token")
    async tokenChanged() {
        const token = this?.token;

        // Temporary fix for testing
        /*if (!token) { 
            console.error("No token found");
            return;
        }*/

        this.environment = this.environment || "dev";
        this.language = this.language || "en";
        this.bookmarkButton = getShadowRootElement(this, "#gn-bookmark-button");

        const shortcutItem = await this.getShortcutItem(this.environment, token);
        console.log("shortcutItem", shortcutItem);

        if (this.bookmarkButton) {
            this.appendBookmarkButtonAfterFirstHeading();
            // fetchShortcutItems(this.environment, "this.token").then((shortcutItems) => {
            /* fetchShortcutItems("dev", "this.token").then((shortcutItems) => {
                // Temporary fix for testing
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
            });*/
        } else {
            console.error("Bookmark button not found in shadow DOM");
        }
    }

    public static setup(selector: string, options: GnBookmarkButtonOptions) {
        setTimeout(() => {
            const element = getElement<GnBookmarkButton>(selector);
            element.getAuthToken = options.getAuthToken;
            element.token = options.getAuthToken();
        });
    }
}

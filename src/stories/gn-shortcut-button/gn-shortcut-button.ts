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
import style from "./gn-shortcut-button.scss";

interface GnShortcutButtonOptions extends CustomElementOptions {
    getAuthToken?: Function;
}

@Component({
    tag: "gn-shortcut-button",
    template: import("./gn-shortcut-button.html")
})
export class GnShortcutButton extends CustomElement {
    private shortcutButton: HTMLButtonElement;
    private dialogElement: HTMLElement;
    @Prop() id: string;
    @Prop() language: string;
    @Prop() environment: string;
    @Prop() token: string;
    getAuthToken: Function;

    constructor() {
        super();
        addGlobalStylesheet("gn-shortcut-button-styles", style);
    }

    setup(options?: GnShortcutButtonOptions): void {
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

    disconnectedCallback() {}

    async getShortcutItem(environment: string, token: string) {
        try {
            const shortcutItem = await fetchShortcutItem(environment, token, window.location.href);
            return shortcutItem;
        } catch (error) {
            console.error("Error fetching shortcut items:", error);
        }
    }

    addShortcut(token: string) {
        const shortcutData = {
            name: document.title,
            url: window.location.href
        };
        postShortcutItem(this.environment, token, shortcutData)
            .then((data) => {
                console.log("Shortcut added successfully:", data);
                this.shortcutButton.innerHTML = StarIcon;
                this.shortcutButton.setAttribute(
                    "aria-label",
                    this.language === "en" ? "Remove shortcut to this page" : "Fjern snarvei for denne siden"
                );
            })
            .catch((error) => {
                console.error("Error adding shortcut:", error);
            });
    }
    removeShortcut(token: string) {
        deleteShortcutItem(this.environment, token, { url: window.location.href })
            .then((data) => {
                console.log("Shortcut removed successfully:", data);
                this.shortcutButton.innerHTML = StarIcon;
                this.shortcutButton.setAttribute(
                    "aria-label",
                    this.language === "en" ? "Add shortcut to this page" : "Lagre snarvei for denne siden"
                );
            })
            .catch((error) => {
                console.error("Error removing shortcut:", error);
            });
    }

    openDialog() {
        this.dialogElement.setAttribute("show", "true");
    }

    appendShortcutButtonAfterFirstHeading() {
        const headingContainer = document.createElement("div");
        const firstHeading = getDocumentHeading();
        if (firstHeading) {
            firstHeading.style.display = "inline-block";
            firstHeading.parentNode.insertBefore(headingContainer, firstHeading);
            headingContainer.appendChild(firstHeading);
        }
        if (firstHeading && this.shortcutButton) {
            this.shortcutButton.innerHTML = StarIcon;
            this.shortcutButton.onclick = () => {
                this.openDialog();
                /*const token = this.getAuthToken();
                if (!token) {
                    console.error("No token found");
                    return;
                }
                this.addShortcut(token);*/
            };
            this.shortcutButton.setAttribute(
                "aria-label",
                this.language === "en" ? "Add shortcut to this page" : "Lagre snarvei for denne siden"
            );
            firstHeading.after(this.shortcutButton);
        } else {
            console.error("First heading or shortcut button is missing");
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
        this.shortcutButton = getShadowRootElement(this, "#gn-shortcut-button");

        const shortcutItem = await this.getShortcutItem(this.environment, token);
        console.log("shortcutItem", shortcutItem);

        if (this.shortcutButton) {
            this.appendShortcutButtonAfterFirstHeading();
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
            console.error("Shortcut button not found in shadow DOM");
        }
    }

    public static setup(selector: string, options: GnShortcutButtonOptions) {
        setTimeout(() => {
            const element = getElement<GnShortcutButton>(selector);
            element.getAuthToken = options.getAuthToken;
            element.token = options.getAuthToken();
        });
    }
}

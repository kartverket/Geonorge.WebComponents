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
import { GnFieldContainer } from "../gn-field-container/gn-field-container";
import { GnInput } from "../gn-input/gn-input";
import { BodyText } from "../body-text/body-text";
import { HeadingText } from "../heading-text/heading-text";

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
    template: import("./gn-shortcut-button.html"),
    style: import("./template.scss")
})
export class GnShortcutButton extends CustomElement {
    private shortcutButton: HTMLButtonElement;
    private addShortcutDialogElement: HTMLElement;
    private removeShortcutDialogElement: HTMLElement;
    private saveShortcutButtonElement: HTMLButtonElement;
    private removeShortcutButtonElement: HTMLButtonElement;
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
        this.addShortcutDialogElement = getShadowRootElement(this, "#add-shortcut-dialog");
        this.removeShortcutDialogElement = getShadowRootElement(this, "#remove-shortcut-dialog");
        this.saveShortcutButtonElement = getShadowRootElement(this, "#save-shortcut-button");
        this.removeShortcutButtonElement = getShadowRootElement(this, "#remove-shortcut-button");
        const gnButton = new GnButton();
        const gnDialog = new GnDialog();
        const gnFieldContainer = new GnFieldContainer();
        const gnInput = new GnInput();
        const bodyText = new BodyText();
        const headingText = new HeadingText();
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

    saveShortcut(token: string) {
        const shortcutData = {
            name: document.title,
            url: window.location.href
        };
        postShortcutItem(this.environment, token, shortcutData)
            .then((data) => {
                console.log("Shortcut saved successfully:", data);
                this.shortcutButton.innerHTML = StarIcon;
                this.shortcutButton.setAttribute(
                    "aria-label",
                    this.language === "en" ? "Remove shortcut to this page" : "Fjern snarvei for denne siden"
                );
            })
            .catch((error) => {
                console.error("Error saving shortcut:", error);
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

    openDialog(shortcutIsAdded: boolean) {
        if (shortcutIsAdded) {
            this.removeShortcutDialogElement.setAttribute("show", "true");
            this.removeShortcutDialogElement.setAttribute("aria-hidden", "false");
            this.addShortcutDialogElement.removeAttribute("show");
        } else {
            this.addShortcutDialogElement.setAttribute("show", "true");
            this.addShortcutDialogElement.setAttribute("aria-hidden", "false");
            this.removeShortcutDialogElement.removeAttribute("show");
        }
    }

    closeDialog() {
        this.addShortcutDialogElement.removeAttribute("show");
        this.addShortcutDialogElement.setAttribute("aria-hidden", "true");
        this.removeShortcutDialogElement.removeAttribute("show");
        this.removeShortcutDialogElement.setAttribute("aria-hidden", "true");
    }

    renderShortcutButton(shortcutIsAdded: boolean) {
        this.shortcutButton.setAttribute("id", "gn-shortcut-button");
        this.shortcutButton.setAttribute("aria-label", "Add shortcut to this page");
        this.shortcutButton.setAttribute("aria-pressed", "false");
        this.shortcutButton.setAttribute("role", "button");
        this.shortcutButton.classList.add("gn-shortcut-button");

        if (shortcutIsAdded) {
            this.shortcutButton.innerHTML = StarIcon;
            this.shortcutButton.setAttribute(
                "aria-label",
                this.language === "en" ? "Remove shortcut to this page" : "Fjern snarvei for denne siden"
            );
            this.shortcutButton.classList.add("active");
            this.removeShortcutButtonElement.addEventListener("click", () => {
                const token = this.getAuthToken();
                if (!token) {
                    console.error("No token found");
                    return;
                }
                this.removeShortcut(token);
                this.appendShortcutButtonAfterFirstHeading(false);
                this.closeDialog();
            });
        } else {
            this.shortcutButton.innerHTML = StarIcon;
            this.shortcutButton.setAttribute(
                "aria-label",
                this.language === "en" ? "Add shortcut to this page" : "Lagre snarvei for denne siden"
            );
            this.shortcutButton.classList.remove("active");
            this.saveShortcutButtonElement.addEventListener("click", () => {
                const token = this.getAuthToken();
                if (!token) {
                    console.error("No token found");
                    return;
                }
                this.saveShortcut(token);
                this.appendShortcutButtonAfterFirstHeading(false);
                this.closeDialog();
            });
        }
        this.shortcutButton.addEventListener("click", () => {
            this.openDialog(shortcutIsAdded);
        });
        this.shortcutButton.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                this.shortcutButton.click();
            }
        });
        this.shortcutButton.addEventListener("focus", () => {
            this.shortcutButton.setAttribute("aria-pressed", "true");
        });
        this.shortcutButton.addEventListener("blur", () => {
            this.shortcutButton.setAttribute("aria-pressed", "false");
        });
        return this.shortcutButton;
    }

    appendShortcutButtonAfterFirstHeading(shortcutIsAdded: boolean) {
        const headingContainer = document.createElement("div");
        headingContainer.style.display = "flex";
        headingContainer.style.alignItems = "center";
        headingContainer.style.justifyContent = "flex-start";
        const firstHeading = getDocumentHeading();
        if (firstHeading) {
            firstHeading.style.display = "inline-block";
            firstHeading.parentNode.insertBefore(headingContainer, firstHeading);
            headingContainer.appendChild(firstHeading);
        }
        if (firstHeading && this.shortcutButton) {
            this.shortcutButton = this.renderShortcutButton(shortcutIsAdded);
            firstHeading.after(this.shortcutButton);
        } else {
            console.error("First heading or shortcut button is missing");
        }
    }

    @Watch("token")
    async tokenChanged() {
        const token = this?.token;

        if (!token) {
            console.error("No token found");
            return;
        }

        this.environment = this.environment || "dev";
        this.language = this.language || "en";
        this.shortcutButton = getShadowRootElement(this, "#gn-shortcut-button");

        const shortcutItem = await this.getShortcutItem(this.environment, token);
        const shortcutIsAdded = shortcutItem ? shortcutItem : false;

        if (this.shortcutButton) {
            this.appendShortcutButtonAfterFirstHeading(shortcutIsAdded);
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

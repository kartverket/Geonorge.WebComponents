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
    private cancelAddShortcutButtonElement: HTMLButtonElement;
    private cancelRemoveShortcutButtonElement: HTMLButtonElement;
    private shortcutNameInputElement: HTMLInputElement;
    @Prop() id: string;
    @Prop() language: string;
    @Prop() environment: string;
    @Prop() token: string;
    getAuthToken: Function;
    shortcutName: string;

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
        this.cancelAddShortcutButtonElement = getShadowRootElement(this, "#cancel-add-shortcut-button");
        this.cancelRemoveShortcutButtonElement = getShadowRootElement(this, "#cancel-remove-shortcut-button");

        const gnButton = new GnButton();
        const gnDialog = new GnDialog();
        const gnFieldContainer = new GnFieldContainer();
        const gnInput = new GnInput();
        const bodyText = new BodyText();
        const headingText = new HeadingText();

        this.initShortcutNameInput();
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
            name: this.shortcutName || document.title,
            url: window.location.href
        };
        postShortcutItem(this.environment, token, shortcutData)
            .then(() => {
                this.replaceShortcutButton(true);
            })
            .catch((error) => {
                console.error("Error saving shortcut:", error);
            });
    }

    removeShortcut(token: string) {
        deleteShortcutItem(this.environment, token, { url: window.location.href })
            .then(() => {
                this.replaceShortcutButton(false);
            })
            .catch((error) => {
                console.error("Error removing shortcut:", error);
            });
    }

    openDialog(shortcutIsAdded: boolean) {
        this.shortcutNameInputElement.value = document.title;
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
        const shortcutButton = document.createElement("button");
        shortcutButton.setAttribute("id", "gn-shortcut-button");
        shortcutButton.setAttribute("role", "button");
        shortcutButton.setAttribute("aria-pressed", "false");
        shortcutButton.classList.add("gn-shortcut-button");

        if (shortcutIsAdded) {
            shortcutButton.innerHTML = StarIcon;
            shortcutButton.setAttribute(
                "aria-label",
                this.language === "en" ? "This page is saved as a shortcut. Sure you want to remove it?" : "Denne siden er lagret som en snarvei. Er du sikker på at du vil fjerne den?"
            );
            shortcutButton.setAttribute("title", this.language === "en" ? "Remove shortcut" : "Fjern snarvei");
            shortcutButton.classList.add("active");
        } else {
            shortcutButton.innerHTML = StarIcon;
            shortcutButton.setAttribute(
                "aria-label",
                this.language === "en" ? "Add shortcut to this page" : "Lagre snarvei for denne siden"
            );
            shortcutButton.setAttribute("title", this.language === "en" ? "Add shortcut" : "Lagre snarvei");
            shortcutButton.classList.remove("active");
        }

        // Dialog event handlers (rebinding each time)
        this.saveShortcutButtonElement.onclick = () => {
            const token = this.getAuthToken();
            if (!token) return;
            this.saveShortcut(token);
            this.closeDialog();
        };

        this.removeShortcutButtonElement.onclick = () => {
            const token = this.getAuthToken();
            if (!token) return;
            this.removeShortcut(token);
            this.closeDialog();
        };

        this.cancelAddShortcutButtonElement.onclick = () => this.closeDialog();
        this.cancelRemoveShortcutButtonElement.onclick = () => this.closeDialog();

        shortcutButton.onclick = () => this.openDialog(shortcutIsAdded);

        shortcutButton.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                shortcutButton.click();
            }
        });

        shortcutButton.addEventListener("focus", () => {
            shortcutButton.setAttribute("aria-pressed", "true");
        });

        shortcutButton.addEventListener("blur", () => {
            shortcutButton.setAttribute("aria-pressed", "false");
        });

        return shortcutButton;
    }

    replaceShortcutButton(shortcutIsAdded: boolean) {
        const newButton = this.renderShortcutButton(shortcutIsAdded);
        if (this.shortcutButton) {
            this.shortcutButton.replaceWith(newButton);
        } else {
            const firstHeading = getDocumentHeading();
            if (firstHeading) {
                firstHeading.after(newButton);
            }
        }
        this.shortcutButton = newButton;
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
            this.replaceShortcutButton(shortcutIsAdded);
        } else {
            console.error("First heading or shortcut button is missing");
        }
    }

    initShortcutNameInput() {
        this.shortcutNameInputElement = getShadowRootElement(this, "#shortcut-name-input");        
        this.shortcutNameInputElement.addEventListener("input", () => {
            this.shortcutName = this.shortcutNameInputElement.value;
            if (this.shortcutName.trim()) {
                this.saveShortcutButtonElement.firstElementChild?.removeAttribute("disabled");
            } else {
                this.saveShortcutButtonElement.firstElementChild?.setAttribute("disabled", "true");
            }
        });

        this.shortcutNameInputElement.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                if (this.shortcutName.trim()) {
                    this.saveShortcutButtonElement.click();
                }
            }
        });
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

        const shortcutItem = await this.getShortcutItem(this.environment, token);
        const shortcutIsAdded = !!shortcutItem;

        this.style.display = "block";
        this.appendShortcutButtonAfterFirstHeading(shortcutIsAdded);
    }

    public static setup(selector: string, options: GnShortcutButtonOptions) {
        setTimeout(() => {
            const element = getElement<GnShortcutButton>(selector);
            if (!element) {
                console.error(`Element with selector "${selector}" not found.`);
                return;
            }
            if (!options || !options.getAuthToken) {
                console.error("getAuthToken function is required in options.");
                return;
            }
            element.getAuthToken = options.getAuthToken;
            element.token = options.getAuthToken();
        });
    }
}

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

// Assets
import CloseIcon from "../../assets/svg/close-icon-black.svg";

// Stylesheets
import style from "./gn-dialog.scss";

interface GnDialogOptions extends CustomElementOptions {}

@Component({
    tag: "gn-dialog",
    template: import("./gn-dialog.html"),
    style: import("./template.scss")
})
export class GnDialog extends CustomElement {
    @Toggle() show: boolean;
    @Prop() width: string;

    constructor() {
        super();
        addGlobalFonts();
        addGlobalStylesheet("gn-dialog-styles", style);
    }

    connectedCallback() {
        const closeDialogButtonElement = getShadowRootElement(this, "#close-dialog-button");
        closeDialogButtonElement.innerHTML = CloseIcon;
        closeDialogButtonElement.addEventListener("click", this.hideDialog);

        const dialogContainerElement = getShadowRootElement(this, "#dialog-container");
        dialogContainerElement.addEventListener("click", this.handleClickOutside);

        document.addEventListener("keydown", this.keyDownFunction, false);
    }

    disconnectedCallback() {
        const closeDialogButtonElement = getShadowRootElement(this, "#close-dialog-button");
        closeDialogButtonElement.removeEventListener("click", this.hideDialog);

        const dialogContainerElement = getShadowRootElement(this, "#dialog-container");
        dialogContainerElement.removeEventListener("click", this.handleClickOutside);

        document.removeEventListener("keydown", this.keyDownFunction, false);
    }

    handleClickOutside = (event) => {
        const dialogContentElement = getShadowRootElement(this, "#dialog-content");
        const slots = this.shadowRoot.querySelector("slot");
        const assignedSlotElements = slots.assignedElements();
        const hasClickedInsideSlot = assignedSlotElements.some((assignedSlotElement) => {
            return !!assignedSlotElement.contains(event.target);
        });
        const hasClickedInsideDialogChild = dialogContentElement.contains(event.target);
        if (dialogContentElement && !(hasClickedInsideSlot || hasClickedInsideDialogChild)) {
            this.hideDialog();
        }
    };

    hideDialog = () => {
        this.setAttribute("show", "false");
    };

    shouldShowDialog(show) {
        return show?.toString() === "" || show?.toString() === "true";
    }

    keyDownFunction = (event) => {
        switch (event.keyCode) {
            case 27: // Escape
                this.hideDialog();
                break;
            default:
                return null;
        }
    };

    @Watch("show")
    showMenuChanged() {
        const shouldShowDialog = this.shouldShowDialog(this.show);
        const dialogContainerElement = getShadowRootElement(this, "#dialog-container");
        shouldShowDialog
            ? dialogContainerElement.classList.add("visible")
            : dialogContainerElement.classList.remove("visible");
    }

    @Watch("width")
    widthChanged() {
        const dialogContainerElement = getShadowRootElement(this, "#dialog-content");
        dialogContainerElement.style.maxWidth = this.width;
    }

    setup(options?: GnDialogOptions): void {}
}

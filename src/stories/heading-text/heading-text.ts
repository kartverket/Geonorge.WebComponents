// Dependencies
import { Component, CustomElement, CustomElementOptions, Prop, Toggle } from "super-custom-elements";

interface HeadingTextOptions extends CustomElementOptions {}

@Component({
    tag: "heading-text",
    template: import("./heading-text.html"),
    style: import("./template.scss")
})
export class HeadingText extends CustomElement {
    @Prop() size: string;
    @Prop() tag: string;
    @Toggle() underline: boolean;

    constructor() {
        super();
    }

    connectedCallback() {
        const slot = this.shadowRoot?.querySelector("slot");

        const isInsideDialog = this.closest("gn-dialog") !== null;

        if (slot && isInsideDialog) {
            const applyNoMargin = () => {
                const assignedElements = slot.assignedElements({ flatten: true });
                assignedElements.forEach((el) => {
                    if (/^h[1-6]$/i.test(el.tagName)) {
                        el.classList.add("no-margin");
                    }
                });
            };

            // Initial attempt
            applyNoMargin();

            // In case content is added after render
            slot.addEventListener("slotchange", applyNoMargin);
        }
    }

    setup(options?: HeadingTextOptions): void {}
}

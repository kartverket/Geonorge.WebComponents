import { Component, CustomElement, CustomElementOptions, Prop, Watch } from "super-custom-elements";

interface GnButtonOptions extends CustomElementOptions {}

@Component({
    tag: "gn-button",
    template: import("./gn-button.html"),
    style: import("./template.scss")
})
export class GnButton extends CustomElement {
    @Prop() color: string;

    private slotEl: HTMLSlotElement;

    constructor() {
        super();
    }

    setup(options?: GnButtonOptions): void {
        this.connect(options?.container);
        if (options?.id) {
            this.id = options.id;
        }

        // Wait for slot to be rendered and then apply color
        requestAnimationFrame(() => this.applyColorClass());
    }

    @Watch("color")
    onColorChange() {
        this.applyColorClass();
    }

    private applyColorClass() {
        if (!this.slotEl) {
            this.slotEl = this.shadowRoot?.querySelector("slot");
            if (!this.slotEl) return;
        }

        const colorClassPrefix = "color-";
        const assignedElements = this.slotEl.assignedElements({ flatten: true });

        assignedElements.forEach((el) => {
            // Clean up any existing listeners first
            el.removeEventListener("mouseenter", this.handleMouseEnter);
            el.removeEventListener("mouseleave", this.handleMouseLeave);

            // Remove previous color-* classes
            el.classList.forEach((cls) => {
                if (cls.startsWith(colorClassPrefix)) {
                    el.classList.remove(cls);
                }
            });

            // Add color class
            if (this.color) {
                el.classList.add(`${colorClassPrefix}${this.color}`);
            }

            // Add :hover support via JS
            el.addEventListener("mouseenter", this.handleMouseEnter);
            el.addEventListener("mouseleave", this.handleMouseLeave);

            // Add disabled class if applicable
            if ((el as HTMLButtonElement).disabled) {
                el.classList.add("is-disabled");
            } else {
                el.classList.remove("is-disabled");
            }
        });
    }

    private handleMouseEnter = (e: Event) => {
        (e.currentTarget as HTMLElement).classList.add("is-hovered");
    };

    private handleMouseLeave = (e: Event) => {
        (e.currentTarget as HTMLElement).classList.remove("is-hovered");
    };
}

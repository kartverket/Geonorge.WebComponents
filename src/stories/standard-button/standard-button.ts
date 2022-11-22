// Dependencies
import {
    Component,
    CustomElement,
    CustomElementOptions,
    Prop,
    Watch,
    getElement,
    getShadowRootElement,
    Toggle
} from "super-custom-elements";

interface StandardButtonOptions extends CustomElementOptions {}

@Component({
    tag: "standard-button",
    template: import("./standard-button.html"),
    style: import("./standard-button.scss")
})
export class StandardButton extends CustomElement {
    private static readonly elementSelector = "standard-button";
    private standardButtonElement: HTMLButtonElement;

    @Prop() id: string;
    @Prop() content: string;
    @Prop() color: string;
    @Toggle() disabled: boolean;

    constructor() {
        super();
    }

    setup(options?: StandardButtonOptions): void {
        this.connect(options.container);
        if (options.id) {
            this.id = options.id;
        }
    }

    removeColorClasses() {
        const colorClasses = ["default", "primary", "success", "warning", "danger"];
        colorClasses.forEach((colorClass) => {
            this.standardButtonElement.classList.remove(colorClass);
        });
    }

    connectedCallback() {
        this.standardButtonElement = getShadowRootElement(this, "#standard-button");
        console.log(this.standardButtonElement);
        this.standardButtonElement.innerHTML = this.content;
        this.standardButtonElement.disabled = this.disabled !== undefined && this.disabled !== null;
        const availableColors: Array<string> = ["default", "primary", "success", "warning", "danger"];
        const color = availableColors.includes(this.color) ? this.color : "default";
        this.standardButtonElement.classList.add(color);
    }

    @Watch("color")
    colorChanged() {
        const availableColors: Array<string> = ["default", "primary", "success", "warning", "danger"];
        const color = availableColors.includes(this.color) ? this.color : "default";
        this.removeColorClasses();
        this.standardButtonElement.classList.add(color);
    }

    @Watch("disabled")
    disabledChanged() {
        this.standardButtonElement.disabled = this.disabled !== undefined && this.disabled !== null;
    }

    public static setup(selector: string, options: StandardButtonOptions) {
        const element = getElement<StandardButton>(selector);
    }
}

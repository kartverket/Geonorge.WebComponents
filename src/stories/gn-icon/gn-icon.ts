// Dependencies
import {
    Component,
    CustomElement,
    CustomElementOptions,
    Prop,
    Watch,
    getShadowRootElement
} from "super-custom-elements";

// Assets
import StatusDeficient from "../../assets/svg/icons/status-deficient.svg";
import StatusGood from "../../assets/svg/icons/status-good.svg";
import StatusSatisfactory from "../../assets/svg/icons/status-satisfactory.svg";
import StatusUseable from "../../assets/svg/icons/status-useable.svg";

interface GnIconOptions extends CustomElementOptions {}

@Component({
    tag: "gn-icon",
    template: import("./gn-icon.html"),
    style: import("./template.scss")
})
export class GnIcon extends CustomElement {
    private static readonly elementSelector = "gn-icon";
    private iconElement: HTMLAnchorElement;

    @Prop() id: string;
    @Prop() icon: string;
    @Prop() width: string;
    @Prop() height: string;

    constructor() {
        super();
    }

    setup(options?: GnIconOptions): void {
        this.connect(options.container);
        if (options.id) {
            this.id = options.id;
        }
    }

    getGeonorgeIcon(environment: string) {
        switch (environment) {
            case "status-deficient":
                return StatusDeficient;
            case "status-good":
                return StatusGood;
            case "status-satisfactory":
                return StatusSatisfactory;
            case "status-useable":
                return StatusUseable;
            default:
                return null;
        }
    }

    renderIcon(icon: string) {
        this.iconElement = getShadowRootElement(this, "#icon");
        this.iconElement.innerHTML = this.getGeonorgeIcon(icon);
    }

    setIconWidth(width: string) {
        this.iconElement = getShadowRootElement(this, "#icon");
        this.iconElement.style.width = width?.length ? width : "1em";
    }

    setIconHeight(height: string) {
        this.iconElement = getShadowRootElement(this, "#icon");
        this.iconElement.style.height = height?.length ? height : "1em";
    }

    connectedCallback() {
        this.renderIcon(this.icon);
        this.setIconWidth(this.width);
        this.setIconHeight(this.height);
    }

    @Watch("icon")
    iconChanged() {
        if (this.icon) {
            this.renderIcon(this.icon);
        }
    }

    @Watch("width")
    widthChanged() {
        this.setIconWidth(this.width);
    }

    @Watch("height")
    heightChanged() {
        this.setIconHeight(this.height);
    }

    public static setup(selector: string, options: GnIconOptions) {}
}

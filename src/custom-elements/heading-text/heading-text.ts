// Dependencies
import {
    Component,
    CustomElement,
    CustomElementOptions,
    Prop,
    Toggle,
    getShadowRootElement
} from "super-custom-elements";

interface HeadingTextOptions extends CustomElementOptions {}

@Component({
    tag: "heading-text",
    template: import("./heading-text.html"),
    style: import("./heading-text.scss")
})
export class HeadingText extends CustomElement {
    private static readonly elementSelector = "geonorge-footer";
    private headingTextElementPlaceholder: HTMLHeadingElement;

    @Prop() id: string;
    @Prop() content: string;
    @Prop() size: string;
    @Prop() tag: string;
    @Toggle() underline: boolean;

    constructor() {
        super();
    }

    setup(options?: HeadingTextOptions): void {
        this.connect(options.container);
        if (options.id) {
            this.id = options.id;
        }
    }

    getHeadingTag() {
        if (this.tag?.length) {
            return this.tag.toUpperCase();
        } else if (this.size?.length) {
            return `H${this.size}`;
        } else {
            return "H1";
        }
    }

    connectedCallback() {
        this.headingTextElementPlaceholder = getShadowRootElement(this, "#heading-text");
        const elementTag = this.getHeadingTag();
        const headingElement = document.createElement(elementTag);
        headingElement.innerText = this.content;
        headingElement.classList.add(`size-${this.size}`);
        if (this.underline) {
            headingElement.classList.add("underline");
        }
        this.headingTextElementPlaceholder.replaceWith(headingElement);
    }

    /*
    @Watch('underline')
    underlineChanged() {
        this.underline ? this.headingElement.classList.add('selected') : this.tabHeadingElement.classList.remove('selected');
        this.setAttribute('tabindex', this.selected ? '0' : '-1');
    }*/
}

// Dependencies
import {
    Component, CustomElement, CustomElementOptions, Prop, Dispatch, DispatchEmitter,
    Listen, Watch, getElement, getShadowRootElement, Toggle
} from 'super-custom-elements';

// Helpers
import { addGlobalStylesheet } from "functions/guiHelpers";

// Stylesheets
import slottedStyles from "./slottedStyles.scss";

let navigationTabHeadingCounter = 0;


interface NavigationTabHeadingOptions extends CustomElementOptions {
}

@Component({
    tag: 'navigation-tab-heading',
    template: import('./navigation-tab-heading.html'),
    style: import('./navigation-tab-heading.scss')
})



export class NavigationTabHeading extends CustomElement {
    private static readonly elementSelector = 'navigation-tab-heading';
    private tabHeadingElement: HTMLElement;

/*
    static get observedAttributes() {
        return ['selected'];
    }*/

    @Prop() id: string;
    @Toggle() selected: boolean;

    constructor() {
        super();
    }

    setup(options?: NavigationTabHeadingOptions): void {
        this.connect(options.container);
        if (options.id) {
            this.id = options.id;
        }
    }

    connectedCallback() {
        this.setAttribute('role', 'tab');
        if (!this.id) {
            this.id = `navigation-tab-heading-${navigationTabHeadingCounter++}`;
        }

        this.tabHeadingElement = getShadowRootElement(this, 'slot[name=tab-heading]');

        // Set a well-defined initial state.
        this.setAttribute('aria-selected', 'false');
        this.setAttribute('tabindex', '-1');
        this._upgradeProperty('selected');

        addGlobalStylesheet("navigation-tab-heading-styles", slottedStyles);


    }

    disconnectedCallback() {
    }

    _upgradeProperty(prop) {
        if (this.hasOwnProperty(prop)) {
            let value = this[prop];
            delete this[prop];
            this[prop] = value;
        }
    }

    attributeChangedCallback() {

    }

    @Watch('selected')
    selectedChanged() {
        this.selected ? this.setAttribute('aria-selected', '') : this.removeAttribute('aria-selected');
        this.selected ? this.tabHeadingElement.classList.add('selected') : this.tabHeadingElement.classList.remove('selected');
        this.setAttribute('tabindex', this.selected ? '0' : '-1');
    }

    public static setup(selector: string, options: NavigationTabHeadingOptions) {
        const element = getElement<NavigationTabHeading>(selector);
    }
}
// Dependencies
import {
    Component,
    CustomElement,
    CustomElementOptions,
    Prop,
    Watch,
    getElement,
    getShadowRootElement
} from "super-custom-elements";

// Helpers
import { addGlobalFonts, removeInnerHTML } from "../../functions/guiHelpers";

// Assets
import AngleRight from "../../assets/svg/angle-right.svg";

interface BreadcrumbListOptions extends CustomElementOptions {
    breadcrumbs: Array<BreadcrumbListItem>;
}

interface BreadcrumbListItem extends Object {
    name: string;
    url: string;
}

@Component({
    tag: "breadcrumb-list",
    template: import("./breadcrumb-list.html"),
    style: import("./breadcrumb-list.scss")
})
export class BreadcrumbList extends CustomElement {
    private static readonly elementSelector = "breadcrumb-list";
    private breadcrumbListElement: HTMLUListElement;

    @Prop() id: string;
    @Prop() breadcrumbs: any; // Array<BreadcrumbListItem>;

    constructor() {
        super();
        addGlobalFonts();
    }

    setup(options?: BreadcrumbListOptions): void {
        this.connect(options.container);
        if (options.id) {
            this.id = options.id;
        }
    }

    connectedCallback() {
        this.renderBreadcrumbsFromAttribute(this.breadcrumbs);
    }

    public static addBreadcrumbListContent = (
        breadcrumbListElement: HTMLElement,
        breadcrumbs: Array<BreadcrumbListItem>
    ) => {
        removeInnerHTML(breadcrumbListElement);

        if (breadcrumbs?.length) {
            breadcrumbs.forEach((breadcrumbListItem: BreadcrumbListItem, index) => {
                const activeHash = `${window.location.hash}`;
                const activePath = `${window.location.pathname}${window.location.hash}${window.location.search}`;
                const activeHref = window.location.href;
                const isActiveHash = activeHash.toLowerCase() === breadcrumbListItem.url.toLowerCase();
                const isActivePath = activePath.toLowerCase() === breadcrumbListItem.url.toLowerCase();
                const isActiveHref = activeHref.toLowerCase() === breadcrumbListItem.url.toLowerCase();

                const breadcrumbListItemElement = document.createElement("li");
                breadcrumbListItemElement.setAttribute("property", "itemListElement");
                breadcrumbListItemElement.setAttribute("typeof", "ListItem");

                const breadcrumbNameElement = document.createElement("span");
                breadcrumbNameElement.setAttribute("property", "name");
                breadcrumbNameElement.innerText = breadcrumbListItem.name;

                const breadcrumbMetaElement = document.createElement("meta");
                breadcrumbMetaElement.setAttribute("property", "position");
                breadcrumbMetaElement.setAttribute("content", `${index + 1}`);

                if (breadcrumbListItem?.url?.length && !isActiveHash && !isActivePath && !isActiveHref) {
                    // If not active breadcrumb
                    const breadcrumbLinkElement = document.createElement("a");
                    breadcrumbLinkElement.href = breadcrumbListItem.url;
                    breadcrumbLinkElement.setAttribute("property", "item");
                    breadcrumbLinkElement.appendChild(breadcrumbNameElement);
                    breadcrumbListItemElement.appendChild(breadcrumbLinkElement);
                } else {
                    breadcrumbListItemElement.appendChild(breadcrumbNameElement);
                }

                breadcrumbListItemElement.appendChild(breadcrumbMetaElement);

                if (index < breadcrumbs.length - 1) {
                    breadcrumbListItemElement.insertAdjacentHTML("beforeend", AngleRight);
                }

                breadcrumbListElement.appendChild(breadcrumbListItemElement);
            });
        }
        return breadcrumbListElement;
    };

    public static renderBreadcrumbs = (breadcrumbs: Array<BreadcrumbListItem>) => {
        const element = getElement<BreadcrumbList>("#breadcrumb-list");
        let breadCrumbListShadow = getShadowRootElement(element, "#breadcrumb-list");
        breadCrumbListShadow = BreadcrumbList.addBreadcrumbListContent(breadCrumbListShadow, breadcrumbs);
        breadCrumbListShadow.setAttribute("vocab", "https://schema.org/");
        breadCrumbListShadow.setAttribute("typeof", "BreadcrumbList");
    };

    renderBreadcrumbsFromAttribute = (breadcrumbs: string) => {
        const breadcrumbListItems = JSON.parse(breadcrumbs);
        BreadcrumbList.renderBreadcrumbs(breadcrumbListItems);
    };

    @Watch("breadcrumbs")
    breadcrumbsChanged() {
        if (this.breadcrumbs?.length) {
            this.renderBreadcrumbsFromAttribute(this.breadcrumbs);
        }
    }

    public static setup(selector: string, options: BreadcrumbListOptions) {
        const element = getElement<BreadcrumbList>(selector);
        let breadCrumbListShadow = getShadowRootElement(element, "#breadcrumb-list");
        breadCrumbListShadow = BreadcrumbList.addBreadcrumbListContent(breadCrumbListShadow, options.breadcrumbs);
    }
}

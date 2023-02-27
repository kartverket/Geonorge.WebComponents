// Dependencies
import {
    Component,
    CustomElement,
    CustomElementOptions,
    Prop,
    Watch,
    getShadowRootElement,
    Toggle
} from "super-custom-elements";

// Helpers
import { getGeonorgeUrl } from "../../functions/urlHelpers";
import { addGlobalFonts } from "../../functions/guiHelpers";

// Assets
import GeonorgeLogo from "../../assets/svg/geonorge-logo.svg";
import KartverketLogo from "../../assets/svg/kartverket-logo.svg";

interface StandardButtonOptions extends CustomElementOptions {}

@Component({
    tag: "geonorge-footer",
    template: import("./geonorge-footer.html"),
    style: import("./geonorge-footer.scss")
})
export class GeonorgeFooter extends CustomElement {
    private static readonly elementSelector = "geonorge-footer";
    private geonorgeFooterElement: HTMLButtonElement;
    private versionTextElement: HTMLDivElement;
    private geonorgeLogoElement: HTMLDivElement;
    private kartverketLogoElement: HTMLDivElement;
    private linkListElement: HTMLUListElement;
    private aboutSiteHeader: HTMLHeadingElement;
    private contactHeader: HTMLHeadingElement;
    private aSolutionByText: HTMLParagraphElement;
    private contactInfoText: HTMLParagraphElement;

    @Prop() id: string;
    @Prop() environment: string;
    @Prop() version: string;
    @Prop() language: string;
    @Prop() accessibilitystatementurl: string;
    @Toggle() hideaccessibilitystatementlink: boolean;

    constructor() {
        super();
        addGlobalFonts();
    }

    setup(options?: StandardButtonOptions): void {
        this.connect(options.container);
        if (options.id) {
            this.id = options.id;
        }
    }

    getLinkList(
        language: string,
        environment: string,
        accessibilitystatementurl: string,
        hideaccessibilitystatementlink: boolean
    ) {
        const accessibilityStatementUrl = accessibilitystatementurl?.length
            ? accessibilitystatementurl
            : "https://uustatus.no/nb/erklaringer/publisert/8f3210cf-aa22-4d32-9fda-4460e3c3e05a";
        let listContent = "";
        if (language === "en") {
            listContent = `
            <li><a href="${getGeonorgeUrl(language, environment)}about/what-is-geonorge/">What is Geonorge</a></li>
            `;
            if (!hideaccessibilitystatementlink) {
                listContent += `
                <li><a href="${accessibilityStatementUrl}" target="_blank" rel="noopener noreferrer">Accessibility statement (in Norwegian)</a></li>
                `;
            }
        } else {
            listContent = `
                <li><a href="${getGeonorgeUrl(language, environment)}aktuelt/om-geonorge/">Om Geonorge</a></li>
                <li><a href="${getGeonorgeUrl(
                    language,
                    environment
                )}aktuelt/Nyheter/annet/personvern-og-bruk-av-cookies/">Personvern og bruk av cookies</a></li>
            `;
            if (!hideaccessibilitystatementlink) {
                listContent += `
                <li><a href="${accessibilityStatementUrl}" target="_blank" rel="noopener noreferrer">Tilgjengelighetserklæring</a></li>
                `;
            }
        }
        return listContent;
    }

    getContactInfoText(language: string, environment: string) {
        if (language === "en") {
            return `
            <p>
            Telephone: +47 32 11 80 00<br>
            <a title="post@norgedigitalt.no" href="mailto:post@norgedigitalt.no">post@norgedigitalt.no</a><br>
            Org. nr.: 971 040 238
            </p>
            `;
        } else {
            return `
            <p>
            Telefon: 32 11 80 00<br>
            <a title="post@norgedigitalt.no" href="mailto:post@norgedigitalt.no">post@norgedigitalt.no</a><br>
            Org. nr.: 971 040 238
            </p>
            `;
        }
    }

    shouldHideAccessibilityStatementLink(hideaccessibilitystatementlink) {
        return (
            hideaccessibilitystatementlink?.toString() === "" || hideaccessibilitystatementlink?.toString() === "true"
        );
    }

    renderLinkList() {
        const shouldHideAccessibilityStatementLink = this.shouldHideAccessibilityStatementLink(
            this.hideaccessibilitystatementlink
        );
        this.linkListElement.innerHTML = this.getLinkList(
            this.language,
            this.environment,
            this.accessibilitystatementurl,
            shouldHideAccessibilityStatementLink
        );
    }

    connectedCallback() {
        this.geonorgeFooterElement = getShadowRootElement(this, "#geonorge-footer");
        this.versionTextElement = getShadowRootElement(this, "#version-text");
        this.geonorgeLogoElement = getShadowRootElement(this, "#geonorge-logo");
        this.kartverketLogoElement = getShadowRootElement(this, "#kartverket-logo");
        this.linkListElement = getShadowRootElement(this, "#link-list");
        this.aboutSiteHeader = getShadowRootElement(this, "#about-site-header");
        this.contactHeader = getShadowRootElement(this, "#contact-header");
        this.aSolutionByText = getShadowRootElement(this, "#a-solution-by-text");
        this.contactInfoText = getShadowRootElement(this, "#contact-info-text");

        this.geonorgeFooterElement.setAttribute("environment", this.environment);

        if (this.version?.length) {
            this.versionTextElement.innerText =
                this.language === "en" ? `Version ${this.version}` : `Versjon ${this.version}`;
        }

        this.geonorgeLogoElement.innerHTML = GeonorgeLogo;
        this.kartverketLogoElement.innerHTML = KartverketLogo;

        this.renderLinkList();

        this.contactInfoText.innerHTML = this.getContactInfoText(this.language, this.environment);
        this.aboutSiteHeader.innerText = this.language === "en" ? "About" : "Om nettstedet";
        this.contactHeader.innerText = this.language === "en" ? "Contact" : "Kontakt";
        this.aSolutionByText.innerText = this.language === "en" ? "A solution by" : "Kontakt";
    }

    @Watch("language")
    languageChanged() {
        this.renderLinkList();
        this.contactInfoText.innerHTML = this.getContactInfoText(this.language, this.environment);
        this.aboutSiteHeader.innerText = this.language === "en" ? "About" : "Om nettstedet";
        this.contactHeader.innerText = this.language === "en" ? "Contact" : "Kontakt";
        this.aSolutionByText.innerText = this.language === "en" ? "A solution by" : "En løsning fra";
        if (this.version?.length) {
            this.versionTextElement.innerText =
                this.language === "en" ? `Version ${this.version}` : `Versjon ${this.version}`;
        }
    }

    @Watch("hideaccessibilitystatementlink")
    hideaccessibilitystatementlinkChanged() {
        this.renderLinkList();
    }

    @Watch("accessibilitystatementurl")
    accessibilitystatementurlChanged() {
        this.renderLinkList();
    }
}

// Dependencies
import {
    Component, CustomElement, CustomElementOptions, Prop, Dispatch, DispatchEmitter,
    Listen, Watch, getElement, getShadowRootElement, Toggle
} from 'super-custom-elements';


// Assets
import MenuIcon from 'assets/svg/menu-icon.svg';
import CloseIcon from 'assets/svg/close-icon.svg';

// Functions
import { fetchMenuItems } from 'functions/apiHelpers';
import { getFocusableElementsInsideElement } from 'functions/guiHelpers';

interface MainMenuOptions extends CustomElementOptions {
    active?: boolean,
    onClick?: () => void,
    onSignInClick?: () => void,
    onSignOutClick?: () => void,
    onNorwegianLanguageSelect?: () => void,
    onEnglishLanguageSelect?: () => void
}

interface MenuItem extends Object {
    Name: string,
    SubMenuItem: Array<MenuItem>,
    Url: string
}

@Component({
    tag: 'main-menu',
    template: import('./main-menu.html'),
    style: import('./main-menu.scss')
})

export class MainMenu extends CustomElement {
    private static readonly elementSelector = 'main-menu';
    private menuButton: HTMLButtonElement;
    private menuTitle: HTMLSpanElement;
    private menuIcon: HTMLSpanElement;
    private closeIcon: HTMLSpanElement;
    private menuContainer: HTMLElement;
    private menuItemListContainer: HTMLElement;
    private menuActionsRow: HTMLElement;

    @Prop() id: string;
    @Prop() language: string;
    @Prop() environment: string;
    @Prop() signinurl: string;
    @Prop() signouturl: string;
    @Prop() norwegianurl: string;
    @Prop() englishurl: string;
    @Toggle() isloggedin: boolean;
    @Toggle() showmenu: boolean;
    @Toggle() hasAuthenticationFunction: boolean;
    @Toggle() hasLanguageSelectFunctions: boolean;
    @Prop() menuitems: Array<MenuItem>;
    @Dispatch('onSignInClick') onSignInClick: DispatchEmitter;
    @Dispatch('onSignOutClick') onSignOutClick: DispatchEmitter;
    @Dispatch('onNorwegianLanguageSelect') onNorwegianLanguageSelect: DispatchEmitter;
    @Dispatch('onEnglishLanguageSelect') onEnglishLanguageSelect: DispatchEmitter;


    constructor() {
        super();
        this.clickOutsideMenuContainer = this.clickOutsideMenuContainer.bind(this);
    }

    setup(options?: MainMenuOptions): void {
        this.connect(options.container);
        if (options.id) {
            this.id = options.id;
        }
    }

    connectedCallback() {
        this.menuButton = getShadowRootElement(this, '#menu-toggle-button');
        this.menuTitle = getShadowRootElement(this, '#menu-title');
        this.menuIcon = getShadowRootElement(this, '#menu-icon');
        this.closeIcon = getShadowRootElement(this, '#close-icon');
        this.menuContainer = getShadowRootElement(this, '#menu-container');
        this.menuItemListContainer = getShadowRootElement(this, '#menu-item-list-container');
        this.menuActionsRow = getShadowRootElement(this, '#menu-actions-row');
        this.menuIcon.innerHTML = MenuIcon;
        this.closeIcon.innerHTML = CloseIcon;

        this.showmenu ? this.menuIcon.classList.add('hidden') : this.closeIcon.classList.add('hidden');

        fetchMenuItems(this.language, this.environment).then(menuItems => {
            this.menuitems = menuItems;
        });

        this.menuButton.setAttribute('aria-label', this.language === 'en' ? 'Show menu' : 'Vis meny');

        if (this.menuTitle) {
            this.menuTitle.innerText = this.language === 'en' ? 'Menu' : 'Meny';
        }

        const hasAuthenticationUrls = this.signinurl && this.signouturl;
        if (hasAuthenticationUrls) {
            this.addAuthenticationLinks();
        }

        const supportsLanguages = this.englishurl && this.norwegianurl;
        if (supportsLanguages) {
            this.addLanguageSelectLinks();

        }
        document.addEventListener('click', this.clickOutsideMenuContainer);
    }

    disconnectedCallback() {
        document.removeEventListener('click', this.clickOutsideMenuContainer);
    }

    hideMenuContainer = () => {
        this.showmenu = false;
    }


    clickOutsideMenuContainer(event: MouseEvent) {
        const targetElement = event.composedPath()[0] as Element;
        targetElement.closest('#menu-container');
        if (targetElement.closest('#menu-container') || targetElement.closest('#menu-toggle-button')) return
        this.hideMenuContainer();
    }

    renderMenuItems = (menuItems: Array<MenuItem>, hierarchyLevel: number = 0, maxHierarchyLevel: number = 1) => {
        const menuItemsListElement = menuItems.map((menuItem: MenuItem) => {
            const subItems = menuItem.SubMenuItem && menuItem.SubMenuItem.length ? menuItem.SubMenuItem : null;
            const menuItemElement = `<a href="${menuItem.Url}" tabindex="${this.showmenu ? null : '-1'}">${menuItem.Name}</a>`;
            const subItemElements = subItems && hierarchyLevel + 1 <= maxHierarchyLevel ? this.renderMenuItems(subItems, hierarchyLevel + 1, maxHierarchyLevel) : '';
            return `<li>${menuItemElement}${subItemElements}</li>`;
        }).join('');
        return `<ul class="menuItemList hierarchy-level-${hierarchyLevel}">${menuItemsListElement}</ul>`;
    }

    addAuthenticationLinks(hasAuthenticationFunction = false) {
        let loginToggleElement;
        const hasAuthenticationLinks = this.signouturl && this.signinurl;

        if (!hasAuthenticationLinks && !hasAuthenticationFunction) {
            return '';
        }

        if (hasAuthenticationFunction) {
            loginToggleElement = document.createElement("button");
            loginToggleElement.addEventListener("click", () => {
                this.isloggedin ? this.onSignOutClick.emit() : this.onSignInClick.emit();
            });
        } else {
            loginToggleElement = document.createElement("a");
            loginToggleElement.href = this.isloggedin ? this.signouturl : this.signinurl;
        }
        const logInString = this.language === 'en' ? 'Log in' : 'Logg inn';
        const logOutString = this.language === 'en' ? 'Log out' : 'Logg ut';
        loginToggleElement.innerText = this.isloggedin ? logOutString : logInString
        loginToggleElement.id = 'authentication-toggle-element';

        // Remove previously added login toggle element if exists
        for (const childElement of this.menuActionsRow.children) {
            if (childElement.getAttribute('id') === loginToggleElement.id) {
                childElement.remove()
            }
        }

        if (!this.showmenu){
            loginToggleElement.setAttribute('tabindex', '-1');
        }

        // Add login toggle element
        this.menuActionsRow.appendChild(loginToggleElement);
    }

    addLanguageSelectLinks(hasLanguageSelectFunctions = false) {
        let languageToggleElement;
        const hasLanguageSelectLinks = this.norwegianurl && this.englishurl;

        if (!hasLanguageSelectLinks && !hasLanguageSelectFunctions) {
            return '';
        }

        if (hasLanguageSelectFunctions) {
            languageToggleElement = document.createElement("button");
            languageToggleElement.addEventListener("click", () => {
                this.language === 'en' ? this.onNorwegianLanguageSelect.emit() : this.onEnglishLanguageSelect.emit();
            });
        } else {
            languageToggleElement = document.createElement("a");
            languageToggleElement.href = this.language === 'en' ? this.norwegianurl : this.englishurl;
        }

        languageToggleElement.innerText = this.language === 'en' ? 'Norsk' : 'English';
        languageToggleElement.id = 'language-toggle-element';

        // Remove previously added language toggle element if exists
        for (const childElement of this.menuActionsRow.children) {
            if (childElement.getAttribute('id') === languageToggleElement.id) {
                childElement.remove()
            }
        }

        if (!this.showmenu){
            languageToggleElement.setAttribute('tabindex', '-1');
        }

        // Add language toggle element
        this.menuActionsRow.appendChild(languageToggleElement);
    }

    @Listen('click', '#menu-toggle-button')
    buttonClicked(event: MouseEvent) {
        this.showmenu = !this.showmenu;
    }

    @Watch('hasauthenticationfunction')
    hasAuthenticationFunctionChanged() {
        if (this.hasAuthenticationFunction) {
            this.addAuthenticationLinks(true);
        }
    }

    @Watch('isloggedin')
    isLoggedInChanged() {
        this.addAuthenticationLinks(this.hasAuthenticationFunction);
    }

    @Watch('haslanguageselectfunctions')
    hasLanguageSelectFunctionsChanged() {
        if (this.hasLanguageSelectFunctions) {
            this.addLanguageSelectLinks(true);
        }
    }

    @Watch('language')
    languageChanged() {
        this.addAuthenticationLinks(this.hasAuthenticationFunction);
        this.addLanguageSelectLinks(this.hasLanguageSelectFunctions);
        fetchMenuItems(this.language, this.environment).then(menuItems => {
            this.menuitems = menuItems;
        });
        if (this.menuTitle) {
            this.menuTitle.innerText = this.language === 'en' ? 'Menu' : 'Meny';
        }
        this.menuButton.setAttribute('aria-label', this.language === 'en' ? 'Show menu' : 'Vis meny');
    }

    @Watch('showmenu')
    showMenuChanged() {
        this.showmenu ? this.menuContainer.classList.add('open') : this.menuContainer.classList.remove('open');
        this.showmenu ? this.menuButton.classList.add('open') : this.menuButton.classList.remove('open');
        this.showmenu ? this.menuItemListContainer.classList.add('open') : this.menuItemListContainer.classList.remove('open');
        this.showmenu ? this.menuActionsRow.classList.add('open') : this.menuActionsRow.classList.remove('open');
        this.showmenu ? this.menuIcon.classList.add('hidden') : this.menuIcon.classList.remove('hidden');
        this.showmenu ? this.closeIcon.classList.remove('hidden') : this.closeIcon.classList.add('hidden');
        const focusableMenuContainerElements = getFocusableElementsInsideElement(this.menuContainer);
        focusableMenuContainerElements.forEach(focusableElement => {
            if (!this.showmenu){
                focusableElement.setAttribute('tabindex', '-1');
            } else {
                focusableElement.removeAttribute('tabindex');
            }
        });
    }

    @Watch('menuitems')
    menuItemsChanged() {
        if (this.menuitems && this.menuitems.length) {
            this.menuItemListContainer.innerHTML = this.renderMenuItems(this.menuitems);
        }
    }

    public static setup(selector: string, options: MainMenuOptions) {
        const element = getElement<MainMenu>(selector);

        if (options.onClick) {
            element.addEventListener('menuButtonClick', options.onClick);
        }
        if (options.active) {
            element.showmenu = options.active;
        }
    }
}

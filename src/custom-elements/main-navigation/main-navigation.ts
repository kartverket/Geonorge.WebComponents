import {
   Component, CustomElement, CustomElementOptions, Prop, Dispatch, DispatchEmitter,
   Listen, Watch, getElement, getShadowRootElement, Toggle
} from 'super-custom-elements';

import GeonorgeLogo from 'assets/svg/geonorge-navbar-logo.svg';

import { MainSearchField } from 'custom-elements/main-search-field/main-search-field';

import { fetchMenuItems } from 'functions/apiHelpers';

interface MainNavigationOptions extends CustomElementOptions {
   active?: boolean,
   onClick?: () => void
}

interface MenuItem extends Object {
   Name: string,
   SubMenuItem: Array<MenuItem>,
   Url: string
}

@Component({
   tag: 'main-navigation',
   template: import('./main-navigation.html'),
   style: import('./main-navigation.scss')
})

export class MainNavigation extends CustomElement {
   private static readonly elementSelector = 'main-navigation';
   private searchField: HTMLInputElement;
   private menuButton: HTMLInputElement;
   private menuContainer: HTMLElement;
   private logoElement: HTMLImageElement;

   @Prop() id: string;
   @Prop() environment: string;
   @Prop() searchString: string;
   @Prop() language: string;
   @Toggle() showMenu: boolean;
   @Prop() menuItems: Array<MenuItem>;
   @Dispatch('textChanged') onTextChanged: DispatchEmitter;

   constructor() {
      super();
   }

   setup(options?: MainNavigationOptions): void {
      this.connect(options.container);
      if (options.id) {
         this.id = options.id;
      }
   }

   connectedCallback() {
      this.searchField = getShadowRootElement(this, 'input');
      this.menuButton = getShadowRootElement(this, '#menu-toggle-button');
      this.menuContainer = getShadowRootElement(this, '#menu-container');
      this.logoElement = getShadowRootElement(this, '#main-navigation-logo');
      this.searchField = getShadowRootElement(this, 'main-search-field');
      fetchMenuItems(this.language).then(menuItems => {
         this.menuItems = menuItems;
      });
      if (this.searchField) {
         this.searchField.setAttribute('value', this.searchString);
         this.searchField.setAttribute('environment', this.environment);
      }
      this.logoElement.src = GeonorgeLogo;
      const mainSearch = new MainSearchField();
   }

   @Listen('click', '#menu-toggle-button')
   buttonClicked(event: MouseEvent) {
      this.showMenu = !this.showMenu;
   }

   @Watch('showmenu')
   showMenuChanged() {
      this.showMenu ? this.menuContainer.classList.add('open') : this.menuContainer.classList.remove('open');
   }

   renderMenuItems = (menuItems: Array<MenuItem>) => {
      const menuItemsListElement = menuItems.map((menuItem: MenuItem) => {
         const subItems = menuItem.SubMenuItem && menuItem.SubMenuItem.length ? menuItem.SubMenuItem : null;
         const menuItemElement = `<a href="${menuItem.Url}">${menuItem.Name}</a>`;
         const subItemElements = subItems ? this.renderMenuItems(subItems) : '';
         return `<li>${menuItemElement}${subItemElements}</li>`;
      }).join('');
      return `<ul>${menuItemsListElement}</ul>`;
   }

   @Watch('menuItems')
   menuItemsChanged() {
      if (this.menuItems && this.menuItems.length) {
         this.menuContainer.innerHTML = this.renderMenuItems(this.menuItems);
      }
   }

   public static setup(selector: string, options: MainNavigationOptions) {
      const element = getElement<MainNavigation>(selector);

      if (options.onClick) {
         element.addEventListener('menuButtonClick', options.onClick);
      }
      if (options.active) {
         element.showMenu = options.active;
      }
   }
}

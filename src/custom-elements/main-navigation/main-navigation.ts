// Dependencies
import {
   Component, CustomElement, CustomElementOptions, Prop, Dispatch, DispatchEmitter,
   Listen, Watch, getElement, getShadowRootElement, Toggle
} from 'super-custom-elements';

// Components
import { MainSearchField } from 'custom-elements/main-search-field/main-search-field';

// Assets
import GeonorgeLogo from 'assets/svg/geonorge-navbar-logo.svg';
import MapIcon from 'assets/svg/map-icon.svg';
import DownloadIcon from 'assets/svg/download-icon.svg';
import MenuIcon from 'assets/svg/menu-icon.svg';
import CloseIcon from 'assets/svg/close-icon.svg';

// Functions
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
   private menuButton: HTMLButtonElement;
   private menuIcon: HTMLImageElement;
   private menuContainer: HTMLElement;
   private mapButton: HTMLButtonElement
   private downloadButton: HTMLButtonElement
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
      this.clickOutsideMenuContainer = this.clickOutsideMenuContainer.bind(this);
   }

   setup(options?: MainNavigationOptions): void {
      this.connect(options.container);
      if (options.id) {
         this.id = options.id;
      }
   }

   connectedCallback() {
      this.menuButton = getShadowRootElement(this, '#menu-toggle-button');
      this.menuContainer = getShadowRootElement(this, '#menu-container');
      this.mapButton = getShadowRootElement(this, '#map-toggle-button');
      this.downloadButton = getShadowRootElement(this, '#download-toggle-button');
      this.logoElement = getShadowRootElement(this, '#main-navigation-logo');
      this.searchField = getShadowRootElement(this, 'main-search-field');
      fetchMenuItems(this.language).then(menuItems => {
         this.menuItems = menuItems;
      });
      if (this.searchField) {
         this.searchField.setAttribute('value', this.searchString);
         this.searchField.setAttribute('environment', this.environment);
      }
      this.menuIcon = document.createElement("img");
      this.menuIcon.id = "menu-icon"
      this.menuIcon.src = MenuIcon;
      this.menuButton.appendChild(this.menuIcon);

      const mapIconElement = document.createElement("img");
      mapIconElement.src = MapIcon;
      this.mapButton.appendChild(mapIconElement);

      const downloadIconElement = document.createElement("img");
      downloadIconElement.src = DownloadIcon;
      this.downloadButton.appendChild(downloadIconElement);


      this.logoElement.src = GeonorgeLogo;
      const mainSearch = new MainSearchField();

      document.addEventListener('click', this.clickOutsideMenuContainer);
   }

   disconnectedCallback() {
      document.removeEventListener('click', this.clickOutsideMenuContainer);
   }

   hideMenuContainer = () => {
      this.showMenu = false;
   }

   clickOutsideMenuContainer(event: MouseEvent){
      const targetElement = event.composedPath()[0] as Element;
      if (targetElement.closest('#menu-container') || targetElement.closest('#menu-toggle-button')) return
         this.hideMenuContainer();
   }

   renderMenuItems = (menuItems: Array<MenuItem>, hierarchyLevel: number = 0, maxHierarchyLevel: number = 1) => {
      const menuItemsListElement = menuItems.map((menuItem: MenuItem) => {
         const subItems = menuItem.SubMenuItem && menuItem.SubMenuItem.length ? menuItem.SubMenuItem : null;
         const menuItemElement = `<a href="${menuItem.Url}">${menuItem.Name}</a>`;
         const subItemElements = subItems && hierarchyLevel + 1 <= maxHierarchyLevel ? this.renderMenuItems(subItems, hierarchyLevel + 1, maxHierarchyLevel) : '';
         return `<li>${menuItemElement}${subItemElements}</li>`;
      }).join('');
      return `<ul class="menuItemList hierarchy-level-${hierarchyLevel}">${menuItemsListElement}</ul>`;
   }

   @Listen('click', '#menu-toggle-button')
   buttonClicked(event: MouseEvent) {
      this.showMenu = !this.showMenu;
   }

   @Watch('showmenu')
   showMenuChanged() {
      this.showMenu ? this.menuContainer.classList.add('open') : this.menuContainer.classList.remove('open');
      this.showMenu ? this.menuButton.classList.add('open') : this.menuButton.classList.remove('open');
      this.menuIcon.src = this.showMenu ? CloseIcon : MenuIcon;
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

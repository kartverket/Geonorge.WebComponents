// Dependencies
import {
   Component, CustomElement, CustomElementOptions, Prop, Dispatch, DispatchEmitter,
   Listen, Watch, getElement, getShadowRootElement, Toggle
} from 'super-custom-elements';

// Components
import { MainSearchField } from 'custom-elements/main-navigation/main-search-field/main-search-field';
import { DownloadItems } from 'custom-elements/main-navigation/download-items/download-items';
import { MapItems } from 'custom-elements/main-navigation/map-items/map-items';
import { MainMenu } from 'custom-elements/main-navigation/main-menu/main-menu';

// Assets
import GeonorgeLogo from 'assets/svg/geonorge-navbar-logo.svg';

// Functions
import { getGeonorgeUrl } from 'functions/urlHelpers';


interface MainNavigationOptions extends CustomElementOptions {
   active?: boolean,
   onClick?: () => void,
   onSearch?: () => void
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
   private logoElement: HTMLAnchorElement;
   private mainMenu: HTMLElement;

   @Prop() id: string;
   @Prop() environment: string;
   @Prop() searchString: string;
   @Prop() language: string;
   @Toggle() multilingual: boolean;
   @Toggle() supportsLogin: boolean;
   @Toggle() isLoggedIn: boolean;
   @Toggle() showMenu: boolean;
   @Toggle() staticPosition: boolean;
   @Prop() menuItems: Array<MenuItem>;
   @Dispatch('onSearch') onSearch: DispatchEmitter;

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
      this.logoElement = getShadowRootElement(this, '#main-navigation-logo');
      this.searchField = getShadowRootElement(this, 'main-search-field');
      this.mainMenu = getShadowRootElement(this, '#main-menu');

      if (this.searchField) {
         this.searchField.setAttribute('value', this.searchString);
         this.searchField.setAttribute('environment', this.environment);
      }

      this.logoElement.innerHTML = GeonorgeLogo;
      this.logoElement.href = getGeonorgeUrl(this.environment);


      if(this.staticPosition) {
         getShadowRootElement(this, '#main-navigation').classList.add('static-position');
         getShadowRootElement(this, 'main-menu').setAttribute('staticPosition', '');
      }

      if(this.multilingual){
         this.mainMenu.setAttribute('multilingual', '');
      }
      if (this.language){
         this.mainMenu.setAttribute('language', this.language);
      }
      if (this.supportsLogin){
         this.mainMenu.setAttribute('supportsLogin', '');
      }
      if (this.isLoggedIn){
         this.mainMenu.setAttribute('isLoggedIn', '');
      }

      const mapItems = new MapItems();
      const downloadItems = new DownloadItems();
      const mainSearchField = new MainSearchField();
      const mainMenu = new MainMenu();

   }

   public static setup(selector: string, options: MainNavigationOptions) {
      const element = getElement<MainNavigation>(selector);

      if (options.onSearch) {
         setTimeout(() => {
            const mainSearchField = getShadowRootElement<MainSearchField>(element, 'main-search-field');
            mainSearchField.addEventListener('onSearch', options.onSearch)
         })
         
      }
   }
}

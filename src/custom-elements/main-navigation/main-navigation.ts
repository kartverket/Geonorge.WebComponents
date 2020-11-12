// Dependencies
import {
   Component, CustomElement, CustomElementOptions, Prop, Dispatch, DispatchEmitter,
   Listen, Watch, getElement, getShadowRootElement, Toggle
} from 'super-custom-elements';

// Components
import { MainSearchField } from 'custom-elements/main-navigation/main-search-field/main-search-field';
import { SearchTypeSelector } from 'custom-elements/main-navigation/search-type-selector/search-type-selector';
import { DownloadItems } from 'custom-elements/main-navigation/download-items/download-items';
import { MapItems } from 'custom-elements/main-navigation/map-items/map-items';
import { MainMenu } from 'custom-elements/main-navigation/main-menu/main-menu';

// Assets
import GeonorgeLogo from 'assets/svg/geonorge-navbar-logo.svg';
import GeonorgeLogoTest from 'assets/svg/geonorge-navbar-logo_test.svg';
import GeonorgeLogoDev from 'assets/svg/geonorge-navbar-logo_dev.svg';

// Functions
import { getGeonorgeUrl } from 'functions/urlHelpers';
import { getLanguage } from 'functions/cookieHelpers';



interface MainNavigationOptions extends CustomElementOptions {
   active?: boolean,
   onClick?: () => void,
   onSearch?: () => void,
   onOpenEmptyMapItemsList?: () => void,
   onOpenEmptyDownloadItemsList?: () => void,
   onSearchTypeChange?: () => void
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
   private searchTypeSelector: HTMLElement;
   private logoElement: HTMLAnchorElement;
   private mainMenu: HTMLElement;
   private mapItems: HTMLElement;
   private downloadItems: HTMLElement;

   @Prop() id: string;
   @Prop() environment: string;
   @Prop() language: string;
   @Prop() searchString: string;
   @Prop() metadataresultsfound: string;
   @Prop() articleresultsfound: string;
   @Prop() signinurl: string;
   @Prop() signouturl: string;
   @Prop() englishurl: string;
   @Prop() norwegianurl: string;
   @Toggle() isloggedin: boolean;
   @Toggle() showmenu: boolean;
   @Toggle() showSearchTypeSelector: boolean;
   @Toggle() staticposition: boolean;
   @Dispatch('onSearch') onSearch: DispatchEmitter;
   @Dispatch('onSearchTypeChange') onSearchTypeChange: DispatchEmitter;

   constructor() {
      super();
   }

   setup(options?: MainNavigationOptions): void {
      this.connect(options.container);
      if (options.id) {
         this.id = options.id;
      }
   }

   getGeonorgeLogoVariant(environment: string) {
      switch(environment) {
         case 'dev':
            return GeonorgeLogoDev
         case 'test':
            return GeonorgeLogoTest
         default:
            return GeonorgeLogo
      }
   }

   connectedCallback() {
      this.logoElement = getShadowRootElement(this, '#main-navigation-logo');
      this.searchField = getShadowRootElement(this, 'main-search-field');
      this.mainMenu = getShadowRootElement(this, '#main-menu');
      this.mapItems = getShadowRootElement(this, '#map-items');
      this.downloadItems = getShadowRootElement(this, '#download-items');

      if (this.searchField) {
         this.searchField.setAttribute('value', this.searchString);
         this.searchField.setAttribute('environment', this.environment);
      }

      this.mapItems.setAttribute('environment', this.environment);
      this.downloadItems.setAttribute('environment', this.environment);

      this.logoElement.innerHTML = this.getGeonorgeLogoVariant(this.environment);
      this.logoElement.href = getGeonorgeUrl(this.environment);


      if (this.staticposition) {
         getShadowRootElement(this, '#main-navigation').classList.add('static-position');
         getShadowRootElement(this, 'main-menu').setAttribute('staticposition', '');
      }

      // Pass properties
      const language = this.language ? this.language : getLanguage();
      if (language) { this.mainMenu.setAttribute('language', language); }
      if (this.englishurl) { this.mainMenu.setAttribute('englishurl', this.englishurl); }
      if (this.norwegianurl) { this.mainMenu.setAttribute('norwegianurl', this.norwegianurl); }
      if (this.signinurl) {this.mainMenu.setAttribute('signinurl', this.signinurl);}
      if (this.signouturl) {this.mainMenu.setAttribute('signouturl', this.signouturl);}
      if (this.isloggedin) {this.mainMenu.setAttribute('isLoggedIn', '');}
      if (this.showSearchTypeSelector) {
         this.searchTypeSelector = document.createElement('search-type-selector');
         if (this.metadataresultsfound) {this.searchTypeSelector.setAttribute('metadataresultsfound', this.metadataresultsfound);}
         if (this.articleresultsfound) {this.searchTypeSelector.setAttribute('articleresultsfound', this.articleresultsfound);}
         if (language) {this.searchTypeSelector.setAttribute('language', language);}
         this.searchField.parentNode.insertBefore(this.searchTypeSelector, this.searchField.nextSibling);
         const searchTypeSelector = new SearchTypeSelector();
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
            mainSearchField.addEventListener('onSearch', options.onSearch);
            mainSearchField.setAttribute('preventRedirect', '');
         })
      }
      if (options.onOpenEmptyMapItemsList) {
         setTimeout(() => {
            const mapItems = getShadowRootElement<MapItems>(element, 'map-items');
            mapItems.addEventListener('onOpenEmptyMapItemsList', options.onOpenEmptyMapItemsList);
            mapItems.setAttribute('preventRedirect', '');
         })
      }
      if (options.onOpenEmptyDownloadItemsList) {
         setTimeout(() => {
            const downloadItems = getShadowRootElement<DownloadItems>(element, 'download-items');
            downloadItems.addEventListener('onOpenEmptyDownloadItemsList', options.onOpenEmptyDownloadItemsList);
            downloadItems.setAttribute('preventRedirect', '');
         })
      }
      if (options.onSearchTypeChange) {
         setTimeout(() => {
            const searchTypeSelector = getShadowRootElement<SearchTypeSelector>(element, 'search-type-selector');
            searchTypeSelector.addEventListener('onSearchTypeChange', options.onSearchTypeChange);
         })
      }
   }
}

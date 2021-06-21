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
   onSearchTypeChange?: () => void,
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
   private mapItemsElement: HTMLElement;
   private downloadItemsElement: HTMLElement;

   @Prop() id: string;
   @Prop() environment: string;
   @Prop() language: string;
   @Prop() searchstring: string;
   @Prop() searchtype: string;
   @Prop() metadataresultsfound: string;
   @Prop() articlesresultsfound: string;
   @Prop() signinurl: string;
   @Prop() signouturl: string;
   @Prop() englishurl: string;
   @Prop() norwegianurl: string;
   @Toggle() isloggedin: boolean;
   @Toggle() showmenu: boolean;
   @Toggle() showSearchTypeSelector: boolean;
   @Toggle() staticposition: boolean;
   @Toggle() noshadow: boolean;
   @Dispatch('onSearch') onSearch: DispatchEmitter;
   @Dispatch('onSearchTypeChange') onSearchTypeChange: DispatchEmitter;
   @Dispatch('onSignInClick') onSignInClick: DispatchEmitter;
   @Dispatch('onSignOutClick') onSignOutClick: DispatchEmitter;
   @Dispatch('onNorwegianLanguageSelect') onNorwegianLanguageSelect: DispatchEmitter;
   @Dispatch('onEnglishLanguageSelect') onEnglishLanguageSelect: DispatchEmitter;

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
      switch (environment) {
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
      this.mapItemsElement = getShadowRootElement(this, '#map-items');
      this.downloadItemsElement = getShadowRootElement(this, '#download-items');

      if (this.searchField) {
         this.searchField.setAttribute('searchstring', this.searchstring && this.searchstring.length ? this.searchstring : '');
         this.searchField.setAttribute('environment', this.environment);
         this.searchField.setAttribute('language', this.language);
      }

      this.mapItemsElement.setAttribute('environment', this.environment);
      this.mapItemsElement.setAttribute('language', this.language);

      this.downloadItemsElement.setAttribute('environment', this.environment);
      this.downloadItemsElement.setAttribute('language', this.language);

      this.logoElement.innerHTML = this.getGeonorgeLogoVariant(this.environment);
      this.logoElement.href = getGeonorgeUrl(this.language, this.environment);


      if (this.staticposition) {
         getShadowRootElement(this, '#main-navigation').classList.add('static-position');
         getShadowRootElement(this, 'main-menu').setAttribute('staticposition', '');
      }

      if (this.noshadow) {
         getShadowRootElement(this, '#main-navigation').classList.add('no-shadow');
      }

      // Pass properties
      const language = this.language ? this.language : getLanguage();
      if (language) { this.mainMenu.setAttribute('language', language); }
      if (this.environment) { this.mainMenu.setAttribute('environment', this.environment); }
      if (this.englishurl) { this.mainMenu.setAttribute('englishurl', this.englishurl); }
      if (this.norwegianurl) { this.mainMenu.setAttribute('norwegianurl', this.norwegianurl); }
      if (this.signinurl) { this.mainMenu.setAttribute('signinurl', this.signinurl); }
      if (this.signouturl) { this.mainMenu.setAttribute('signouturl', this.signouturl); }
      if (this.isloggedin) { this.mainMenu.setAttribute('isLoggedIn', ''); }
      if (this.showSearchTypeSelector) {
         this.searchTypeSelector = document.createElement('search-type-selector');
         if (this.metadataresultsfound) { this.searchTypeSelector.setAttribute('metadataresultsfound', this.metadataresultsfound); }
         if (this.articlesresultsfound) { this.searchTypeSelector.setAttribute('articlesresultsfound', this.articlesresultsfound); }
         if (this.searchtype) { this.searchTypeSelector.setAttribute('searchtype', this.searchtype); }
         if (language) { this.searchTypeSelector.setAttribute('language', language); }
         this.searchField.parentNode.insertBefore(this.searchTypeSelector, this.searchField.nextSibling);
         const searchTypeSelector = new SearchTypeSelector();
      }


      const mapItems = new MapItems();
      const downloadItemsElement = new DownloadItems();
      const mainSearchField = new MainSearchField();
      const mainMenu = new MainMenu();

   }

   @Watch('isloggedin')
   isLoggedInChanged() {
      if (this.isloggedin) {
         this.mainMenu.setAttribute('isLoggedIn', '');
      }
   }

   @Watch('language')
   languageChanged() {
      this.mainMenu.setAttribute('language', this.language);
      this.mapItemsElement.setAttribute('language', this.language);
      this.downloadItemsElement.setAttribute('language', this.language);
      if (this.showSearchTypeSelector) {
         this.searchTypeSelector.setAttribute('language', this.language);
      }
      if (this.searchField) {
         this.searchField.setAttribute('language', this.language);
      }
   }

   @Watch('metadataresultsfound')
   metadataResultsFoundChanged() {
      if (this.showSearchTypeSelector) {
         this.searchTypeSelector.setAttribute('metadataresultsfound', this.metadataresultsfound);
      }
   }

   @Watch('articlesresultsfound')
   articlesResultsFoundChanged() {
      if (this.showSearchTypeSelector) {
         this.searchTypeSelector.setAttribute('articlesresultsfound', this.articlesresultsfound);
      }
   }

   @Watch('searchtype')
   searchTypeChanged() {
      if (this.showSearchTypeSelector) {
         this.searchTypeSelector.setAttribute('searchtype', this.searchtype);
      }
   }

   @Watch('searchstring')
   searchStringChanged() {
      if (this.searchField) {
         this.searchField.setAttribute('searchstring', this.searchstring && this.searchstring.length ? this.searchstring : '');
      }
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
            const mapItemsElement = getShadowRootElement<MapItems>(element, 'map-items');
            mapItemsElement.addEventListener('onOpenEmptyMapItemsList', options.onOpenEmptyMapItemsList);
            mapItemsElement.setAttribute('preventRedirect', '');
         })
      }
      if (options.onOpenEmptyDownloadItemsList) {
         setTimeout(() => {
            const downloadItemsElement = getShadowRootElement<DownloadItems>(element, 'download-items');
            downloadItemsElement.addEventListener('onOpenEmptyDownloadItemsList', options.onOpenEmptyDownloadItemsList);
            downloadItemsElement.setAttribute('preventRedirect', '');
         })
      }
      if (options.onSearchTypeChange) {
         setTimeout(() => {
            const searchTypeSelector = getShadowRootElement<SearchTypeSelector>(element, 'search-type-selector');
            searchTypeSelector.addEventListener('onSearchTypeChange', options.onSearchTypeChange);
         })
      }
      if (options.onSignInClick && options.onSignOutClick) {
         setTimeout(() => {
            const mainMenu = getShadowRootElement<MainMenu>(element, 'main-menu');
            mainMenu.setAttribute('hasAuthenticationFunction', '');
            mainMenu.addEventListener('onSignInClick', options.onSignInClick);
            mainMenu.addEventListener('onSignOutClick', options.onSignOutClick);
         })
      }
      if (options.onNorwegianLanguageSelect) {
         setTimeout(() => {
            const mainMenu = getShadowRootElement<MainMenu>(element, 'main-menu');
            mainMenu.setAttribute('hasLanguageSelectFunctions', '');
            mainMenu.addEventListener('onNorwegianLanguageSelect', options.onNorwegianLanguageSelect);
         })
      }
      if (options.onEnglishLanguageSelect) {
         setTimeout(() => {
            const mainMenu = getShadowRootElement<MainMenu>(element, 'main-menu');
            mainMenu.setAttribute('hasLanguageSelectFunctions', '');
            mainMenu.addEventListener('onEnglishLanguageSelect', options.onEnglishLanguageSelect);
         })
      }
   }
}

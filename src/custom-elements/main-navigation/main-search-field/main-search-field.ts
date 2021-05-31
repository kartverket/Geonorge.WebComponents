import {
   Component, CustomElement, CustomElementOptions, Prop, Dispatch, DispatchEmitter,
   Listen, Watch, getElement, getShadowRootElement, Toggle
} from 'super-custom-elements';

// Interfaces
import { SearchResultsForType, SearchResultsResponseForType } from 'interfaces/search';

// Functions
import { fetchDropdownSearchResults } from 'functions/apiHelpers';
import { renderDropdownResultLink, getKartkatalogUrl } from 'functions/urlHelpers';

// Assets
import SearchIcon from 'assets/svg/search-icon.svg';

interface MainSearchFieldOptions extends CustomElementOptions {
   active?: boolean,
   value?: string,
   onSearchStringChange?: () => void,
   onClick?: () => void,
   onSearch?: () => void
}

@Component({
   tag: 'main-search-field',
   template: import('./main-search-field.html'),
   style: import('./main-search-field.scss')
})

export class MainSearchField extends CustomElement {
   private static readonly elementSelector = 'main-search-field';
   private searchField: HTMLInputElement;
   private searchFieldLabel: HTMLInputElement;
   private searchButton: HTMLInputElement;
   private searchResultsContainer: HTMLInputElement;

   @Prop() id: string;
   @Prop() environment: string;
   @Toggle() showSearchResults: boolean;
   @Toggle() preventRedirect: boolean;
   @Prop() searchstring: string = '';
   @Prop() language: string;
   @Prop() searchResultsResponses: Array<SearchResultsResponseForType>;
   @Dispatch('searchResultsChanged') onTextChanged: DispatchEmitter;
   @Dispatch('onSearchStringChange') onSearchStringChange: DispatchEmitter;
   @Dispatch('onSearch') onSearch: DispatchEmitter;

   constructor() {
      super();
      this.clickOutsideSearchResultsContainer = this.clickOutsideSearchResultsContainer.bind(this);
   }

   setup(options?: MainSearchFieldOptions): void {
      this.connect(options.container);
      if (options.id) {
         this.id = options.id;
      }
   }

   connectedCallback() {
      this.searchField = getShadowRootElement(this, '#main-search-input');
      this.searchFieldLabel = getShadowRootElement(this, '#main-search-input-label');
      this.searchButton = getShadowRootElement(this, '#search-submit-button');

      this.searchFieldLabel.innerHTML = this.language === 'en' ? 'Search' : 'Søk';

      this.searchButton.innerHTML = SearchIcon;

      this.searchResultsContainer = getShadowRootElement(this, '#search-results-container');
      this.searchResultsContainer.style.maxHeight = `${window.innerHeight - 61}px`;
      if (this.searchField && this.searchstring) {
         this.searchField.setAttribute('value', this.searchstring);
      }
      document.addEventListener('click', this.clickOutsideSearchResultsContainer);
   }

   disconnectedCallback() {
      document.removeEventListener('click', this.clickOutsideSearchResultsContainer);
   }

   renderSearchResultsForType = (searchResultsResponseForType: SearchResultsResponseForType) => {
      const searchResultsTypeName = searchResultsResponseForType.Results[0].TypeTranslated;
      const searchResultsType = searchResultsResponseForType.searchResultsType;
      const searchResultsListElements = searchResultsResponseForType.Results.map((searchResult: SearchResultsForType) => {
         return `<li>${renderDropdownResultLink(searchResult, searchResultsType, this.searchstring, this.environment)}</li>`;
      }).join('');

      const searchResultsTypeLink = searchResultsType === 'articles'
         ? `${getKartkatalogUrl(this.environment)}/articles?text=${this.searchstring}`
         : `${getKartkatalogUrl(this.environment)}/metadata?text=${this.searchstring}&type=${searchResultsType}`;

      return `
      <div class="search-results-for-type">
         <a href="${searchResultsTypeLink}" class="search-results-for-type-title">
            ${searchResultsTypeName}
            <span class="search-results-for-type-number-badge">
               ${searchResultsResponseForType.NumFound}
            </span>
         </a>
         <ul class="search-results-for-type-list">
            ${searchResultsListElements}
         </ul>
      </div>`;
   }

   renderSearchResults = (searchResultsResponses: Array<SearchResultsResponseForType>) => {
      const searchResultsListElements = searchResultsResponses.map((searchResultsResponseForType: SearchResultsResponseForType) => {
         return this.renderSearchResultsForType(searchResultsResponseForType);
      }).join('');
      return `<div>${searchResultsListElements}</div>`;
   }

   hideSearchResultsContainer = () => {
      this.showSearchResults = false;
   }

   clickOutsideSearchResultsContainer(event: MouseEvent) {
      const targetElement = event.composedPath()[0] as Element;
      if (targetElement.closest('#search-results-container') || targetElement.closest('#main-search-input')) {
         const closestLink = targetElement.closest('a');
         if (closestLink?.href?.length) {
            this.hideSearchResultsContainer();
         }
         return
      }
      this.hideSearchResultsContainer();
   }

   submitSearch() {
      this.hideSearchResultsContainer();
      if (this.preventRedirect) {
         this.onSearch.emit({
            detail: {
               searchString: this.searchstring
            }
         });
      } else {
         window.location.href = `${getKartkatalogUrl(this.environment)}/metadata?text=${this.searchstring}`
      }

   }

   @Listen('keyup', 'input')
   searchFieldKeyUp(event: KeyboardEvent) {
      if (event.key && event.key === 'Enter' && this.searchstring?.toString().length) {
         this.submitSearch()
      } else {
         this.searchstring = this.searchField?.value?.toString() || '';
      }
   }

   @Listen('click', '#search-submit-button')
   onSearchSubmitted(event: MouseEvent) {
      this.submitSearch();
   }


   @Watch('searchstring')
   searchStringChanged() {
      if (this.searchField) {
         this.searchField.setAttribute('value', this.searchstring)
      }
      fetchDropdownSearchResults(this.searchstring, this.language, this.environment).then(searchResultsResponses => {
         this.searchResultsResponses = searchResultsResponses;
      });
   }

   @Watch('language')
   languageChanged() {
      if (this.searchField) {
         this.searchField.setAttribute('aria-label', this.language === 'en' ? 'Enter your search query' : 'Skriv inn det du vil søke etter');
      }
      if (this.searchFieldLabel) {
         this.searchFieldLabel.innerText = this.language === 'en' ? 'Search' : 'Søk';
      }
      if (this.searchButton) {
         this.searchButton.setAttribute('aria-label', this.language === 'en' ? 'Search' : 'Søk');
      }
   }


   @Watch('showsearchresults')
   showSearchResultsChanged() {
      this.showSearchResults ? this.searchResultsContainer.classList.add('open') : this.searchResultsContainer.classList.remove('open');
   }

   @Watch('searchResultsResponses')
   searchResultsResponseChanged() {
      const searchResults = this.searchResultsResponses && this.searchResultsResponses.length ? this.searchResultsResponses.filter(searchResultsResponseForType => {
         return searchResultsResponseForType.NumFound > 0
      }) : [];
      this.searchResultsContainer.innerHTML = searchResults.length ? this.renderSearchResults(searchResults) : '';
      this.showSearchResults = searchResults.length ? true : false;
   }

   public static setup(selector: string, options: MainSearchFieldOptions) {
      const element = getElement<MainSearchField>(selector);

      if (options.onClick) {
         element.addEventListener('searchButtonClick', options.onClick);
      }
      if (options.active) {
         element.showSearchResults = options.active;
      }
   }
}

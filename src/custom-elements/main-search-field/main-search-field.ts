import {
   Component, CustomElement, CustomElementOptions, Prop, Dispatch, DispatchEmitter,
   Listen, Watch, getElement, getShadowRootElement, Toggle
} from 'super-custom-elements';

import { fetchDropdownSearchResults } from 'functions/apiHelpers';


interface MainSearchFieldOptions extends CustomElementOptions {
   active?: boolean,
   value?: string,
   onSearchStringChange?: () => void,
   onClick?: () => void
}

interface SearchResultsForType extends Object {
   Title: string,
   TypeTranslated: string
}

interface SearchResultsResponseForType extends Object {
   NumFound: number,
   Results: Array<SearchResultsForType>,
   searchResultsType: string
}

@Component({
   tag: 'main-search-field',
   template: import('./main-search-field.html'),
   style: import('./main-search-field.scss')
})

export class MainSearchField extends CustomElement {
   private static readonly elementSelector = 'main-search-field';
   private searchField: HTMLInputElement;
   private searchButton: HTMLInputElement;
   private searchResultsContainer: HTMLInputElement;

   @Prop() id: string;
   @Toggle() showSearchResults: boolean;
   @Prop() searchString: string = '';
   @Prop() language: string;
   @Prop() searchResultsResponses: Array<SearchResultsResponseForType>;
   @Dispatch('searchResultsChanged') onTextChanged: DispatchEmitter;
   @Dispatch('onSearchStringChange') onSearchStringChange: DispatchEmitter;

   constructor() {
      super();
   }

   setup(options?: MainSearchFieldOptions): void {
      this.connect(options.container);
      if (options.id) {
         this.id = options.id;
      }
   }

   connectedCallback() {
      this.searchField = getShadowRootElement(this, 'input');
      this.searchButton = getShadowRootElement(this, 'button');
      this.searchResultsContainer = getShadowRootElement(this, '#search-results-container');
      if (this.searchField && this.searchString) {
         this.searchField.setAttribute('value', this.searchString);
      }
   }

   renderSearchResultsForType = (searchResultsResponseForType: SearchResultsResponseForType) => {
      const searchResultsTypeName = searchResultsResponseForType.Results[0].TypeTranslated;
      const searchResultsType = searchResultsResponseForType.searchResultsType;
      const searchResultsListElements = searchResultsResponseForType.Results.map((searchResult: SearchResultsForType) => {
         return `<li>${searchResult.Title}</li>`;
      }).join('');
      return `
      <div class="search-results-for-type">
         <a href="/metadata?text=${this.searchString}&type=${searchResultsType}" class="search-results-for-type-title">
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
      console.log(searchResultsResponses);

      const searchResultsListElements = searchResultsResponses.map((searchResultsResponseForType: SearchResultsResponseForType) => {
         return this.renderSearchResultsForType(searchResultsResponseForType);
      }).join('');
      return `<div>${searchResultsListElements}</div>`;
   }

   @Listen('keyup', 'input')
   searchFieldKeyUp(event: KeyboardEvent) {
      this.searchString = this.searchField.value;
   }

   @Watch('searchString')
   searchStringChanged() {
      if (this.searchField && this.searchString) {
         this.searchField.setAttribute('value', this.searchString)
      }
      fetchDropdownSearchResults(this.searchString).then(searchResultsResponses => {
         this.searchResultsResponses = searchResultsResponses;
      });
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

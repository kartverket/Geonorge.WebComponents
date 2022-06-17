// Dependencies
import {
   Component, CustomElement, CustomElementOptions, Prop, Dispatch, DispatchEmitter,
   Listen, Watch, getElement, getShadowRootElement, Toggle
} from 'super-custom-elements';


// Assets
import MapIcon from 'assets/svg/map-icon.svg';
import TrashIcon from 'assets/svg/trash-icon.svg';

// Functions
import { getMapItems, getMapItemsCount, removeMapItem } from 'functions/mapItemHelpers';
import { getKartkatalogUrl } from 'functions/urlHelpers';
import { getFocusableElementsInsideElement } from 'functions/guiHelpers';

interface MapItem extends Object {
   Title: string,
   Uuid: string
}

interface MapItemsOptions extends CustomElementOptions {
   active?: boolean
}

@Component({
   tag: 'map-items',
   template: import('./map-items.html'),
   style: import('./map-items.scss')
})

export class MapItems extends CustomElement {
   private static readonly elementSelector = 'map-items';
   private mapButton: HTMLButtonElement;
   private mapIcon: HTMLElement;
   private mapIconCounter: HTMLSpanElement;
   private mapItemListContainer: HTMLDivElement;
   private mapItems: Array<MapItem>;

   @Prop() id: string;
   @Prop() environment: string;
   @Prop() language: string;
   @Toggle() showList: boolean;
   @Toggle() preventRedirect: boolean;
   @Dispatch('onOpenEmptyMapItemsList') onOpenEmptyMapItemsList: DispatchEmitter;

   constructor() {
      super();
      this.clickOutsideMapItemsContainer = this.clickOutsideMapItemsContainer.bind(this);
      this.updateDomElements = this.updateDomElements.bind(this);
      this.getUpdatedMapItems = this.getUpdatedMapItems.bind(this);
   }

   setup(options?: MapItemsOptions): void {
      this.connect(options.container);
      if (options.id) {
         this.id = options.id;
      }
   }

   connectedCallback() {
      this.mapButton = getShadowRootElement(this, '#map-toggle-button');
      this.mapIcon = getShadowRootElement(this, '#map-toggle-button-icon');
      this.mapIconCounter = getShadowRootElement(this, '#map-toggle-button-counter');
      this.mapItemListContainer = getShadowRootElement(this, '#map-item-list-container');

      this.getUpdatedMapItems();
      this.mapIcon.innerHTML = MapIcon;
      this.renderMapItemsCounter();

      document.addEventListener('click', this.clickOutsideMapItemsContainer);
      document.addEventListener('mapItemsChanged', this.updateDomElements);
   }

   updateDomElements() {
      this.getUpdatedMapItems();
      this.renderMapItems(this.mapItems);
      this.renderMapItemsCounter();
   }

   getUpdatedMapItems() {
      this.mapItems = getMapItems();
   }

   disconnectedCallback() {
      document.removeEventListener('click', this.clickOutsideMapItemsContainer);
   }

   hideListContainer = () => {
      this.showList = false;
   }

   clickOutsideMapItemsContainer(event: MouseEvent) {
      const targetElement = event.composedPath()[0] as Element;
      if (targetElement.closest('#map-item-list-container') || targetElement.closest('#map-toggle-button')) return
      this.hideListContainer();
   }

   renderMapItemsCounter() {
      const mapItemsCount = getMapItemsCount();
      if (mapItemsCount) {
         this.mapIconCounter.innerHTML = mapItemsCount.toString();
         this.mapIconCounter.classList.remove('hidden');
         this.mapButton.setAttribute(
            'aria-label',
            this.language === 'en' 
               ? `Show ${mapItemsCount} map ${mapItemsCount === 1 ? 'item' : 'items'} in list`
               : `Vis liste med ${mapItemsCount} ${mapItemsCount === 1 ? 'element' : 'elementer'} lagt til i kart`
         );
      } else {
         this.mapIconCounter.innerHTML = '';
         this.mapIconCounter.classList.add('hidden');
         this.mapButton.setAttribute(
            'aria-label',
            this.language === 'en'
               ? 'Show map'
               : 'Vis kart'
         );
      }
   }

   renderMapItems = (mapItems: Array<MapItem>) => {
      const mapItemsListElement = mapItems.map((mapItem: MapItem) => {
         if (mapItem) {
            const mapItemElement = document.createElement('span');
            mapItemElement.innerText = mapItem.Title;

            const removeMapItemElement = document.createElement('button');
            removeMapItemElement.classList.add('list-icon');
            removeMapItemElement.innerHTML = TrashIcon;
            removeMapItemElement.dataset['mapItem'] = JSON.stringify(mapItem);
            removeMapItemElement.setAttribute('aria-label', this.language === 'en' ? `Remove ${mapItem.Title} from map` : `Fjern ${mapItem.Title} fra kart`);
            if (!this.showList){
               removeMapItemElement.setAttribute('tabindex', '-1');
            }
            mapItemElement.appendChild(removeMapItemElement);

            return `<li>${mapItemElement.innerHTML}</li>`;
         } else return null;
      }).filter(mapItem => { return mapItem }).join('');
      let mapItemLinkElement;
      if (this.preventRedirect) {
         mapItemLinkElement = document.createElement('button');
         mapItemLinkElement.addEventListener("click", () => {
            this.onOpenEmptyMapItemsList.emit();
         });
      } else {
         mapItemLinkElement = document.createElement('a');
         mapItemLinkElement.href = `${getKartkatalogUrl(this.environment)}/kart`;
      }
      mapItemLinkElement.innerText = this.language === 'en' ? 'Show map' : 'Vis kart';
      mapItemLinkElement.classList.add('page-link-element');
      if (!this.showList){
         mapItemLinkElement.setAttribute('tabindex', '-1');
      }
      this.mapItemListContainer.innerHTML = `<ul>${mapItemsListElement}</ul>`;
      this.mapItemListContainer.prepend(mapItemLinkElement);
   }

   @Listen('click', '#map-toggle-button')
   buttonClicked(event: MouseEvent) {

      if (this.mapItems && this.mapItems.length) {
         this.showList = !this.showList;
      } else {
         this.showList = false;
         if (this.preventRedirect) {
            this.onOpenEmptyMapItemsList.emit();
         } else {
            window.location.href = `${getKartkatalogUrl(this.environment)}/kart`
         }
      }
   }

   @Listen('click', '#map-item-list-container')
   removeMapItemClicked(event: MouseEvent) {
      const targetElement = event.composedPath()[0] as Element;
      targetElement.closest('#menu-container');
      const removeMapItemButtonElement = targetElement.closest('button');

      if (removeMapItemButtonElement) {
         const mapItem = removeMapItemButtonElement.dataset && removeMapItemButtonElement.dataset.mapItem ? JSON.parse(removeMapItemButtonElement.dataset.mapItem) : null;
         if (mapItem) {
            event.stopPropagation();
            removeMapItem(mapItem);
            this.getUpdatedMapItems();
            this.renderMapItems(this.mapItems);
            this.renderMapItemsCounter();
            if (!this.mapItems || !this.mapItems.length) {
               this.showList = false;
            }
         }
      }
   }

   @Watch('showlist')
   showMenuChanged() {
      this.showList ? this.mapItemListContainer.classList.add('open') : this.mapItemListContainer.classList.remove('open');
      this.showList ? this.mapButton.classList.add('open') : this.mapButton.classList.remove('open');
      const mapItemListContainerButtons = getFocusableElementsInsideElement(this.mapItemListContainer);
      mapItemListContainerButtons.forEach(button => {
         if (!this.showList){
            button.setAttribute('tabindex', '-1');
         } else {
            button.removeAttribute('tabindex');
         }
      });
   }

   @Watch('mapItems')
   mapItemsChanged() {
      if (this.mapItems && this.mapItems.length) {
         this.renderMapItems(this.mapItems);
         this.renderMapItemsCounter();
      }
   }

   @Watch('language')
   languageChanged() {
      if (this.mapItems && this.mapItems.length) {
         this.renderMapItems(this.mapItems);
         this.renderMapItemsCounter();
      }
   }

   @Watch('preventredirect')
   preventRedirectChanged() {
      if (this.mapItems && this.mapItems.length) {
         this.renderMapItems(this.mapItems);
         this.renderMapItemsCounter();
      }
   }

   public static setup(selector: string, options: MapItemsOptions) {
      const element = getElement<MapItems>(selector);
      if (options.active) {
         element.showList = options.active;
      }
   }
}

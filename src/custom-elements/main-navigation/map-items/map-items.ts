// Dependencies
import {
    Component, CustomElement, CustomElementOptions, Prop, Dispatch, DispatchEmitter,
    Listen, Watch, getElement, getShadowRootElement, Toggle
 } from 'super-custom-elements';
 
 
 // Assets
 import MapIcon from 'assets/svg/map-icon.svg';
 import TrashIcon from 'assets/svg/trash-icon.svg';
 
 // Functions
 import { getMapItems, getMapItemMetadata, removeMapItem } from 'functions/mapItemHelpers';
 
 interface MapItem extends Object {
    name: string,
    organizationName: string,
    uuid: string
 }
 
 interface MapItemsOptions extends CustomElementOptions {
    active?: boolean,
    onClick?: () => void
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
    @Toggle() showList: boolean;
 
    constructor() {
       super();
       this.clickOutsideMapItemsContainer = this.clickOutsideMapItemsContainer.bind(this);
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
    }
 
    getUpdatedMapItems(){
       const mapItemUuids = getMapItems();
       this.mapItems = mapItemUuids.map(uuid => {
          return getMapItemMetadata(uuid);
       })
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
 
    renderMapItemsCounter(){
       if (this.mapItems && this.mapItems.length){
          this.mapIconCounter.innerHTML = this.mapItems.length.toString();
          this.mapIconCounter.classList.remove('hidden');
       } else {
          this.mapIconCounter.innerHTML = '';
          this.mapIconCounter.classList.add('hidden');
       }
    }
 
    renderMapItems = (mapItems: Array<MapItem>) => {
       const mapItemsListElement = mapItems.map((mapItem: MapItem) => {
          const mapItemElement = document.createElement('span');
          mapItemElement.innerText = mapItem.name;
 
          const removeMapItemElement = document.createElement('button');
          removeMapItemElement.classList.add('list-icon');
          removeMapItemElement.innerHTML = TrashIcon;
          removeMapItemElement.dataset['mapItem'] = JSON.stringify(mapItem);
          mapItemElement.appendChild(removeMapItemElement);
 
          return `<li>${mapItemElement.innerHTML}</li>`;
       }).join('');
       this.mapItemListContainer.innerHTML = `<ul>${mapItemsListElement}</ul>`;
    }
 
    @Listen('click', '#map-toggle-button')
    buttonClicked(event: MouseEvent) {
       this.showList = !this.showList;
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
          }
       }
    }
 
    @Watch('showlist')
    showMenuChanged() {
       this.showList ? this.mapItemListContainer.classList.add('open') : this.mapItemListContainer.classList.remove('open');
       this.showList ? this.mapButton.classList.add('open') : this.mapButton.classList.remove('open');
    }
 
    @Watch('mapItems')
    mapItemsChanged() {
       if (this.mapItems && this.mapItems.length) {
          this.renderMapItems(this.mapItems);
          this.renderMapItemsCounter();
       }
    }
 
    public static setup(selector: string, options: MapItemsOptions) {
       const element = getElement<MapItems>(selector);
 
       if (options.onClick) {
          element.addEventListener('menuButtonClick', options.onClick);
       }
       if (options.active) {
          element.showList = options.active;
       }
    }
 }
 
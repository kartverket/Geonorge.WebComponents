// Dependencies
import {
    Component, CustomElement, CustomElementOptions, Prop, Dispatch, DispatchEmitter,
    Listen, Watch, getElement, getShadowRootElement, Toggle
 } from 'super-custom-elements';
 
 
 // Assets
 import DownloadIcon from 'assets/svg/download-icon.svg';
 
 // Functions
 import { getDownloadItems, getDownloadItemMetadata } from 'functions/downloadItemHelpers';
 
 interface DownloadItem extends Object {
    name: string,
    organizationName: string,
    uuid: string
 }

 interface DownloadItemsOptions extends CustomElementOptions {
    active?: boolean,
    onClick?: () => void
 }
  
 @Component({
    tag: 'download-items',
    template: import('./download-items.html'),
    style: import('./download-items.scss')
 })
 
 export class DownloadItems extends CustomElement {
    private static readonly elementSelector = 'download-items';
    private downloadButton: HTMLButtonElement;
    private downloadIcon: HTMLElement;
    private downloadIconCounter: HTMLSpanElement;
    private downloadItemListContainer: HTMLDivElement;
    private downloadItems:  Array<DownloadItem>;
 
    @Prop() id: string;
    @Toggle() showList: boolean;
 
    constructor() {
       super();
       this.clickOutsideDownloadItemsContainer = this.clickOutsideDownloadItemsContainer.bind(this);
    }
 
    setup(options?: DownloadItemsOptions): void {
       this.connect(options.container);
       if (options.id) {
          this.id = options.id;
       }
    }
 
    connectedCallback() {
       this.downloadButton = getShadowRootElement(this, '#download-toggle-button');
       this.downloadIcon = getShadowRootElement(this, '#download-toggle-button-icon');
       this.downloadIconCounter = getShadowRootElement(this, '#download-toggle-button-counter');
       this.downloadItemListContainer = getShadowRootElement(this, '#download-item-list-container');
       
       const downloadItemUuids = getDownloadItems();
       console.log(downloadItemUuids);
       if (downloadItemUuids && downloadItemUuids.length) {
          this.downloadItems = downloadItemUuids.map(uuid => {
             return getDownloadItemMetadata(uuid);
          })
       }
       this.downloadIcon.innerHTML = DownloadIcon;
 
       this.downloadIconCounter.innerHTML = this.downloadItems && this.downloadItems.length ? this.downloadItems.length.toString() : '';
 
       document.addEventListener('click', this.clickOutsideDownloadItemsContainer);
    }
 
    disconnectedCallback() {
       document.removeEventListener('click', this.clickOutsideDownloadItemsContainer);
    }
 
    hideListContainer = () => {
       this.showList = false;
    }
 
    clickOutsideDownloadItemsContainer(event: MouseEvent){
       const targetElement = event.composedPath()[0] as Element;
       if (targetElement.closest('#download-item-list-container') || targetElement.closest('#download-toggle-button')) return
          this.hideListContainer();
    }
 
    renderDownloadItems = (downloadItems: Array<DownloadItem>) => {
       const downloadItemsListElement = downloadItems.map((downloadItem: DownloadItem) => {
          const downloadItemElement = `<span>${downloadItem.name}</span>`;
          return `<li>${downloadItemElement}</li>`;
       }).join('');
       return `<ul class="menuItemList">${downloadItemsListElement}</ul>`;
    }
 
    @Listen('click', '#download-toggle-button')
    buttonClicked(event: MouseEvent) {
       this.showList = !this.showList;
    }
 
    @Watch('showlist')
    showMenuChanged() {
       this.showList ? this.downloadItemListContainer.classList.add('open') : this.downloadItemListContainer.classList.remove('open');
       this.showList ? this.downloadButton.classList.add('open') : this.downloadButton.classList.remove('open');
    }
 
    @Watch('downloaditems')
    menuItemsChanged() {
       if (this.downloadItems && this.downloadItems.length) {
          this.downloadItemListContainer.innerHTML = this.renderDownloadItems(this.downloadItems);
       }
    }
 
    public static setup(selector: string, options: DownloadItemsOptions) {
       const element = getElement<DownloadItems>(selector);
 
       if (options.onClick) {
          element.addEventListener('menuButtonClick', options.onClick);
       }
       if (options.active) {
          element.showList = options.active;
       }
    }
 }
 
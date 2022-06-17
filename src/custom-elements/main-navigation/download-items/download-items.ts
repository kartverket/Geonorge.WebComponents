// Dependencies
import {
   Component, CustomElement, CustomElementOptions, Prop, Dispatch, DispatchEmitter,
   Listen, Watch, getElement, getShadowRootElement, Toggle
} from 'super-custom-elements';


// Assets
import DownloadIcon from 'assets/svg/download-icon.svg';
import TrashIcon from 'assets/svg/trash-icon.svg';

// Functions
import { getDownloadItems, getDownloadItemsCount, getDownloadItemMetadata, removeDownloadItem } from 'functions/downloadItemHelpers';
import { getKartkatalogUrl } from 'functions/urlHelpers';
import { getFocusableElementsInsideElement } from 'functions/guiHelpers';

interface DownloadItem extends Object {
   name: string,
   organizationName: string,
   uuid: string
}

interface DownloadItemsOptions extends CustomElementOptions {
   active?: boolean
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
   private downloadItems: Array<DownloadItem>;

   @Prop() id: string;
   @Prop() environment: string;
   @Prop() language: string;
   @Toggle() showList: boolean;
   @Toggle() preventRedirect: boolean;
   @Dispatch('onOpenEmptyDownloadItemsList') onOpenEmptyDownloadItemsList: DispatchEmitter;

   constructor() {
      super();
      this.clickOutsideDownloadItemsContainer = this.clickOutsideDownloadItemsContainer.bind(this);
      this.updateDomElements = this.updateDomElements.bind(this);
      this.getUpdatedDownloadItems = this.getUpdatedDownloadItems.bind(this);
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

      this.getUpdatedDownloadItems();
      this.downloadIcon.innerHTML = DownloadIcon;
      this.renderDownloadItemsCounter();

      document.addEventListener('click', this.clickOutsideDownloadItemsContainer);
      document.addEventListener('downloadItemsChanged', this.updateDomElements);
   }

   updateDomElements() {
      this.getUpdatedDownloadItems();
      this.renderDownloadItems(this.downloadItems);
      this.renderDownloadItemsCounter();
   }

   getUpdatedDownloadItems() {
      const downloadItemUuids = getDownloadItems();
      this.downloadItems = downloadItemUuids.map(uuid => {
         return getDownloadItemMetadata(uuid);
      }).filter(downloadItem => { return downloadItem });
   }

   disconnectedCallback() {
      document.removeEventListener('click', this.clickOutsideDownloadItemsContainer);
   }

   hideListContainer = () => {
      this.showList = false;
   }

   clickOutsideDownloadItemsContainer(event: MouseEvent) {
      const targetElement = event.composedPath()[0] as Element;
      if (targetElement.closest('#download-item-list-container') || targetElement.closest('#download-toggle-button')) return
      this.hideListContainer();
   }

   renderDownloadItemsCounter() {
      const downloadItemsCount = getDownloadItemsCount();
      if (downloadItemsCount) {
         this.downloadIconCounter.innerHTML = downloadItemsCount.toString();
         this.downloadIconCounter.classList.remove('hidden');
         this.downloadButton.setAttribute(
            'aria-label',
            this.language === 'en'
               ? `Show ${downloadItemsCount} download ${downloadItemsCount === 1 ? 'item' : 'items'} in list`
               : `Vis liste med ${downloadItemsCount} ${downloadItemsCount === 1 ? 'element' : 'elementer'} til nedlasting`
            );
      } else {
         this.downloadIconCounter.innerHTML = '';
         this.downloadIconCounter.classList.add('hidden');
         this.downloadButton.setAttribute(
            'aria-label',
            this.language === 'en' 
               ? 'Go to download page' 
               : 'Gå til nedlastingsside'
         );
      }
   }

   renderDownloadItems = (downloadItems: Array<DownloadItem>) => {
      const downloadItemsListElement = downloadItems.map((downloadItem: DownloadItem) => {
         if (downloadItem) {
            const downloadItemElement = document.createElement('span');
            downloadItemElement.innerText = downloadItem.name;

            const removeDownloadItemElement = document.createElement('button');
            removeDownloadItemElement.classList.add('list-icon');
            removeDownloadItemElement.innerHTML = TrashIcon;
            removeDownloadItemElement.dataset['downloadItem'] = JSON.stringify(downloadItem);
            removeDownloadItemElement.setAttribute('aria-label', this.language === 'en' ? `Remove ${downloadItem.name} from downloads` : `Fjern ${downloadItem.name} fra kurv`);
            if (!this.showList){
               removeDownloadItemElement.setAttribute('tabindex', '-1');
            }
            downloadItemElement.appendChild(removeDownloadItemElement);

            return `<li>${downloadItemElement.innerHTML}</li>`;
         } else return null;
      }).filter(downloadItem => { return downloadItem }).join('');

      let downloadItemLinkElement;
      if (this.preventRedirect) {
         downloadItemLinkElement = document.createElement('button');
         downloadItemLinkElement.addEventListener("click", () => {
            this.onOpenEmptyDownloadItemsList.emit();
         });
      } else {
         downloadItemLinkElement = document.createElement('a');
         downloadItemLinkElement.href = `${getKartkatalogUrl(this.environment)}/nedlasting`;
      }
      downloadItemLinkElement.innerText = this.language === 'en' ? 'Go to download' : 'Til nedlasting';
      downloadItemLinkElement.classList.add('page-link-element');
      if (!this.showList){
         downloadItemLinkElement.setAttribute('tabindex', '-1');
      }
      this.downloadItemListContainer.innerHTML = `<ul>${downloadItemsListElement}</ul>`;
      this.downloadItemListContainer.prepend(downloadItemLinkElement);
   }

   @Listen('click', '#download-toggle-button')
   buttonClicked(event: MouseEvent) {
      if (this.downloadItems && this.downloadItems.length) {
         this.showList = !this.showList;
      } else {
         this.showList = false;
         if (this.preventRedirect) {
            this.onOpenEmptyDownloadItemsList.emit();
         } else {
            window.location.href = `${getKartkatalogUrl(this.environment)}/nedlasting`
         }
      }
   }

   @Listen('click', '#download-item-list-container')
   removeDownloadItemClicked(event: MouseEvent) {
      const targetElement = event.composedPath()[0] as Element;
      targetElement.closest('#menu-container');
      const removeDownloadItemButtonElement = targetElement.closest('button');

      if (removeDownloadItemButtonElement) {
         const downloadItem = removeDownloadItemButtonElement.dataset && removeDownloadItemButtonElement.dataset.downloadItem ? JSON.parse(removeDownloadItemButtonElement.dataset.downloadItem) : null;
         if (downloadItem) {
            event.stopPropagation();
            removeDownloadItem(downloadItem);
            this.getUpdatedDownloadItems();
            this.renderDownloadItems(this.downloadItems);
            this.renderDownloadItemsCounter();
            if (!this.downloadItems || !this.downloadItems.length) {
               this.showList = false;
            }
         }
      }
   }

   @Watch('showlist')
   showMenuChanged() {
      this.showList ? this.downloadItemListContainer.classList.add('open') : this.downloadItemListContainer.classList.remove('open');
      this.showList ? this.downloadButton.classList.add('open') : this.downloadButton.classList.remove('open');
      const downloadItemListContainerButtons = getFocusableElementsInsideElement(this.downloadItemListContainer);
      downloadItemListContainerButtons.forEach(button => {
         if (!this.showList){
            button.setAttribute('tabindex', '-1');
         } else {
            button.removeAttribute('tabindex');
         }
      });
   }

   @Watch('downloadItems')
   downloadItemsChanged() {
      if (this.downloadItems && this.downloadItems.length) {
         this.renderDownloadItems(this.downloadItems);
         this.renderDownloadItemsCounter();
      }
   }

   @Watch('language')
   languageChanged() {
      if (this.downloadItems && this.downloadItems.length) {
         this.renderDownloadItems(this.downloadItems);
         this.renderDownloadItemsCounter();
      }
   }

   @Watch('preventredirect')
   preventRedirectChanged() {
      if (this.downloadItems && this.downloadItems.length) {
         this.renderDownloadItems(this.downloadItems);
         this.renderDownloadItemsCounter();
      }
   }

   public static setup(selector: string, options: DownloadItemsOptions) {
      const element = getElement<DownloadItems>(selector);
      if (options.active) {
         element.showList = options.active;
      }
   }
}

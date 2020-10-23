// Dependencies
import {
   Component, CustomElement, CustomElementOptions, Prop, Dispatch, DispatchEmitter,
   Listen, Watch, getElement, getShadowRootElement, Toggle
} from 'super-custom-elements';


// Assets
import DownloadIcon from 'assets/svg/download-icon.svg';
import TrashIcon from 'assets/svg/trash-icon.svg';

// Functions
import { getDownloadItems, getDownloadItemMetadata, removeDownloadItem } from 'functions/downloadItemHelpers';
import { getKartkatalogUrl } from 'functions/urlHelpers';


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
   private downloadItems: Array<DownloadItem>;

   @Prop() id: string;
   @Prop() environment: string;
   @Toggle() showList: boolean;
   @Toggle() preventRedirect: boolean;
   @Dispatch('onOpenEmptyDownloadItemsList') onOpenEmptyDownloadItemsList: DispatchEmitter;

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

      this.getUpdatedDownloadItems();
      this.downloadIcon.innerHTML = DownloadIcon;
      this.renderDownloadItemsCounter();

      document.addEventListener('click', this.clickOutsideDownloadItemsContainer);
   }

   getUpdatedDownloadItems() {
      const downloadItemUuids = getDownloadItems();
      this.downloadItems = downloadItemUuids.map(uuid => {
         return getDownloadItemMetadata(uuid);
      })
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
      if (this.downloadItems && this.downloadItems.length) {
         this.downloadIconCounter.innerHTML = this.downloadItems.length.toString();
         this.downloadIconCounter.classList.remove('hidden');
      } else {
         this.downloadIconCounter.innerHTML = '';
         this.downloadIconCounter.classList.add('hidden');
      }
   }

   renderDownloadItems = (downloadItems: Array<DownloadItem>) => {
      const downloadItemsListElement = downloadItems.map((downloadItem: DownloadItem) => {
         const downloadItemElement = document.createElement('span');
         downloadItemElement.innerText = downloadItem.name;

         const removeDownloadItemElement = document.createElement('button');
         removeDownloadItemElement.classList.add('list-icon');
         removeDownloadItemElement.innerHTML = TrashIcon;
         removeDownloadItemElement.dataset['downloadItem'] = JSON.stringify(downloadItem);
         downloadItemElement.appendChild(removeDownloadItemElement);

         return `<li>${downloadItemElement.innerHTML}</li>`;
      }).join('');
      this.downloadItemListContainer.innerHTML = `<ul>${downloadItemsListElement}</ul>`;
   }

   @Listen('click', '#download-toggle-button')
   buttonClicked(event: MouseEvent) {
      if (this.downloadItems && this.downloadItems.length) {
         this.showList = !this.showList;
      } else {
         this.showList = false;
         if (this.preventRedirect){
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
   }

   @Watch('downloadItems')
   downloadItemsChanged() {
      if (this.downloadItems && this.downloadItems.length) {
         this.renderDownloadItems(this.downloadItems);
         this.renderDownloadItemsCounter();
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

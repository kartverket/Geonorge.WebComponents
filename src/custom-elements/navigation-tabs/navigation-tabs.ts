// Dependencies
import {
   Component, CustomElement, CustomElementOptions, Prop, Dispatch, DispatchEmitter,
   Listen, Watch, getElement, getShadowRootElement, Toggle
} from 'super-custom-elements';

// Components
import { NavigationTabHeading } from 'custom-elements/navigation-tabs/navigation-tab-heading/navigation-tab-heading';
import { NavigationTabContent } from 'custom-elements/navigation-tabs/navigation-tab-content/navigation-tab-content';


interface NavigationTabsOptions extends CustomElementOptions {
   active?: boolean,
   onClick?: () => void,
   onSearch?: () => void,
   onOpenEmptyMapItemsList?: () => void,
   onOpenEmptyDownloadItemsList?: () => void
}

interface TabHeadingElement extends HTMLElement {
   selected: boolean
}

interface TabContentElement extends HTMLElement {
   hidden: boolean
}

@Component({
   tag: 'navigation-tabs',
   template: import('./navigation-tabs.html'),
   style: import('./navigation-tabs.scss')
})

export class NavigationTabs extends CustomElement {
   private static readonly elementSelector = 'navigation-tabs';
   private tabHeadingSlot: TabHeadingElement;
   private tabContentSlot: TabContentElement;

   static get observedAttributes() {
      return ['selected'];
   }

   @Prop() id: string;
   @Prop() selectedtab: string;
   @Dispatch('onSearch') onSearch: DispatchEmitter;

   constructor() {
      super();

      // Event handlers that are not attached to this element need to be bound
      // if they need access to `this`.
      this.onSlotChange = this.onSlotChange.bind(this);

      // For progressive enhancement, the markup should alternate between tabs
      // and panels. Elements that reorder their children tend to not work well
      // with frameworks. Instead shadow DOM is used to reorder the elements by
      // using slots.
      // this.attachShadow({ mode: 'open' });

     

   }

   setup(options?: NavigationTabsOptions): void {
      this.connect(options.container);
      if (options.id) {
         this.id = options.id;
      }
   }

   connectedCallback() {
      this.tabHeadingSlot = getShadowRootElement(this, 'slot[name=tab-heading]');
      this.tabContentSlot = getShadowRootElement(this, 'slot[name=tab-content]');

      this.tabHeadingSlot.addEventListener('slotchange', this.onSlotChange);
      this.tabContentSlot.addEventListener('slotchange', this.onSlotChange);


      if (!this.hasAttribute('role')) {
         this.setAttribute('role', 'tablist');
      }

      this.addEventListener('click', this._onClick);


      const navigationTabHeading = new NavigationTabHeading();
      const navigationTabContent = new NavigationTabContent();

      Promise.all([
         customElements.whenDefined('navigation-tab-heading'),
         customElements.whenDefined('navigation-tab-content')
      ]).then(() => {
         this.linkPanels()

      });
   }

   disconnectedCallback() {
      this.removeEventListener('click', this._onClick);
   }

   onSlotChange() {
      this.linkPanels();
   }

   linkPanels() {
      const tabHeadingElements: Array<TabHeadingElement> = this.getTabHeadingElements();
      // Give each panel a `aria-labelledby` attribute that refers to the tab
      // that controls it.
      tabHeadingElements.forEach(tabHeadingElement => {
         const tabContentElement = tabHeadingElement.nextElementSibling;
         if (tabContentElement.tagName.toLowerCase() !== 'navigation-tab-content') {
            console.error(`navigation-tab-heading #${tabHeadingElement.id} is not a` +
               `sibling of a <tab-navigation-content>`);
            return;
         }
         tabHeadingElement.setAttribute('aria-controls', tabContentElement.id);
         tabContentElement.setAttribute('aria-labelledby', tabHeadingElement.id);

         let tabHeadingHtml = document.createElement('div');
         tabHeadingHtml.innerHTML = tabHeadingElement.innerHTML;
         tabHeadingHtml.setAttribute('slot', 'tab-heading');
         tabHeadingElement.innerHTML = '';
         tabHeadingElement.appendChild(tabHeadingHtml);
         
         let tabContentHtml = document.createElement('div');
         tabContentHtml.innerHTML = tabContentElement.innerHTML;
         tabContentHtml.setAttribute('slot', 'tab-content');
         tabContentElement.innerHTML = '';
         tabContentElement.appendChild(tabContentHtml);
      });

      // The element checks if any of the tabs have been marked as selected.
      // If not, the first tab is now selected.
      const selectedTabHeadingElement: TabHeadingElement = tabHeadingElements.find((tabHeadingElement: TabHeadingElement) => {
         return tabHeadingElement.selected
      }) || tabHeadingElements[0];

      // Next, switch to the selected tab. `selectTab()` takes care of
      // marking all other tabs as deselected and hiding all other panels.
      this.setSelectTab(selectedTabHeadingElement);
   }

   setSelectTab(newTabHeading: TabHeadingElement) {
      // Deselect all tabs and hide all panels.
      this.reset();

      // Get the panel that the `newTab` is associated with.
      const newTabContent: TabContentElement = this.getTabContentForTabHeading(newTabHeading);

      // If that panel doesn’t exist, abort.
      if (!newTabContent){
         throw new Error(`No tab-content-element with id ${newTabHeading.getAttribute('aria-controls')}`);
      }
      newTabHeading.selected = true;
      newTabContent.hidden = false;
   }

   getTabHeadingElements() {
      const tabHeadingElements: Array<TabHeadingElement> = Array.from(this.querySelectorAll('navigation-tab-heading'));
      return tabHeadingElements;
   }

   getTabContentElements() {
      const tabContentElements: Array<TabContentElement> = Array.from(this.querySelectorAll('navigation-tab-content'));
      return tabContentElements;
   }

   getTabContentForTabHeading(tabHeadingElement) {
      const tabContentElementId = tabHeadingElement.getAttribute('aria-controls');
      const tabContentElement: TabContentElement = this.querySelector(`#${tabContentElementId}`);
      return tabContentElement;
   }

   reset() {
      const tabHeadingElements: Array<TabHeadingElement> = this.getTabHeadingElements();
      const tabContentElements: Array<TabContentElement> = this.getTabContentElements();

      tabHeadingElements.forEach(tabHeadingElement => tabHeadingElement.selected = false);
      tabContentElements.forEach(tabContentElement => tabContentElement.hidden = true);
   }

   _onClick(event) {
      const clickedTabHeading = event.target.closest('navigation-tab-heading');
      // If the click was not targeted on a tab element itself,
      // it was a click inside the a panel or on empty space. Nothing to do.
      if (!clickedTabHeading || clickedTabHeading.getAttribute('role') !== 'tab'){
         return;
      }
      // If it was on a tab element, though, select that tab.
      this.setSelectTab(clickedTabHeading);
   }




   public static setup(selector: string, options: NavigationTabsOptions) {
      const element = getElement<NavigationTabs>(selector);
   }
}

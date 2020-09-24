import {
   Component, CustomElement, CustomElementOptions, Prop, Dispatch, DispatchEmitter,
   Listen, Watch, getElement, getShadowRootElement
} from 'super-custom-elements';

import { fetchMenuItems } from 'functions/apiHelpers';

interface MainNavigationOptions extends CustomElementOptions {
   active?: boolean,
   onClick?: () => void
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
   private menuButton: HTMLInputElement;

   @Prop() id: string;
   @Prop() showMenu: boolean;
   @Prop() searchString: string;
   @Prop() language: string;
   @Prop() menuItems: Array<MenuItem>;
   @Dispatch('textChanged') onTextChanged: DispatchEmitter;

   constructor() {
      super();
   }

   setup(options?: MainNavigationOptions): void {
      this.connect(options.container);
      if (options.id) {
         this.id = options.id;
      }
   }

   connectedCallback() {
      this.searchField = getShadowRootElement(this, 'input');
      this.menuButton = getShadowRootElement(this, 'button');
      fetchMenuItems(this.language).then(menuItems => {
         this.menuItems = menuItems;
      });
      if (this.searchField) {
         this.searchField.setAttribute('value', this.searchString);
      }
   }

   @Listen('keypress', 'input')
   anchorClicked(event: KeyboardEvent) {
      this.onTextChanged.emit({ detail: event.key });
   }

   @Watch('value')
   valueChanged() {
      if (this.searchField) {
         this.searchField.setAttribute('value', this.searchString)
      }
   }

   renderMenuItems = (menuItems: Array<MenuItem>) => {
      const menuItemsListElement = menuItems.map((menuItem: MenuItem) => {
         const subItems = menuItem.SubMenuItem && menuItem.SubMenuItem.length ? menuItem.SubMenuItem : null;
         const menuItemElement = `<a href="${menuItem.Url}">${menuItem.Name}</a>`;
         const subItemElements = subItems ? this.renderMenuItems(subItems) : '';
         return `<li>${menuItemElement}${subItemElements}</li>`;
      }).join('');
      return `<ul>${menuItemsListElement}</ul>`;
   }

   @Watch('menuItems')
   menuItemsChanged() {
      if (this.menuItems && this.menuItems.length) {
         const template = document.createElement('template');
         template.innerHTML = this.renderMenuItems(this.menuItems);
         const div = getShadowRootElement(this, '#menu-container');
         div.appendChild(template.content.cloneNode(true));
      }
   }

   public static setup(selector: string, options: MainNavigationOptions) {
      const element = getElement<MainNavigation>(selector);

      if (options.onClick) {
         element.addEventListener('menuButtonClick', options.onClick);
      }
      if (options.active) {
         element.showMenu = options.active;
      }
   }
}

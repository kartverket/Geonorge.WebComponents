import { Component, CustomElement, CustomElementOptions, Prop, Dispatch, DispatchEmitter, 
    Listen, Watch, getElement, getShadowRootElement } from 'super-custom-elements';

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
     @Prop() public data: Promise<any>;
     @Prop() language: string;
     @Prop() menuItems: Array<MenuItem>;
     @Dispatch('textChanged') onTextChanged: DispatchEmitter;
  
     constructor() {
        super();
        console.log("constructor");
        //https://www.test.geonorge.no/api/menu?omitLinks=1
     }
  
     setup(options?: MainNavigationOptions): void {
        this.connect(options.container);
        if (options.id) {
           this.id = options.id;
        }
       /* if (options.value) {
           this.showMenu = options.showMenu;
        }
        if (options.onTextChanged) {
           this.addEventListener('textChanged', options.onTextChanged);
        }
        if (options.data) {
           this.data = options.data;
        }*/
     }


  
     connectedCallback() {
         this.searchField = getShadowRootElement(this, 'input');
        
         console.log(this.language);
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
      if (this.searchField){
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
        if (this.menuItems && this.menuItems.length){
           console.log("hoy", this.menuItems);
           const template = document.createElement('template');
           const li = this.menuItems.map((menuItem) => `<li><a href="${menuItem.Url}">${menuItem.Name}</a></li>`).join('');
           //template.innerHTML = `<ul>${li}</ul>`;
           template.innerHTML = this.renderMenuItems(this.menuItems);

           this.menuItems.map(menuItem => {
              

           })
     
           const div = getShadowRootElement(this, 'div');
           div.appendChild(template.content.cloneNode(true));
   
        }
     }
  
     @Watch('data')
     async loadData() {
        if (this.data === null) {
           return;
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
  
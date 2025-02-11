import {
    Component, CustomElement, CustomElementOptions, Prop, Dispatch, DispatchEmitter,
    Listen, Watch, getElement, getShadowRootElement, Toggle
 } from 'super-custom-elements';
 import { getFocusableElementsInsideElement } from '../../../functions/guiHelpers';

 // Assets
import UserAccountIcon from '../../../assets/svg/login-user-account.svg';

interface UserAccountOptions extends CustomElementOptions {
   active?: boolean
}

@Component({
   tag: 'user-account',
   template: import('./user-account.html'),
   style: import('./user-account.scss')
})

export class UserAccount extends CustomElement {
    private static readonly elementSelector = 'user-account';
    private userAccountButton: HTMLButtonElement;
    private userAccountIcon: HTMLElement;
    private userAccountListContainer: HTMLDivElement;
 
    @Prop() id: string;
    @Prop() environment: string;
    @Prop() language: string;
    @Toggle() showList: boolean;
    @Toggle() isloggedin: boolean;
 
    constructor() {
       super();
       this.clickOutsideUserAccountItemsContainer = this.clickOutsideUserAccountItemsContainer.bind(this);
       this.updateDomElements = this.updateDomElements.bind(this);    
       this.getUpdatedUserAccount = this.getUpdatedUserAccount.bind(this);   

    }
 
    setup(options?: UserAccountOptions): void {
       this.connect(options.container);
       if (options.id) {
          this.id = options.id;
       }
    }
 
    connectedCallback() {
       this.userAccountButton = getShadowRootElement(this, '#user-account-button');
       this.userAccountIcon = getShadowRootElement(this, '#user-account-toggle-button-icon');
       this.userAccountListContainer = getShadowRootElement(this, '#user-account-item-list-container');
       this.getUpdatedUserAccount()
       this.userAccountIcon.innerHTML = UserAccountIcon;
       
 
       document.addEventListener('click', this.clickOutsideUserAccountItemsContainer);
       document.addEventListener('mapItemsChanged', this.updateDomElements);
    }
 
 
 
    disconnectedCallback() {
       document.removeEventListener('click', this.clickOutsideUserAccountItemsContainer);
    }
 
    hideListContainer = () => {
       this.showList = false;
    }
 
    clickOutsideUserAccountItemsContainer(event: MouseEvent) {
       const targetElement = event.composedPath()[0] as Element;
       if (targetElement.closest('#user-account-item-list-container') || targetElement.closest('#user-account-toggle-button')) return
       this.hideListContainer();
    }
 
    updateDomElements() {
        this.getUpdatedUserAccount();       
     }
     getUpdatedUserAccount() {
        // this.userAccountItems = getUserAccountItems();
     }
    renderUserAccountItems = (userAccountItems: UserAccount) => {
     
          return "hello items"
    }
 
    @Listen('click', '#user-account-toggle-button')
    buttonClicked(event: MouseEvent) {
 
      return null
    }
 
    @Watch('showlist')
    showMenuChanged() {
       this.showList ? this.userAccountListContainer.classList.add('open') : this.userAccountListContainer.classList.remove('open');
       this.showList ? this.userAccountButton.classList.add('open') : this.userAccountButton.classList.remove('open');
       const accountItemListContainerButtons = getFocusableElementsInsideElement(this.userAccountListContainer);
       accountItemListContainerButtons.forEach(button => {
          if (!this.showList){
             button.setAttribute('tabindex', '-1');
          } else {
             button.removeAttribute('tabindex');
          }
       });
    }

    
 
    @Watch('isloggedin')
    isLoggedInChanged() {
        if (this.isloggedin) {
            this.renderUserAccountItems(null);
        } 
    }
 
    @Watch('language')
    languageChanged() {
        if (this.isloggedin) {
            this.renderUserAccountItems(null);
        }
    }
 
 
    public static setup(selector: string, options: UserAccountOptions) {
       const element = getElement<UserAccount>(selector);
       if (options.active) {
          element.showList = options.active;
       }
    }
 }
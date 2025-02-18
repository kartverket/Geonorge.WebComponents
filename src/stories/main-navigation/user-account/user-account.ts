import {
  Component,
  CustomElement,
  CustomElementOptions,
  Prop,
  Dispatch,
  DispatchEmitter,
  Listen,
  Watch,
  getElement,
  getShadowRootElement,
  Toggle,
} from "super-custom-elements";
import { getFocusableElementsInsideElement } from "../../../functions/guiHelpers";

// Assets
import UserAccountIcon from "../../../assets/svg/login.svg";
import CloseAccountIcon from '../../../assets/svg/close-icon-white.svg';

interface UserAccountOptions extends CustomElementOptions {
  active?: boolean;
  onClick?: () => void,
  onSignInClick?: () => void,
  onSignOutClick?: () => void,
  onNorwegianLanguageSelect?: () => void,
  onEnglishLanguageSelect?: () => void

}
interface MenuItem extends Object {
  Name: string,
  SubMenuItem: Array<MenuItem>,
  Url: string
}
@Component({
  tag: "user-account",
  template: import("./user-account.html"),
  style: import("./user-account.scss"),
})
export class UserAccount extends CustomElement {
  private static readonly elementSelector = "user-account";
  private userAccountButton: HTMLButtonElement;
  private userAccountTitle: HTMLElement;
  private userAccountIcon: HTMLElement;
  private closeAccountIcon: HTMLSpanElement;
  private userAccountListContainer: HTMLDivElement;
  private menuActionsRow: HTMLElement;

  @Prop() id: string;
  @Prop() environment: string;
  @Prop() language: string;
  @Toggle() showList: boolean;
  @Toggle() isloggedin: boolean;
  @Toggle() showmenu: boolean;
  @Dispatch('onSignInClick') onSignInClick: DispatchEmitter;
  @Dispatch('onSignOutClick') onSignOutClick: DispatchEmitter;
  @Dispatch('onNorwegianLanguageSelect') onNorwegianLanguageSelect: DispatchEmitter;
  @Dispatch('onEnglishLanguageSelect') onEnglishLanguageSelect: DispatchEmitter;

  constructor() {
    super();
    
    this.clickOutsideUserAccountItemsContainer =
      this.clickOutsideUserAccountItemsContainer.bind(this);
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
    this.userAccountButton = getShadowRootElement(this, "#user-account-button");
    this.userAccountTitle = getShadowRootElement(this, '#user-account-text');
    this.userAccountIcon = getShadowRootElement(this,"#menu-user-icon");
    this.closeAccountIcon = getShadowRootElement(this, '#close-user-icon');
    this.menuActionsRow = getShadowRootElement(this, '#user-account-list-container');
    this.userAccountListContainer = getShadowRootElement(this,"#user-account-item-list-container");
    this.getUpdatedUserAccount();
    this.userAccountIcon.innerHTML = UserAccountIcon;
    this.closeAccountIcon.innerHTML = CloseAccountIcon;

    this.showmenu ? this.userAccountIcon.classList.add('hidden') : this.closeAccountIcon.classList.add('hidden');

    this.userAccountButton.setAttribute('aria-label', this.language === 'en' ? 'Log in to edit content' : 'Logg inn for å redigere innhold');
    
    if (this.userAccountTitle) {
      this.userAccountTitle.innerText = this.language === 'en' ? 'Log in' : 'Logg inn';
  }

    document.addEventListener(
      "click",
      this.clickOutsideUserAccountItemsContainer
    );
    document.addEventListener("mapItemsChanged", this.updateDomElements);
  }

  disconnectedCallback() {
    document.removeEventListener(
      "click",
      this.clickOutsideUserAccountItemsContainer
    );
  }

  hideListContainer = () => {
    this.showList = false;
  };

  clickOutsideUserAccountItemsContainer(event: MouseEvent) {
    const targetElement = event.composedPath()[0] as Element;
    if (
      targetElement.closest("#user-account-item-list-container") ||
      targetElement.closest("#user-account-toggle-button")
    )
      return;
    this.hideListContainer();
  }

  updateDomElements() {
    this.getUpdatedUserAccount();
  }
  getUpdatedUserAccount() {
    // this.userAccountItems = getUserAccountItems();
  }
  renderUserAccountItems = (userAccountItems: UserAccount) => {
    return "hello items";
  };

  @Listen("click", "#user-account-toggle-button")
  buttonClicked(event: MouseEvent) {
    return null;
  }
  hideMenuContainer = () => {
   this.showmenu = false;
}
  @Watch("showlist")
  showMenuChanged() {
    this.showmenu ? this.userAccountListContainer.classList.add("open") : this.userAccountListContainer.classList.remove("open");
    this.showmenu ? this.userAccountButton.classList.add("open") : this.userAccountButton.classList.remove("open");
    this.showmenu ? this.userAccountIcon.classList.add('hidden') : this.userAccountIcon.classList.remove('hidden');
    this.showmenu ? this.closeAccountIcon.classList.remove('hidden') : this.closeAccountIcon.classList.add('hidden');
    const accountItemListContainerButtons = getFocusableElementsInsideElement( this.userAccountListContainer);
    accountItemListContainerButtons.forEach((button) => {
      if (!this.showList) {
        button.setAttribute("tabindex", "-1");
      } else {
        button.removeAttribute("tabindex");
      }
    });
  }
  
  @Watch("isloggedin")
  isLoggedInChanged() {
    if (this.isloggedin) {
      this.renderUserAccountItems(null);
    }
  }  
  @Watch("language")
  languageChanged() { 
    debugger;
    console.log(`Language changed to: ${this.language}`);
    if (this.isloggedin) {
     
      this.renderUserAccountItems(null);
    }
    
    if (this.userAccountTitle) {
      this.userAccountTitle.innerText = this.language === 'en' ? 'Log in' : 'Logg inn';
  }
   
    this.userAccountButton.setAttribute('aria-label', this.language === 'en' ? 'Log in to edit content' : 'Logg inn for å redigere innhold');
  }

  public static setup(selector: string, options: UserAccountOptions) {
    const element = getElement<UserAccount>(selector);
    if (options.active) {
      element.showList = options.active;
    }
  }
}

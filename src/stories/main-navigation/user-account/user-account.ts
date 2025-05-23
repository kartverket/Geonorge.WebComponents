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

// Assets
import UserAccountIcon from "../../../assets/svg/logout.svg";
import LoginIcon from '../../../assets/svg/login.svg';
import CloseAccountIcon from '../../../assets/svg/person.svg';
import { getMinsideUrl } from "../../../functions/urlHelpers";


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
  private userAccountContent: HTMLButtonElement;
  private userAccountItems: HTMLDivElement;
  private userAccountListContainer: HTMLDivElement;
  

  @Prop() id: string;
  @Prop() environment: string;
  @Prop() language: string;
  @Prop() signinurl: string;
  @Prop() signouturl: string;
  @Prop() organization: string
  @Prop() userinfo: string;
  @Toggle() isloggedin: boolean;
  @Toggle() showmenu: boolean;
  @Toggle() hasAuthenticationFunction: boolean;
  @Dispatch('onSignInClick') onSignInClick: DispatchEmitter;
  @Dispatch('onSignOutClick') onSignOutClick: DispatchEmitter;
  @Dispatch('onNorwegianLanguageSelect') onNorwegianLanguageSelect: DispatchEmitter;
  @Dispatch('onEnglishLanguageSelect') onEnglishLanguageSelect: DispatchEmitter;

  constructor() {
    super();
    
    this.clickOutsideUserAccountItemsContainer =
      this.clickOutsideUserAccountItemsContainer.bind(this);   
  }
  
  setup(options?: UserAccountOptions): void {
    this.connect(options.container);
    if (options.id) {
      this.id = options.id;
    }
  }
 
  connectedCallback() {
    this.userAccountContent = getShadowRootElement(this, "#user-account-container");
    this.userAccountItems = getShadowRootElement(this, "#user-account-menu-wrapper");   
    this.userAccountListContainer = getShadowRootElement(this, "#user-account-list-container"); 
  
  const hasAuthenticationUrls = this.signinurl && this.signouturl;


  if (hasAuthenticationUrls || this.shouldShowAuthenticationButton()) { 
      this.renderLoginButton();
  }
    document.addEventListener(
      "click",
      this.clickOutsideUserAccountItemsContainer
    );    
  }
  shouldShowAuthenticationButton() {
    return this.hasAuthenticationFunction?.toString() === "" || this.hasAuthenticationFunction?.toString() === "true";
}
  disconnectedCallback() {
    document.removeEventListener(
      "click",
      this.clickOutsideUserAccountItemsContainer
    );
  }

  hideListContainer = () => {
    this.showmenu = false;
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

  renderLoginButton() {
    this.userAccountContent.innerHTML = "";    
    const loginIcon = document.createElement("span");
    loginIcon.classList.add("menu-user-icon");
    loginIcon.innerHTML = LoginIcon;

    const loginbutton = document.createElement("span");    
    loginbutton.innerText = this.language === "en" ? "Sign in" : "Logg inn";

    this.userAccountContent.append(loginIcon, loginbutton);
}

renderLogoutButton() {
  this.userAccountContent.innerHTML = "";

  const mypageContainer = document.createElement("div");
  mypageContainer.id = "user-account-toggle-button";
  mypageContainer.classList.add("user-account-button");
  const mypagebutton = document.createElement("span");
  let username = JSON.parse(this.userinfo)?.name; 
  if (username && username.length > 10) {
    username = username.substring(0, 8) + '...';
  }
  mypagebutton.innerText = username;

  const mypageicon = document.createElement("span");
  mypageicon.classList.add("close-user-icon");
  mypageicon.innerHTML = CloseAccountIcon;
  mypageContainer.appendChild(mypageicon);
  mypageContainer.appendChild(mypagebutton);
  this.userAccountContent.append(mypageContainer);
}

renderUserButton() {
  const hasAuthenticationUrls = this.signinurl && this.signouturl;
  if(hasAuthenticationUrls || this.shouldShowAuthenticationButton()) { 
    this.isloggedin ? this.renderLogoutButton() : this.renderLoginButton();
  }
}


renderUserAccountItems() {
  const hasAuthenticationUrls = this.signinurl && this.signouturl;
    if (this.isloggedin || hasAuthenticationUrls || this.shouldShowAuthenticationButton()) {
        this.userAccountItems.innerHTML = ""; 

        const userAccountListContainer = document.createElement("div");
        const userInfoContainer = document.createElement("div");
        const userAccountListTitle = document.createElement("span");
        userAccountListTitle.innerText = this.language === "en" ? "User account" : "Pålogget som:";
        userInfoContainer.appendChild(userAccountListTitle);
        const userNameSpan = document.createElement("strong");
        const username = JSON.parse(this.userinfo)?.name;  
        userNameSpan.innerText = username;
        userInfoContainer.appendChild(userNameSpan);

         // Create and append email
        // const userEpostSpan = document.createElement("div");
        // const email = JSON.parse(this.userinfo)?.email;  
        // userEpostSpan.innerText = email;
        // userInfoContainer.appendChild(userEpostSpan);

        userAccountListContainer.appendChild(userInfoContainer);
        const userAccountListItems = document.createElement("ul");
        
        const createListItem = (text: string) => {
          const listItem = document.createElement("li");
          const anchor = document.createElement("a");
          anchor.innerText = text;
          anchor.href = getMinsideUrl(this.environment);
          listItem.appendChild(anchor);
          return listItem;
      };   
        userAccountListItems.appendChild(createListItem(this.language === "en" ? "My page" : "Min side"));
        //userAccountListItems.appendChild(createListItem(this.language === "en" ? "My shortcuts" : "Mine snarveier"));
        //userAccountListItems.appendChild(createListItem(this.language === "en" ? "Settings" : "Innstillinger"));

        userAccountListContainer.appendChild(userAccountListItems);


        //const kartverketBlock = document.createElement("div");        


       // const presentsSpan = document.createElement("span");
       // presentsSpan.innerText = this.language === "en" ? "Presents" : "Representerer";
       // kartverketBlock.appendChild(presentsSpan);

       // const companyNameSpan = document.createElement("strong");
       // const orgname = JSON.parse(this.organization)?.organizationName;        
       // companyNameSpan.innerText = orgname; // Replace with actual company name if available
       // kartverketBlock.appendChild(companyNameSpan);

       // const orgNumberSpan = document.createElement("span");
       // const orgnumber = JSON.parse(this.organization)?.organizationNumber;        
       // orgNumberSpan.innerText = "orgnr: " + orgnumber; // Replace with actual org number if available
        //kartverketBlock.appendChild(orgNumberSpan);

        // const changeOrgLink = document.createElement("a");
        // changeOrgLink.innerText = this.language === "en" ? "Change organization" : "Endre organisasjon";
        // changeOrgLink.href = this.signouturl;
        // kartverketBlock.appendChild(changeOrgLink);

        // Add some spacing for layout
        //kartverketBlock.style.marginTop = "10px";
        //kartverketBlock.style.display = "flex";
        //kartverketBlock.style.flexDirection = "column";
        //kartverketBlock.style.gap = "5px"; // Adds spacing between spans

        //userAccountListContainer.appendChild(kartverketBlock);

        const logOutBlock = document.createElement("div");
        logOutBlock.style.marginTop = "10px"; // Add spacing
        const loginIcon = document.createElement("span");
        loginIcon.classList.add("menu-user-icon");
        loginIcon.innerHTML = UserAccountIcon;
        const logOutLink = document.createElement("a");
        logOutLink.setAttribute("role", "button");
        logOutLink.href = "#";
        const logOutText = document.createElement("span");
        logOutText.innerText = this.language === "en" ? "Log out" : "Logg ut";
        logOutLink.appendChild(loginIcon);   
        logOutLink.appendChild(logOutText);
       if (this.shouldShowAuthenticationButton()) {
        logOutLink.onclick = (event) => {
          event.preventDefault(); 
          this.onSignOutClick.emit();
        };
      } else {
        logOutLink.href = this.signouturl;
      }
        
        logOutBlock.appendChild(logOutLink);
        
        userAccountListContainer.appendChild(logOutBlock);

        this.userAccountItems.appendChild(userAccountListContainer);
    } else {
        this.userAccountItems.innerHTML = "";
    }
}

@Listen('click', '#user-account-container')
buttonClicked(event: MouseEvent) {
  if (this.isloggedin) {
    this.showmenu = !this.showmenu;
    this.showmenu ? this.userAccountItems?.classList.add("open") : this.userAccountItems?.classList.remove("open");
    this.showmenu ? this.userAccountListContainer?.classList.add("open") : this.userAccountListContainer?.classList.remove("open");

  } else {
    if(this.shouldShowAuthenticationButton()) {
      this.onSignInClick.emit();
    } else {    
      window.location.href = this.signinurl;
    }
  }

    
    } 

  @Watch("showmenu")  
  showMenuChanged() {      
    this.showmenu ? this.userAccountItems?.classList.add("open") : this.userAccountItems?.classList.remove("open");   
    // legg også til for å endre knappen       
  }


  @Watch('hasauthenticationfunction')
  hasAuthenticationFunctionChanged() {
          this.renderUserButton();
          this.renderUserAccountItems();
  }
  
  @Watch("isloggedin")
  isLoggedInChanged() {    
      this.renderUserButton();
      this.renderUserAccountItems();              
  }  

  @Watch("language")
  languageChanged() {        
      this.renderUserButton();
      this.renderUserAccountItems();    
  }

  @Watch("organization")
  organizationChanged() {
      this.renderUserButton();
      this.renderUserAccountItems();
    }
  @Watch("userinfo")
  userInfoChanged() {
    this.renderUserButton();
    this.renderUserAccountItems();
  }

  public static setup(selector: string, options: UserAccountOptions) {
    const element = getElement<UserAccount>(selector);
    if (options.active) {
      element.showmenu = options.active;
    }
  }
}

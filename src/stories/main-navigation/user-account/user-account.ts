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
import CloseAccountIcon from '../../../assets/svg/person.svg';


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

  if (hasAuthenticationUrls) {
    
      this.renderLoginButton();
  }
    document.addEventListener(
      "click",
      this.clickOutsideUserAccountItemsContainer
    );    
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
    loginIcon.innerHTML = UserAccountIcon;
    const loginbutton = document.createElement("span");    
    loginbutton.innerText = this.language === "en" ?  "Sign in" : "Logg inn";
    loginbutton.appendChild(loginIcon);    
    this.userAccountContent.append(loginbutton); 
 }

renderLogoutButton() {
  
  this.userAccountContent.innerHTML = "";
  const mypageicon = document.createElement("span");
  mypageicon.classList.add("close-user-icon");
  mypageicon.innerHTML = CloseAccountIcon;
  const mypagebutton = document.createElement("span");
  mypagebutton.id = "user-account-toggle-button";
  mypagebutton.innerText = this.language === "en" ?  "My page" : "Min side";
  mypagebutton.appendChild(mypageicon);
  this.userAccountContent.append(mypagebutton);
}

renderUserButton() {
  this.isloggedin ? this.renderLogoutButton() : this.renderLoginButton();
}


renderUserAccountItems() {
    if (this.isloggedin) {
        this.userAccountItems.innerHTML = ""; // Clear previous content

        // Create main container
        const userAccountListContainer = document.createElement("div");

        // ✅ Wrap title and username in a div
        const userInfoContainer = document.createElement("div");

        // Create and append title
        const userAccountListTitle = document.createElement("span");
        userAccountListTitle.innerText = this.language === "en" ? "User account" : "Pålogget som:";
        userInfoContainer.appendChild(userAccountListTitle);

        // Create and append username
        const userNameSpan = document.createElement("strong");
        const username = JSON.parse(this.userinfo)?.name;  
        userNameSpan.innerText = username;
        userInfoContainer.appendChild(userNameSpan);

         // Create and append email
        // const userEpostSpan = document.createElement("div");
        // const email = JSON.parse(this.userinfo)?.email;  
        // userEpostSpan.innerText = email;
        // userInfoContainer.appendChild(userEpostSpan);

        // Append user info container to main container
        userAccountListContainer.appendChild(userInfoContainer);

        // Create and append list
        const userAccountListItems = document.createElement("ul");

        // Helper function to create list items with anchor
        const createListItem = (text, href = "#") => {
            const listItem = document.createElement("li");
            const anchor = document.createElement("a");
            anchor.innerText = text;
            anchor.href = href;
            listItem.appendChild(anchor);
            return listItem;
        };

        // Add list items        
        userAccountListItems.appendChild(createListItem(this.language === "en" ? "My shortcuts" : "Mine side"));
        //userAccountListItems.appendChild(createListItem(this.language === "en" ? "My shortcuts" : "Mine snarveier"));
        //userAccountListItems.appendChild(createListItem(this.language === "en" ? "Settings" : "Innstillinger"));

        // Append list to container
        userAccountListContainer.appendChild(userAccountListItems);

        // ✅ Add "Kartverket" block
        //const kartverketBlock = document.createElement("div");        

        // ✅ Add 4 new spans
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

        // ✅ Add log out block
        const logOutBlock = document.createElement("div");
        logOutBlock.style.marginTop = "10px"; // Add spacing
        const loginIcon = document.createElement("span");
        loginIcon.classList.add("menu-user-icon");
        loginIcon.innerHTML = UserAccountIcon;
        const logOutLink = document.createElement("a");
        logOutLink.innerText = this.language === "en" ? "Log out" : "Logg ut";
        logOutLink.appendChild(loginIcon);  
        logOutLink.href = this.signouturl; // Replace with actual logout URL or function
        logOutBlock.appendChild(logOutLink);
        

        userAccountListContainer.appendChild(logOutBlock);

        // ✅ Append container to `this.userAccountItems`
        this.userAccountItems.appendChild(userAccountListContainer);
    } else {
        this.userAccountItems.innerHTML = ""; // Clear if logged out
    }
}

@Listen('click', '#user-account-container')
buttonClicked(event: MouseEvent) {
  if (this.isloggedin) {
    this.showmenu = !this.showmenu;
    this.showmenu ? this.userAccountItems?.classList.add("open") : this.userAccountItems?.classList.remove("open");
    this.showmenu ? this.userAccountListContainer?.classList.add("open") : this.userAccountListContainer?.classList.remove("open");

  } else {
    window.location.href = this.signinurl;
  }

    
    } 

  @Watch("showmenu")  
  showMenuChanged() {      
    this.showmenu ? this.userAccountItems?.classList.add("open") : this.userAccountItems?.classList.remove("open");   
    // legg også til for å endre knappen       
  }


  @Watch('hasauthenticationfunction')
  hasAuthenticationFunctionChanged() {
      if (this.hasAuthenticationFunction) {
          this.renderUserButton();
          this.renderUserAccountItems();
      }
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

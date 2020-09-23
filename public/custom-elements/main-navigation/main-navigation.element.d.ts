import { CustomElement, CustomElementOptions, DispatchEmitter } from 'super-custom-elements';
interface MainNavigationOptions extends CustomElementOptions {
    active?: boolean;
    onClick?: () => void;
}
interface MenuItem extends Object {
    Name: string;
    SubMenuItem: Array<MenuItem>;
    Url: string;
}
export declare class MainNavigation extends CustomElement {
    private static readonly elementSelector;
    private searchField;
    private menuButton;
    id: string;
    showMenu: boolean;
    searchString: string;
    data: Promise<any>;
    language: string;
    menuItems: Array<MenuItem>;
    onTextChanged: DispatchEmitter;
    constructor();
    setup(options?: MainNavigationOptions): void;
    connectedCallback(): void;
    anchorClicked(event: KeyboardEvent): void;
    valueChanged(): void;
    renderMenuItems: (menuItems: Array<MenuItem>) => any;
    menuItemsChanged(): void;
    loadData(): Promise<void>;
    static setup(selector: string, options: MainNavigationOptions): void;
}
export {};

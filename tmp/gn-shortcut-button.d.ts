import { CustomElement, CustomElementOptions } from "super-custom-elements";
interface GnShortcutButtonOptions extends CustomElementOptions {
    getAuthToken?: Function;
}
export declare class GnShortcutButton extends CustomElement {
    private shortcutButton;
    private addShortcutDialogElement;
    private removeShortcutDialogElement;
    private saveShortcutButtonElement;
    private removeShortcutButtonElement;
    private cancelAddShortcutButtonElement;
    private cancelRemoveShortcutButtonElement;
    private shortcutNameInputElement;
    id: string;
    language: string;
    environment: string;
    token: string;
    getAuthToken: Function;
    shortcutName: string;
    constructor();
    setup(options?: GnShortcutButtonOptions): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    getShortcutItem(environment: string, token: string): Promise<any>;
    saveShortcut(token: string): void;
    removeShortcut(token: string): void;
    openDialog(shortcutIsAdded: boolean): void;
    closeDialog(): void;
    renderShortcutButton(shortcutIsAdded: boolean): HTMLButtonElement;
    replaceShortcutButton(shortcutIsAdded: boolean): void;
    appendShortcutButtonAfterFirstHeading(shortcutIsAdded: boolean): void;
    initShortcutNameInput(): void;
    tokenChanged(): Promise<void>;
    static setup(selector: string, options: GnShortcutButtonOptions): void;
}
export {};

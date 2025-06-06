import { CustomElement, CustomElementOptions } from "super-custom-elements";
interface GnButtonOptions extends CustomElementOptions {
}
export declare class GnButton extends CustomElement {
    color: string;
    private slotEl;
    constructor();
    setup(options?: GnButtonOptions): void;
    onColorChange(): void;
    private applyColorClass;
    private handleMouseEnter;
    private handleMouseLeave;
}
export {};

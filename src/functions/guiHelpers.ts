import fonts from "../style/base/_fonts.scss";

export const getFocusableElementsInsideElement = (element: HTMLElement) => {
    return element.querySelectorAll('button, [href], input, [tabindex="0"]');
};

export const addGlobalStylesheet = (styleElementId: string, styles: string) => {
    const style = document.createElement("style");
    style.setAttribute("id", styleElementId);
    style.textContent = styles;
    if (!document.getElementById(styleElementId)) {
        document.head.appendChild(style);
    }
};

export const addGlobalFonts = () => {
    const style = document.createElement("style");
    style.setAttribute("id", "fonts-styles");
    style.textContent = fonts;
    if (!document.getElementById("fonts-styles")) {
        document.head.appendChild(style);
    }
};

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

export const removeInnerHTML = (element: HTMLElement) => {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
};

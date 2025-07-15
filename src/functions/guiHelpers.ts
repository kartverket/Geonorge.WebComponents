export const getFocusableElementsInsideElement = (element: HTMLElement) => {
    return element.querySelectorAll('button, [href], input, [tabindex="0"]');
};

export const getDocumentHeading = () => {
    let documentHeading = document.querySelector("heading-text") as HTMLElement | null; // This assumes that the heading is wrapped in a custom element called "heading-text"
    if (!documentHeading) {
        documentHeading = document.querySelector("h1:not(.sb-nopreview_heading.sb-heading)") as HTMLElement | null; // Exclude the heading used by Storybook
    }
    return documentHeading;
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
        if (element.contains(element.firstChild)) {
            element.removeChild(element.firstChild);
        } else {
            // If not a child, break to avoid infinite loop
            break;
        }
    }
};

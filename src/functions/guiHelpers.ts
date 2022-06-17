export const getFocusableElementsInsideElement = (element) => {
    return element.querySelectorAll('button, [href], input, [tabindex="0"]');
};

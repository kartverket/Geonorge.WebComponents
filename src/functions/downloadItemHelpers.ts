export const getDownloadItems = () => {
    return localStorage.orderItems && Array.isArray(JSON.parse(localStorage.orderItems))
        ? JSON.parse(localStorage.orderItems)
        : [];
}

export const getDownloadItemMetadata = (itemUuid: string) => {
    return localStorage[itemUuid + '.metadata']
        ? JSON.parse(localStorage[itemUuid + '.metadata'])
        : null;
}
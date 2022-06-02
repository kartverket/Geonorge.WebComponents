// Functions
import { getCookie } from 'functions/cookieHelpers';

export const getDownloadItems = () => {
  return localStorage.orderItems && Array.isArray(JSON.parse(localStorage.orderItems))
    ? JSON.parse(localStorage.orderItems).filter(mapItem => {return mapItem})
    : [];
}

export const getDownloadItemsCount = () => {
  const isKartkatalog = window.location.hostname.toLowerCase().indexOf('kartkatalog') !== -1;
  const isLocalKartkatalogEnvironment = window.sessionStorage.isLocalKartkatalogEnvironment;
  if (isKartkatalog || isLocalKartkatalogEnvironment) {
    return getDownloadItems().length;
  } else {
    const downloadItemsCount = parseInt(getCookie('orderItems'));
    return downloadItemsCount && !isNaN(downloadItemsCount) ? downloadItemsCount : 0;
  }
}

export const getDownloadItemMetadata = (itemUuid: string) => {
  return localStorage[itemUuid + '.metadata']
    ? JSON.parse(localStorage[itemUuid + '.metadata'])
    : null;
}

export const removeDownloadItem = (itemToRemove) => {
  let selectedItems = localStorage.orderItems && Array.isArray(JSON.parse(localStorage.orderItems))
    ? JSON.parse(localStorage.orderItems)
    : [];
  localStorage.orderItems = JSON.stringify(selectedItems.filter(itemToKeep => itemToKeep !== itemToRemove.uuid));
  localStorage.removeItem(itemToRemove.uuid + ".metadata")
}

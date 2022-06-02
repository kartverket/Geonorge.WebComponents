// Functions
import { getCookie } from 'functions/cookieHelpers';

export const getMapItems = () => {
  return localStorage.mapItems && Array.isArray(JSON.parse(localStorage.mapItems))
    ? JSON.parse(localStorage.mapItems).filter(mapItem => {return mapItem})
    : [];
}

export const getMapItemsCount = () => {
  const isKartkatalog = window.location.hostname.toLowerCase().indexOf('kartkatalog') !== -1;
  const isLocalKartkatalogEnvironment = window.sessionStorage.isLocalKartkatalogEnvironment;
  if (isKartkatalog || isLocalKartkatalogEnvironment) {
    return getMapItems().length;
  } else {
    const mapItemsCount = parseInt(getCookie('mapItems'));
    return mapItemsCount && !isNaN(mapItemsCount) ? mapItemsCount : 0;
  }
}

export const removeMapItem = (itemToRemove) => {
  let selectedItems = localStorage.mapItems && Array.isArray(JSON.parse(localStorage.mapItems))
    ? JSON.parse(localStorage.mapItems)
    : [];
  localStorage.mapItems = JSON.stringify(selectedItems.filter(itemToKeep => itemToKeep.Uuid !== itemToRemove.Uuid));
}

// Functions
import { getCookie } from 'functions/cookieHelpers';

export const getMapItems = () => {
  return localStorage.mapItems && Array.isArray(JSON.parse(localStorage.mapItems))
    ? JSON.parse(localStorage.mapItems)
    : [];
}

export const getMapItemsCount = () => {
  const isKartkatalog = window.location.hostname.toLowerCase().indexOf('kartkatalog') !== -1;
  if (isKartkatalog) {
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


  /*const tagData = {
    name: itemToRemove.name,
    uuid: itemToRemove.uuid,
    accessIsOpendata: itemToRemove.accessIsOpendata,
    accessIsRestricted: itemToRemove.accessIsRestricted,
    organizationName: itemToRemove.organizationName,
    theme: itemToRemove.theme
  };*/
}

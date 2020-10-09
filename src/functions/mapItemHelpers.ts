export const getMapItems = () => {
    return localStorage.mapItems && Array.isArray(JSON.parse(localStorage.mapItems))
        ? JSON.parse(localStorage.mapItems)
        : [];
}

export const getMapItemMetadata = (itemUuid: string) => {
    return localStorage[itemUuid + '.mapItem.metadata']
        ? JSON.parse(localStorage[itemUuid + '.mapItem.metadata'])
        : null;
}

export const removeMapItem = (itemToRemove) => {
    let selectedItems = localStorage.mapItems && Array.isArray(JSON.parse(localStorage.mapItems))
      ? JSON.parse(localStorage.mapItems)
      : [];
    localStorage.mapItems = JSON.stringify(selectedItems.filter(itemToKeep => itemToKeep !== itemToRemove.uuid));
    localStorage.removeItem(itemToRemove.uuid + ".mapItem.metadata")


    /*const tagData = {
      name: itemToRemove.name,
      uuid: itemToRemove.uuid,
      accessIsOpendata: itemToRemove.accessIsOpendata,
      accessIsRestricted: itemToRemove.accessIsRestricted,
      organizationName: itemToRemove.organizationName,
      theme: itemToRemove.theme
    };*/
  }
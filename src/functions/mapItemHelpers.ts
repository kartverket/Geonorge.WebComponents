export const getMapItems = () => {
    return localStorage.mapItems && Array.isArray(JSON.parse(localStorage.mapItems))
        ? JSON.parse(localStorage.mapItems)
        : [];
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
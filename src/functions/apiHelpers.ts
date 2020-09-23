export const fetchMenuItems = (language: string) => {
    const apiUrl = `https://www.test.geonorge.no/api/menu?omitLinks=1`;
    return fetch(apiUrl).then(res => res.json()).then(menuItems => {
        console.log("menuItems", menuItems);
        return menuItems;
    
    });
    
}
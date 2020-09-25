export const getKartkatalogApiUrl = (environment: string) => {
    const environmentSlug = environment === 'dev' || environment === 'test' ? environment + '.' : '';
    return `https://kartkatalog.${environmentSlug}geonorge.no/api`;
};

export const getGeonorgeMenuUrl = (language: string, environment: string) => {
    const environmentSlug = environment === 'dev' || environment === 'test' ? 'test.' : '';
    const selectedLanguageSlug = language === 'en' ? 'en/' : '';
    return `https://www.${environmentSlug}geonorge.no/${selectedLanguageSlug}api/menu?omitLinks=1`;
};

export const fetchMenuItems = (language: string = "no", environment: string = "") => {
    const apiUrl = getGeonorgeMenuUrl(language, environment);
    return fetch(apiUrl).then(res => res.json()).then(menuItems => {
        return menuItems;
    });
}

export const fetchDropdownSearchResults = async (searchString: string = "", language: string = "no", environment: string = '') => {
    const urlParameterStrings = {
        dataset: `search?text=${searchString}&facets%5B1%5Dname=type&facets%5B1%5Dvalue=dataset`,
        series: `search?text=${searchString}&facets%5B1%5Dname=type&facets%5B1%5Dvalue=series`,
        service: `search?text=${searchString}&facets%5B1%5Dname=type&facets%5B1%5Dvalue=service`,
        software: `search?text=${searchString}&facets%5B1%5Dname=type&facets%5B1%5Dvalue=software`,
        articles: `articles?text=${searchString}`
    };
    const fetchOptions = {
        headers: new Headers({
            'Accept-Language': language
        })
    };
    const limitParameterString = 'limit=5';

    return await Promise.all(Object.keys(urlParameterStrings).map(async (searchResultsType) => {
        const kartkatalogApiUrl = getKartkatalogApiUrl(environment);
        let urlParameterString = urlParameterStrings[searchResultsType];
        return fetch(`${kartkatalogApiUrl}/${urlParameterString}&${limitParameterString}`, fetchOptions)
            .then(res => res.json())
            .then(searchResults => {
                return searchResults;
            })
    }))
};
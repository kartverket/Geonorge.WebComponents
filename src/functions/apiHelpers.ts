export const getKartkatalogApiUrl = (environment: string) => {
    const environmentSlug = environment === "dev" || environment === "test" ? environment + "." : "";
    return `https://kartkatalog.${environmentSlug}geonorge.no/api`;
};

export const getMinSideShortcutApiUrl = (environment: string, shortcutUrl?: string) => {
    const environmentSlug = environment === "dev" || environment === "test" ? environment + "." : "";
    const urlParameterString = shortcutUrl?.length ? `?${new URLSearchParams({ url: shortcutUrl }).toString()}` : "";
    return `https://minside.${environmentSlug}geonorge.no/api/shortcut${urlParameterString}`;
};
export const getMinSideShortcutUrl = (environment: string) => {
    const environmentSlug = environment === "dev" || environment === "test" ? environment + "." : "";
    return `https://minside.${environmentSlug}geonorge.no/shortcuts`;
};

export const fetchShortcutItem = async (environment: string = "", token: string, shortcutUrl: string) => {
    const apiUrl = getMinSideShortcutApiUrl(environment, shortcutUrl);
    const fetchOptions = {
        method: "GET",
        headers: new Headers({
            Authorization: `Bearer ${token}`
        })
    };
    return fetch(apiUrl, fetchOptions)
        .then((res) => res.json())
        .then((shortcutItems) => {
            return shortcutItems;
        });
};

export const postShortcutItem = async (
    environment: string = "",
    token: string,
    shortcutItem: { name: string; url: string }
) => {
    const apiUrl = getMinSideShortcutApiUrl(environment);
    const fetchOptions = {
        method: "POST",
        headers: new Headers({
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(shortcutItem)
    };
    return fetch(apiUrl, fetchOptions)
        .then((res) => res.json())
        .then((shortcutItem) => {
            return shortcutItem;
        });
};

export const deleteShortcutItem = async (environment: string = "", token: string, shortcutItem: { url: string }) => {
    const apiUrl = getMinSideShortcutApiUrl(environment);
    const fetchOptions = {
        method: "DELETE",
        headers: new Headers({
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(shortcutItem)
    };
    return fetch(apiUrl, fetchOptions)
        .then((res) => res.json())
        .then((shortcutItem) => {
            return shortcutItem;
        });
};

export const getGeonorgeMenuUrl = (language: string, environment: string) => {
    const environmentSlug = environment === "dev" || environment === "test" ? "test." : "";
    const selectedLanguageSlug = language === "en" ? "en/" : "";
    if (environment === "dev") return `https://dev.geonorge.no/menu.xml`;
    else return `https://www.${environmentSlug}geonorge.no/${selectedLanguageSlug}api/menu/get?omitLinks=1`;
};

export const fetchMenuItems = (language: string = "no", environment: string = "") => {
    const apiUrl = getGeonorgeMenuUrl(language, environment);
    return fetch(apiUrl)
        .then((res) => res.json())
        .then((menuItems) => {
            return menuItems;
        });
};

export const fetchDropdownSearchResults = async (
    searchString: string = "",
    language: string = "no",
    environment: string = ""
) => {
    searchString = searchString.toString();
    const urlParameterStrings = {
        dataset: `search?text=${searchString}&facets%5B1%5Dname=type&facets%5B1%5Dvalue=dataset`,
        series: `search?text=${searchString}&facets%5B1%5Dname=type&facets%5B1%5Dvalue=series`,
        service: `search?text=${searchString}&facets%5B1%5Dname=type&facets%5B1%5Dvalue=service`,
        servicelayer: `search?text=${searchString}&facets%5B1%5Dname=type&facets%5B1%5Dvalue=servicelayer`,
        software: `search?text=${searchString}&facets%5B1%5Dname=type&facets%5B1%5Dvalue=software`,
        articles: `articles?text=${searchString}`
    };
    const fetchOptions = {
        headers: new Headers({
            "Accept-Language": language
        })
    };
    const limitParameterString = "limit=5";

    return searchString && searchString.length
        ? await Promise.all(
              Object.keys(urlParameterStrings).map(async (searchResultsType) => {
                  const kartkatalogApiUrl = getKartkatalogApiUrl(environment);
                  let urlParameterString = urlParameterStrings[searchResultsType];
                  return fetch(`${kartkatalogApiUrl}/${urlParameterString}&${limitParameterString}`, fetchOptions)
                      .then((res) => res.json())
                      .then((searchResults) => {
                          return {
                              ...searchResults,
                              searchResultsType
                          };
                      });
              })
          )
        : null;
};

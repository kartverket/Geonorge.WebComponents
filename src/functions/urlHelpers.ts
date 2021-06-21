// Interfaces
import { SearchResultsForType } from 'interfaces/search';

export const getKartkatalogUrl = (environment: string) => {
    const environmentSlug = environment === 'dev' || environment === 'test' ? environment + '.' : '';
    return `https://kartkatalog.${environmentSlug}geonorge.no`;
};

export const getGeonorgeUrl = (language: string, environment: string) => {
    const environmentSlug = environment === 'dev' || environment === 'test' ? 'test.' : '';
    const selectedLanguageSlug = language === 'en' ? 'en/' : '';
    return `https://www.${environmentSlug}geonorge.no/${selectedLanguageSlug}`;
};

export const getGeonorgeNedlastingUrl = (environment: string) => {
    const environmentSlug = environment === 'dev' || environment === 'test' ? 'test.' : '';
    return `https://nedlasting.${environmentSlug}geonorge.no`;
};



const replaceAndAddSpace = (text: string, replace: string, replaceWith: string) => {
    text = text.replace(new RegExp(`([^s])([${replace}])([^s])`, 'ig'), `$1 ${replaceWith} $3`); // Character right before and after
    text = text.replace(new RegExp(`([^s])([${replace}])`, 'ig'), `$1 ${replaceWith}`); // Character right before
    text = text.replace(new RegExp(`([${replace}])([^s])`, 'ig'), `${replaceWith} $2`); // Character right after
    text = text.replace(new RegExp(`[${replace}]`, 'ig'), replaceWith); // No character right before or after
  
    return text;
  }

export const convertTextToUrlSlug = (text: string = '') => {
        // To lower case
        text = text.toLowerCase();

        // Character replace
        text = replaceAndAddSpace(text, "&", "and");
        text = replaceAndAddSpace(text, "+", "plus");
        text = text.replace("æ", "ae");
        text = text.replace("ä", "ae");
        text = text.replace("ø", "oe");
        text = text.replace("ö", "oe");
        text = text.replace("å", "aa");

        // Whitespace replace
        text = text.replace(/( - )/g, "-");
        text = text.replace(/[\s]+/g, "-");

        // Unwated character replace
        text = text.replace(/[^a-z0-9-]+/ig, "");

        // Remove any character before first and after last A-Z or 0-9
        text = text.replace(/^[^A-Z0-9]*|[^a-z0-9]*$/ig, "");

        return text;
}

const handleSearchResultsClick = (searchString: string, pushToDataLayer?: Function) => {
    if (pushToDataLayer) {
        pushToDataLayer({
            event: 'updateSearchString',
            category: 'metadataSearch',
            activity: 'dropDownResultsClick',
            searchString: searchString
        });
    } else return false;
}

export const renderDropdownResultLink = (searchResult: SearchResultsForType, resultType: string, searchString: string, environment: string, pushToDataLayer?: Function) => {
    return resultType === 'articles'
        ? `<a onClick="${handleSearchResultsClick(searchString, pushToDataLayer)}" href="${searchResult.ShowDetailsUrl ? searchResult.ShowDetailsUrl : '#'}">${searchResult.Title}</a>`
        : `<a onClick="${handleSearchResultsClick(searchString, pushToDataLayer)}" href="${getKartkatalogUrl(environment)}/metadata/${convertTextToUrlSlug(searchResult.Title)}/${searchResult.Uuid}">${searchResult.Title}</a>`

}
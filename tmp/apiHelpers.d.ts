export declare const getKartkatalogApiUrl: (environment: string) => string;
export declare const getMinSideShortcutApiUrl: (environment: string, shortcutUrl?: string) => string;
export declare const getMinSideShortcutUrl: (environment: string) => string;
export declare const fetchShortcutItem: (environment: string, token: string, shortcutUrl: string) => Promise<any>;
export declare const postShortcutItem: (environment: string, token: string, shortcutItem: {
    name: string;
    url: string;
}) => Promise<any>;
export declare const deleteShortcutItem: (environment: string, token: string, shortcutItem: {
    url: string;
}) => Promise<Response>;
export declare const getGeonorgeMenuUrl: (language: string, environment: string) => string;
export declare const fetchMenuItems: (language?: string, environment?: string) => Promise<any>;
export declare const fetchDropdownSearchResults: (searchString?: string, language?: string, environment?: string) => Promise<any[]>;

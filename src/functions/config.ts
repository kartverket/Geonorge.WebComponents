export interface GeonorgeConfig {
    kartkatalogUrl?: string;
    kartkatalogApiUrl?: string;
    minsideUrl?: string;
    geonorgeUrl?: string;
    nedlastingUrl?: string;
}

let currentConfig: GeonorgeConfig = {};

export const configure = (config: Partial<GeonorgeConfig>) => {
    currentConfig = { ...currentConfig, ...config };
};

export const getConfig = (): GeonorgeConfig => currentConfig;

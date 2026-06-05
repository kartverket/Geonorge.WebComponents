export interface GeonorgeConfig {
    kartkatalogUrl?: string;
    kartkatalogApiUrl?: string;
    minsideUrl?: string;
    geonorgeUrl?: string;
    nedlastingUrl?: string;
}

const CONFIG_KEY = '__geonorge_config__';

export const configure = (config: Partial<GeonorgeConfig>) => {
    (window as any)[CONFIG_KEY] = { ...(window as any)[CONFIG_KEY], ...config };
};

export const getConfig = (): GeonorgeConfig => (window as any)[CONFIG_KEY] || {};
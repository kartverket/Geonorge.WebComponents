export const getCookie = (cname: string) => {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export const setCookie = (cname: string, cvalue: string, exdays?: number) => {

    const domain = window.location.hostname === 'localhost' ? '' : 'domain=.geonorge.no';

    if (exdays === undefined) 
    {  
        document.cookie = `${cname}=${cvalue};path=/;${domain}`;
    } 
    else 
    {
        let expireDate = new Date();
        expireDate.setTime(expireDate.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = `expires=${expireDate.toUTCString()}`;
        document.cookie = `${cname}=${cvalue};${expires};path=/;${domain}`;
    }
}

export const getLanguage = () => {
    return getCookie('_culture');
}

export const setLanguage = (language: string) => {
    setCookie('_culture', language, 7);
}

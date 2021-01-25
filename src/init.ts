import WebFont from 'webfontloader';
import initStyle from './init.scss';

WebFont.load({
    google: {
        families: ['Raleway:100,400,500,700', 'Open Sans:400,600,700', 'sans-serif']
    }
});


const head: HTMLHeadElement = document.head || document.getElementsByTagName('head')[0];

// Inject stylesheet
const css: string = initStyle.toString();
const style: HTMLStyleElement = document.createElement('style');
head.appendChild(style);
style.appendChild(document.createTextNode(css));

// Polyfill for Edge legacy browsers
if (window.navigator.userAgent.indexOf("Edge/") > -1) {
    const polyfillScript = document.createElement('script');
    polyfillScript.src = "https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.5.0/webcomponents-bundle.min.js";
    head.appendChild(polyfillScript);
};

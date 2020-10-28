import WebFont from 'webfontloader';
import initStyle from './init.scss';

WebFont.load({
    google: {
        families: ['Raleway:100,400,500,700', 'Open Sans:400,600,700', 'sans-serif']
    }
});


// Inject stylesheet
const css: string = initStyle.toString();
let head: HTMLHeadElement = document.head || document.getElementsByTagName('head')[0];
const style: HTMLStyleElement = document.createElement('style');
head.appendChild(style);
style.appendChild(document.createTextNode(css));

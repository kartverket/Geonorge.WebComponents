"use strict";(self.webpackChunk_kartverket_geonorge_web_components=self.webpackChunk_kartverket_geonorge_web_components||[]).push([[6755],{"./src/stories/gn-dialog/template.scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".dialog-container:not(.visible){display:none}.dialog-container.visible{display:flex;flex-wrap:wrap;position:fixed;width:100%;background:rgba(0,0,0,.25);height:100%;top:0;left:0;align-content:center;padding:8px 28px;z-index:2;justify-content:center;box-sizing:border-box}@media(min-width: 992px){.dialog-container.visible{padding:36px}}.dialog-container .dialog-content{max-height:-moz-calc(100% - 128px);max-height:-webkit-calc(100% - 128px);max-height:calc(100% - 128px);-webkit-box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12);-moz-box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12);box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12);-webkit-border-radius:4px;border-radius:4px;max-width:540px;width:100%;background-color:#fff;position:relative}.dialog-container .dialog-content:not(.noPadding){padding:28px 22px 22px}@media(min-width: 768px){.dialog-container .dialog-content:not(.noPadding){padding:38px 30px 30px}}.dialog-container .dialog-content.noPadding{padding:28px 0 0}@media(min-width: 768px){.dialog-container .dialog-content.noPadding{padding:38px 0 0}}@media(min-width: 992px){.dialog-container .dialog-content{width:-moz-calc(100% - 128px);width:-webkit-calc(100% - 128px);width:calc(100% - 128px);max-height:100%}}.dialog-container .dialog-content .close-dialog-button{background:none;border:none;color:#2f3940;display:inline-block;position:absolute;right:7px;top:4px;text-decoration:underline;font-size:19px;cursor:pointer;padding:0;right:8px;top:5px}@media(min-width: 768px){.dialog-container .dialog-content .close-dialog-button{right:15px;top:10px}}.dialog-container .dialog-content .close-dialog-button:hover{text-decoration:none}.dialog-container .dialog-content .close-dialog-button svg{width:17px;height:17px}","",{version:3,sources:["webpack://./src/stories/gn-dialog/template.scss","webpack://./src/style/mixins/_breakpoints.scss","webpack://./src/style/mixins/_calc.scss","webpack://./src/style/mixins/_box-shadow.scss","webpack://./src/style/mixins/_border-radius.scss","webpack://./src/style/variables/_colors.scss"],names:[],mappings:"AAGI,gCACI,YAAA,CAEJ,0BACI,YAAA,CACA,cAAA,CACA,cAAA,CACA,UAAA,CACA,0BAAA,CACA,WAAA,CACA,KAAA,CACA,MAAA,CACA,oBAAA,CACA,gBAAA,CACA,SAAA,CACA,sBAAA,CACA,qBAAA,CCbA,yBAAA,0BDeI,YAAA,CAAA,CAGR,kCEvBF,kCAAA,CACA,qCAAA,CACA,6BAAA,CCFE,iHHyBI,CGxBJ,8GHwBI,CGvBJ,yGHuBI,CIzBN,yBJ8B6B,CI7B7B,iBJ6B6B,CACvB,eAAA,CACA,UAAA,CACA,qBAAA,CACA,iBAAA,CACA,kDACI,sBAAA,CC3BJ,yBD0BA,kDAGQ,sBAAA,CAAA,CAGR,4CACI,gBAAA,CCjCJ,yBDgCA,4CAGQ,gBAAA,CAAA,CCvCR,yBDkBJ,kCEvBF,6BAAA,CACA,gCAAA,CACA,wBAAA,CF+CU,eAAA,CAAA,CAEJ,uDACI,eAAA,CACA,WAAA,CACA,aKhDE,CLiDF,oBAAA,CACA,iBAAA,CACA,SAAA,CACA,OAAA,CACA,yBAAA,CACA,cAAA,CACA,cAAA,CACA,SAAA,CACA,SAAA,CACA,OAAA,CCvDJ,yBD0CA,uDAeQ,UAAA,CACA,QAAA,CAAA,CAEJ,6DACI,oBAAA,CAEJ,2DACI,UAAA,CACA,WAAA",sourcesContent:['@import "../../style/all";\r\n\r\n.dialog-container {\r\n    &:not(.visible) {\r\n        display: none;\r\n    }\r\n    &.visible {\r\n        display: flex;\r\n        flex-wrap: wrap;\r\n        position: fixed;\r\n        width: 100%;\r\n        background: rgba(0, 0, 0, 0.25);\r\n        height: 100%;\r\n        top: 0;\r\n        left: 0;\r\n        align-content: center;\r\n        padding: 8px 28px;\r\n        z-index: 2;\r\n        justify-content: center;\r\n        box-sizing: border-box;\r\n        @include breakpoint(laptop) {\r\n            padding: 36px;\r\n        }\r\n    }\r\n    .dialog-content {\r\n        @include calc("max-height", "100% - 128px");\r\n        @include box-shadow(\r\n            0 11px 15px -7px rgba(0, 0, 0, 0.2),\r\n            0 24px 38px 3px rgba(0, 0, 0, 0.14),\r\n            0 9px 46px 8px rgba(0, 0, 0, 0.12)\r\n        );\r\n        @include border-radius(4px);\r\n        max-width: 540px;\r\n        width: 100%;\r\n        background-color: #fff;\r\n        position: relative;\r\n        &:not(.noPadding) {\r\n            padding: 28px 22px 22px;\r\n            @include breakpoint(tablet) {\r\n                padding: 38px 30px 30px;\r\n            }\r\n        }\r\n        &.noPadding {\r\n            padding: 28px 0 0;\r\n            @include breakpoint(tablet) {\r\n                padding: 38px 0 0;\r\n            }\r\n        }\r\n        @include breakpoint(laptop) {\r\n            @include calc("width", "100% - 128px");\r\n            max-height: 100%;\r\n        }\r\n        .close-dialog-button {\r\n            background: none;\r\n            border: none;\r\n            color: $default-text;\r\n            display: inline-block;\r\n            position: absolute;\r\n            right: 7px;\r\n            top: 4px;\r\n            text-decoration: underline;\r\n            font-size: 19px;\r\n            cursor: pointer;\r\n            padding: 0;\r\n            right: 8px;\r\n            top: 5px;\r\n            @include breakpoint(tablet) {\r\n                right: 15px;\r\n                top: 10px;\r\n            }\r\n            &:hover {\r\n                text-decoration: none;\r\n            }\r\n            svg {\r\n                width: 17px;\r\n                height: 17px;\r\n            }\r\n        }\r\n    }\r\n}\r\n',"@mixin breakpoint($point) {\r\n    @if $point == desktop {\r\n        @media (min-width: $screen-desktop) {\r\n            @content;\r\n        }\r\n    } @else if $point == laptop {\r\n        @media (min-width: $screen-laptop) {\r\n            @content;\r\n        }\r\n    } @else if $point == tablet {\r\n        @media (min-width: $screen-tablet) {\r\n            @content;\r\n        }\r\n    } @else if $point == phablet {\r\n        @media (min-width: $screen-phablet) {\r\n            @content;\r\n        }\r\n    }\r\n}\r\n","\ufeff@mixin calc($property, $expression) {\r\n  #{$property}: -moz-calc(#{$expression});\r\n  #{$property}: -webkit-calc(#{$expression});\r\n  #{$property}: calc(#{$expression});\r\n}","\ufeff@mixin box-shadow($shadows...) {\r\n    -webkit-box-shadow: $shadows;\r\n    -moz-box-shadow: $shadows;\r\n    box-shadow: $shadows;\r\n}\r\n","@mixin border-radius($radius) {\r\n  -webkit-border-radius: $radius;\r\n  border-radius: $radius;\r\n}\r\n\r\n// Single side border-radius\r\n\r\n@mixin border-top-radius($radius) {\r\n  -webkit-border-top-right-radius: $radius;\r\n  border-top-right-radius: $radius;\r\n  -webkit-border-top-left-radius: $radius;\r\n  border-top-left-radius: $radius;\r\n}\r\n@mixin border-right-radius($radius) {\r\n  -webkit-border-bottom-right-radius: $radius;\r\n  border-bottom-right-radius: $radius;\r\n  -webkit-border-top-right-radius: $radius;\r\n  border-top-right-radius: $radius;\r\n}\r\n@mixin border-bottom-radius($radius) {\r\n  -webkit-border-bottom-right-radius: $radius;\r\n  border-bottom-right-radius: $radius;\r\n  -webkit-border-bottom-left-radius: $radius;\r\n  border-bottom-left-radius: $radius;\r\n}\r\n@mixin border-left-radius($radius) {\r\n  -webkit-border-bottom-left-radius: $radius;\r\n  border-bottom-left-radius: $radius;\r\n  -webkit-border-top-left-radius: $radius;\r\n  border-top-left-radius: $radius;\r\n}","$body-background: #ffffff;\r\n$navigation-bar-background:  #f7f7f7;\r\n$hover-background: rgba(0,0,0,.05);\r\n$default-border: #d8d8d8;\r\n\r\n$default-background: #eee;\r\n$default-background-hover: #ddd;\r\n$default-text:#2F3940;\r\n\r\n$light-gray: #f6f5f4;\r\n\r\n$primary-brand: #FE5000;\r\n\r\n$primary-background: #3767C7;\r\n$primary-background-hover: #FE5000;\r\n$primary-text: #3767C7;\r\n$primary-text-hover:#0056b3;\r\n\r\n\r\n$success-background: #06A755;\r\n$success-background-hover: #009745;\r\n$success-text: #06A755;\r\n\r\n\r\n$warning-background: #C38621;\r\n$warning-background-hover: #B37611;\r\n$warning-text: #C38621;\r\n\r\n$danger-background: #E00d0D;\r\n$danger-background-hover: #D00000;\r\n$danger-text: #E00d0D;\r\n\r\n$disabled-background: #f4f4f4;\r\n$disabled-border: #dedede;\r\n$disabled-text: #707070;\r\n\r\n\r\n$light-green: #8fff33;\r\n$light-yellow: #ffEb3b;\r\n$light-red: #ff4a2e;\r\n"],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);
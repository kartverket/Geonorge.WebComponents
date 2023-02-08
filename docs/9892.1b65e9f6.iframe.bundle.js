"use strict";(self.webpackChunk_kartverket_geonorge_web_components=self.webpackChunk_kartverket_geonorge_web_components||[]).push([[9892],{"./src/stories/heading-text/heading-text.scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,'::slotted(h1),::slotted([size="1"]){font-family:"Raleway",sans-serif;font-size:30px;font-weight:100}@media(min-width: 768px){::slotted(h1),::slotted([size="1"]){font-size:48px}}::slotted(h1[underline]):after,::slotted([size="1"][underline]):after{content:"";display:block;width:75px;border-bottom:3px solid #fe5000;margin:5px 0 15px}@media(min-width: 768px){::slotted(h1[underline]):after,::slotted([size="1"][underline]):after{width:100px;border-bottom:5px solid #fe5000;margin:10px 0 20px}}::slotted(h2),::slotted([size="2"]){font-family:"Raleway",sans-serif;font-size:26px;line-height:30px;font-weight:300;display:inline;margin-bottom:10px;margin-top:20px}@media(min-width: 768px){::slotted(h2),::slotted([size="2"]){font-size:32px;line-height:40px}}::slotted(h2):before,::slotted([size="2"]):before{content:"";display:block;margin-top:46px}::slotted(h2):after,::slotted([size="2"]):after{content:"";display:block;margin-bottom:20px}::slotted(h2[underline]),::slotted([size="2"][underline]){border-bottom:2px solid #fe5000}::slotted(h3),::slotted([size="3"]){font-family:"Open Sans",sans-serif;font-size:20px;font-weight:300}@media(min-width: 768px){::slotted(h3),::slotted([size="3"]){font-size:21px}}::slotted(h4),::slotted([size="4"]){font-family:"Open Sans",sans-serif;font-size:18px;font-weight:300}@media(min-width: 768px){::slotted(h4),::slotted([size="4"]){font-size:19px}}::slotted(h5),::slotted([size="5"]){font-family:"Open Sans",sans-serif;font-size:15px;font-weight:600}@media(min-width: 768px){::slotted(h5),::slotted([size="5"]){font-size:16px}}',"",{version:3,sources:["webpack://./src/stories/heading-text/heading-text.scss","webpack://./src/style/variables/_typography.scss","webpack://./src/style/mixins/_breakpoints.scss"],names:[],mappings:"AAEA,oCAEI,gCCHU,CDIV,cAAA,CACA,eAAA,CEII,yBFRR,oCAMQ,cAAA,CAAA,CAMJ,sEACI,UAAA,CACA,aAAA,CACA,UAAA,CACA,+BAAA,CACA,iBAAA,CETA,yBFIJ,sEAOQ,WAAA,CACA,+BAAA,CACA,kBAAA,CAAA,CAKZ,oCAEI,gCC7BU,CD8BV,cAAA,CACA,gBAAA,CACA,eAAA,CACA,cAAA,CACA,kBAAA,CACA,eAAA,CE1BI,yBFkBR,oCAUQ,cAAA,CACA,gBAAA,CAAA,CAEJ,kDACI,UAAA,CACA,aAAA,CACA,eAAA,CAEJ,gDACI,UAAA,CACA,aAAA,CACA,kBAAA,CAIR,0DAEI,+BAAA,CAGJ,oCAEI,kCC5DW,CD6DX,cAAA,CACA,eAAA,CEpDI,yBFgDR,oCAMQ,cAAA,CAAA,CAIR,oCAEI,kCCtEW,CDuEX,cAAA,CACA,eAAA,CE9DI,yBF0DR,oCAMQ,cAAA,CAAA,CAIR,oCAEI,kCChFW,CDiFX,cAAA,CACA,eAAA,CExEI,yBFoER,oCAMQ,cAAA,CAAA",sourcesContent:['@import "../../style/all";\n\n::slotted(h1),\n::slotted([size="1"]) {\n    font-family: $header-font;\n    font-size: 30px;\n    font-weight: 100;\n    @include breakpoint(tablet) {\n        font-size: 48px;\n    }\n}\n\n::slotted(h1[underline]),\n::slotted([size="1"][underline]) {\n    &:after {\n        content: "";\n        display: block;\n        width: 75px;\n        border-bottom: 3px solid $primary-brand;\n        margin: 5px 0 15px;\n        @include breakpoint(tablet) {\n            width: 100px;\n            border-bottom: 5px solid $primary-brand;\n            margin: 10px 0 20px;\n        }\n    }\n}\n\n::slotted(h2),\n::slotted([size="2"]) {\n    font-family: $header-font;\n    font-size: 26px;\n    line-height: 30px;\n    font-weight: 300;\n    display: inline;\n    margin-bottom: 10px;\n    margin-top: 20px;\n    @include breakpoint(tablet) {\n        font-size: 32px;\n        line-height: 40px;\n    }\n    &:before {\n        content: "";\n        display: block;\n        margin-top: 46px;\n    }\n    &:after {\n        content: "";\n        display: block;\n        margin-bottom: 20px;\n    }\n}\n\n::slotted(h2[underline]),\n::slotted([size="2"][underline]) {\n    border-bottom: 2px solid $primary-brand;\n}\n\n::slotted(h3),\n::slotted([size="3"]) {\n    font-family: $default-font;\n    font-size: 20px;\n    font-weight: 300;\n    @include breakpoint(tablet) {\n        font-size: 21px;\n    }\n}\n\n::slotted(h4),\n::slotted([size="4"]) {\n    font-family: $default-font;\n    font-size: 18px;\n    font-weight: 300;\n    @include breakpoint(tablet) {\n        font-size: 19px;\n    }\n}\n\n::slotted(h5),\n::slotted([size="5"]) {\n    font-family: $default-font;\n    font-size: 15px;\n    font-weight: 600;\n    @include breakpoint(tablet) {\n        font-size: 16px;\n    }\n}\n','$default-font: "Open Sans", sans-serif;\n$header-font: "Raleway", sans-serif;\n$default-font-size: 14px;\n',"@mixin breakpoint($point) {\n    @if $point == desktop {\n        @media (min-width: $screen-desktop) {\n            @content;\n        }\n    } @else if $point == laptop {\n        @media (min-width: $screen-laptop) {\n            @content;\n        }\n    } @else if $point == tablet {\n        @media (min-width: $screen-tablet) {\n            @content;\n        }\n    } @else if $point == phablet {\n        @media (min-width: $screen-phablet) {\n            @content;\n        }\n    }\n}\n"],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);
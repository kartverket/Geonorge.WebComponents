# Geonorge.WebComponents

## Installation

Geonorge Web Components is available as an [npm package](https://www.npmjs.com/package/geonorge-web-components).

```sh
// with npm
npm install @kartverket/geonorge-web-components

// with yarn
yarn add @kartverket/geonorge-web-components
```


## Usage

### HTML site
```html
<!doctype html>
<html lang="no">
  <head>
    <meta charset="utf-8">
    <title>HTML site</title>
    <meta content="width=device-width,initial-scale=1" name="viewport">
  </head>
  <body>
    <main-navigation englishurl="/" norwegianurl="/"  environment="dev" ></main-navigation>
    <!-- Content here -->
    <script src="MainNavigation.js"></script>
  </body>
</html>
```

### React app
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { MainNavigation } from '@kartverket/geonorge-web-components/MainNavigation';


function App() {
  return (<React.Fragment>
    <main-navigation environment="dev"></main-navigation>
    /* Content here */
    </React.Fragment>);
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## Examples
[github.io/Geonorge.WebComponents](https://kartverket.github.io/Geonorge.WebComponents/).
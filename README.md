## Requirements

- `node` **>=** `10.13.0`
- `npm`

# Setup

## Installation

1. Install all dependencies using `npm` clean install.

```sh
$ npm ci
```

> More on the clean install npm command can be read here [`npm ci`](https://docs.npmjs.com/cli/ci.html)

> You can still use `npm install` in cases the `npm ci` raises system error due to specific platform incompatibilities.

## Development / Build Assets

### Assets Source

- _SASS_ files are located under `/src/scss/`
- _JavaScript_ files with support of _ES6 / ECMAScript 2016(ES7)_ files are located under `/src/js/`
- _Image_ files are located under `/src/images/`
- _Font_ files are located under `/src/fonts/`
- _HTML_ files are located under `/src/`

### Build Assets

```sh
$ npm run build
```

### Enable Source Files Watcher

```sh
$ npm run watch
```

> Define any other files that needs syncing in `files:[]` section under `BrowserSyncPlugin` in `webpack.config.js`

_BrowserSync UI_ can be reached by default on this location: http://localhost:3001

### Enable Source Files Watcher Using an Existing Webserver

```sh
$ npm run watch:externalServer
```

Configure the URL to your running external web server in the `webpack.config.json` project under:

```js
const serverConfiguration = {
  // ...,
  external: {
    proxy: 'http://localhost:3000/path/to/project/',
  },
};
```

> Define any other files that needs syncing in `files:[]` section under `BrowserSyncPlugin` in `webpack.config.js`

_Note:_ Watching does not work with _NFS_ (_Windows_) and machines in _VirtualBox_. Extend the configuration in such cases by:

```js
module.exports = {
  //...
  watchOptions: {
    poll: 1000, // Check for changes every second
  },
};
```

### Bundle

Executes both `install` and `watch` tasks in a single command convenient for development:

```sh
$ npm run bundle
```

### Bundle (using external server for preview)

Executes both `install` and `watch:externalServer` tasks in a single command convenient for development with existing webserver back-end powered application:

```sh
$ npm run bundle:externalServer
```

## Production / Build Assets

- Optimize assets for production by:

```sh
$ npm run production
```

## Processed Built Assets

- _CSS_ files are located under `/dist/css/`
- _JavaScript_ files with support of _ES6 / ECMAScript 2016(ES7)_ files are located under `/dist/js/`
- _Images_ are located under `/dist/images/`
  - Images part of the _design_ (_usually referenced in the CSS_) are located under `/dist/images/design/`
  - Images part of the _content_ (_usually referenced via `<img>` tags_) are located under `/dist/images/content/`
- _Fonts_ are located under `/dist/fonts/`
- _HTML_ files are located under `/dist/`

## Run Code Style Linters

- **SASS**

```sh
$ npm run lint-sass
```

- **JS**

```sh
$ npm run lint-js
```

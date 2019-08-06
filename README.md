# Frontendisti.cz

> Minikonference webových designérů a vývojářů orientovaných na HTML, CSS a trochu JavaScript.

## About

Powered by
[![Netlify Status](https://api.netlify.com/api/v1/badges/3c193b76-087a-4f6f-86d8-ceff636ff8e8/deploy-status)](https://app.netlify.com/sites/gracious-spence-d7722f/deploys)

## Getting Started

On your marks, get set, GO!

### Prerequisites

The things you need to install to run SUPERKODERS DevStack

```
Node	>= 8.12.x
npm		>=3.10.x
gulp 	4.0.2
```

### Installing

Open your favorite Terminal and run this command.

```
$ npm start
```

## Development

Command `$ npm run dev` starts virtual server at [http://localhost:3000/](http://localhost:3000/) and all file watchers.
Templates will be automatically compiled (via. file watcher task) on every change in the folder `/src/`.

### Other Gulp Commands

```
# command to build compressed templates
$ npm run build

# command to build compressed templates with file watcher and local server
$ npm run minwatch

# command to build and compress templetes to zip file
$ npm run export

```

### Directory Structure
```
.
├── content                     # Folder for netlify CMS data
│   ├── meetup                  # Folder for meetup event data
├── node_modules                # NPM packages
├── src                         # Source files
│   ├── admin                   # Netlify CMS
│   ├── content                 # Concatenated data
│   ├── css                     # Styles (using SASS - CSS extension language)
│   ├── fonts                   # Webfonts *not required*
│   ├── img                     # Images
│   ├── js                      # Javascript
│   └── tpl                     # Templates (using Nunjucks - templating language)
├── tasks                       # Set of asynchronous JavaScript functions
├── web                         # Generated files (html, css, js, images, fonts etc.)
├── .editorconfig               # Set of rules to maintain consistent coding convention between different editors and IDEs.
├── .eslintignore               # Set of ignored rules for coding convention
├── .eslintrc                   # Set of rules to highlight inappropriate coding convention in Javascript
├── .gitignore                  # List of excluded folders/files from git repository
├── .npmrc                      # The NPM config files
├── .stylintrc                  # Set of rules to hightlight inappropriate coding convention in styles
├── config.js                   # General devstack conig
├── gulpfile.js                 # Gulp config
└── package.json                # List of NPM dependencies
```

## Author

[![N|Superkoders](http://logo.superkoderi.cz/superkoders.svg)](https://www.superkoders.com)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

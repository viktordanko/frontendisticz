# SUPERKODERS DevStack

> The best DevStack for frontend developers.

## About

Static site generator with headless CMS

## Getting Started

On your marks, get set, GO!

### Prerequisites

The things you need to install to run SUPERKODERS DevStack

```
Node	10.15.1
npm		6.4.1
gulp 	4.0.2
```

### Installing

Open your favorite Terminal and run this command.

```
$ npm install
```

## Development

Command `$ gulp` starts virtual server at [http://localhost:3000/tpl](http://localhost:3000/tpl) and all file watchers.
Templates will be automatically compiled (via. file watcher task) on every change in the folder `/src/`.

### Other Gulp Commands

```
# command to build compressed templates
$ gulp min

# command to build compressed templates with file watcher and local server
$ gulp minwatch

# command to build and compress templetes to zip file
$ gulp export

# command to validate HTML by W3C standars
$ gulp validate
```

### Directory Structure
```
.
├── node_modules                # NPM packages
├── src                         # Source files
│   ├── css                     # Styles (using SASS - CSS extension language)
│   ├── img                     # Images
│   ├── js                      # Javascript
│   └── tpl                     # Templates (using Nunjucks - templating language)
├── fonts                       # Webfonts *not required*
├── tasks                       # Set of asynchronous JavaScript functions
├── web                         # Generated files (html, css, js, images, fonts...)
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

# SUPERKODERS DevStack

The best DevStack for frontend developers.

## Getting Started

We're very happy with you – our client and also becouse you're using our DevStack. There is short description of SUPERKODERS DevStack.

### Prerequisites

The things you need to install

```
Node	8.12.0
npm		6.5.0
gulp 	3.9.1
```

### Installing

It's easy – you need just one command :)

```
$ npm install
```

## How To Use

Command `$ gulp` starts a virtual server at url [http://localhost:3000/](http://localhost:3000/) with browserSync and file watcher. All templates will be automatically compiled (via. file watcher task) and refreshed in browser (via browserSync task) on every change in folder `/src/`.

### Other Gulp Commands

Explain how to run the automated tests for this system

```
# command for build compressed templates
$ gulp min

# command for build compressed templates with file watcher and local server
$ gulp minwatch

# command for build compressed templetes with compress to zip file
$ gulp export

# command for W3C validate templates
$ gulp validate
```

### Directory Structure

1. **src** - Source files folder
	1. **css** – [stylus](http://stylus-lang.com/)/[scss](https://sass-lang.com/)
	1. **img** – Images
	1. **js** – JavaScript
	1. **tpl** – [Nunjucks](https://mozilla.github.io/nunjucks/templating.html)
	1. **fonts** – Webfonts *not required*
1. **tasks** - gulp tasks
1. **.editorconfig** - EditorConfig file
1. **.eslintignore** - ESLint config
1. **.eslintrc** - ESLint config
1. **.gitignore** - GIT ignore file
1. **.npmrc** - NPM config
1. **.stylintrc** - Stylint config
1. **config.js** – DevStack config
1. **gulpfile.js** – Gulp config file
1. **package.json** - NPM dependencies

#### Generated Folders

1. **node_modules** - NPM packages
1. **web** - Folder with templates

## Deployment

TODO

## Author

* **SUPERKODERS** - [www.superkoders.com](https://superkoders.com/) – [support@superkoders.com](support@superkoders.com)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

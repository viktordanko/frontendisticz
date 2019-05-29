### 3.3.0 / 15.9.2017
- Add gulpfile ES6 support
- Add Webpack support for multiple bundles
- Add icon-svg task
- Add FontFaceObserver
- Add CSS and JS cache buster
- Add Polyfill.io
- Add modernizr for touch detection
- Remove support for IE8 and below
- Remove bower
- Change some default CSS
- Change babel presets to ES2017
- Update normalize
- Update npm packages
- Separate babel settings from package.json
- Use yarn instead of npm
- Refactor MQ tool in JS
- Update Webpack to version 3

### 3.2.8 / 16.2.2017
- Install exact version of Browsersync (CSS injecting doesn’t work in new version)

### 3.2.7 / 15.2.2017
- Fix path for fonts in CSS

### 3.2.6 / 15.2.2017
- Fix icon font empty stream

### 3.2.5 / 15.2.2017
- Migrate webpack from v1 to v2

### 3.2.4 / 24.1.2017
- Fix right values for background-position and reset text-align on cells in grid extend

### 3.2.3 / 14.12.2016
- Přidání node-notifier závislosti

### 3.2.2 / 08.12.2016
- Oprava synchronního zápisu iconfontu

### 3.2.1 / 21.11.2016
- Přidání lokálního configu

### 3.2.0 / 21.11.2016
- Odstranění PHP
- Přidání Nunjucks
- Přidání assets proměnné do config.js
- Přidání config.js pro použití proměnných v šablonách
- Přidání config.js pro použití proměnných ve stylech
- Přidání notifikace po spuštění watch tasku
- Přidání isProduction funkce pro zjištění prostředí (development / production)
- Oprava injectování CSS
- Oprava importů v tiskovém stylu
- Oprava CSS chyb
- Oprava tasku minwatch
- Změna globálního box-sizingu na border-box
- Update browser-sync balíčku na verzi 2.17.5

### 3.1.3-beta / 17.10.2016
- Přidání Coffeescript závislostí pro Webpack

### 3.1.2-beta / 11.10.2016
- Odstranění mixiny pro placeholder (řešeno autoprefixerem)

### 3.1.1-beta / 6.10.2016
- Opravena chyba s injectováním CSS

### 3.1.0-beta / 6.10.2016
- Odstranění config.json
- Přidání config.js (úprava cest u tasků)

### 3.0.1-beta / 30.9.2016
- Přidání error notifikací pro Webpack

### 3.0.0-beta / 29.9.2016
- Odstranění nibu
- Odstranění jQuery z bundlu
- Odstranění Coffeescriptu
- Přidání PostCSS (PostStylus)
- Přidání Autoprefixeru
- Přidání meta tagů pro sdílení
- Přidání jsonu pro media queries a jejich načítání do .styl a .js souborů
- Nastavení linteru po ES6
- Nastavení linteru pro Stylus
- Přepsání Gulp tasků do vanilla JS
- Přepsání Stylus mixin a utilit

### 2.0.7 / 24.11.2015
- CSS se po kompilaci injectnou, takže se nereloadne celá stránka.

### 2.0.6 / 22.11.2015
- Kompletní odstranění **gulp-cached** kvůli špatné funkčnosti watcheru.

### 2.0.5 / 22.11.2015
- Opravena chyba v šabloně pro generování retina spritů.

### 2.0.4 / 18.11.2015
- Přidán errorHandler pro zobrazení notifikace a nespadnutí tasku při failu stylusu.

### 2.0.3/ 16.11.2015
- Rozdělení importů v core.styl.
- Fix margin-top na first-childech.

### 2.0.2 / 12.11.2015
- Přidán task minwatch.

### 2.0.1 / 12.11.2015
- Pročištění nastavení balíčků.

### 2.0.0 / 9.11.2015
- Přepsání celého stacku do Gulpu.
- Přidáno vytváření iconfontu z svg.

### 1.3.9 / 24.07.2015
- Odstranění deprecated projection media

### 1.3.8 / 30.06.2015
- Add proměnných barev social do project.styl

### 1.3.7 / 30.03.2015
- Přidána lodash závislost

### 1.3.6 / 03.03.2015
- Added $retina variable to project.styl

### 1.3.5 / 24.02.2015
- Fix destPath (1.3.3)

### 1.3.4 / 20.02.2015
- Add starých base šablon (index, homepage, typografie)

### 1.3.3 / 20.02.2015
- Fix destPath pro 'sk-imgsize' task

### 1.3.2 / 19.02.2015
- Fix cesty k app.js v templatě

### 1.3.1 / 19.02.2015
- Fix sprite importů

### 1.3.0 / 17.02.2015
- Rozdělení taksů na **build**, **watch**, **min** a **export**. Defaultní task je **watch**
- Do Stylusu přidány **sourcemapy**. Při použití tasků **min** nebo **export** se odstraní.
- PHP / HTML šablony zanořeny pod složku **tpl**. Upravena relativní cesta linkovaných statických souborů.
- Update všech grunt balíčků v **package.json** na nejnovější verze. Browserify je teď o dost rychlejší.
- Zakázání coffeescript kompilace **/js/static/_no_delete.coffee**.
- GIT ignorování generovaných **sprite*.styl** souborů.
- Upravena logika linkování spritů do stylusu. Zanoření do složky **sprites** v *css/lib/*. Zanoření šablon pro sprity do složky **sprites-tpl** v *css/lib/*.


### 1.2.2 / 13.02.2015
- Přidání changelogu. Dopsání zpětně podle commitů.

### 1.2.1 / 05.02.2015
- Oprava **build** tasku. Nyní správně generuje sprite.styl před kompilací samotného stylusu.

### 1.2.0 / 28.01.2015
- Přidání balíčku **grunt-contrib-uglify**
- Přidání minifikace javascriptů při exportu.
- Odstarnění console.logu

### 1.1.0 / 19.01.2015
- Přidána složka static pro javascripty které se nebudou spojovat. Hodí se např. pro scripty které jsou potřeba linkovat v HEADu
- Přidání kompilace coffescriptů ve složce static

### 1.0.1 / 15.01.2015
- Odstranění testovacích souborů
- Zlešení názvu složky při exportu. Lepší řazení dle datumu.

### 1.0.0 / 14.01.2015
- Úprava adresářové struktury. Zdrojové soubory jsou zanořené ve složce **src**. Odstranění nyní zbytečné zanoření *.styl a *.coffee souborů.
- Odstranění node modulu **inline-imagesize** z GITu. Vydali jsme na GitHubu vlastní verzi tohoto modulu.
- Odstranění zbytečných bower závislostí v **bower.json**
- Odstranění testovacích coffescriptů

### 0.0.4 / 29.12.2014
- Přidání nastavení pro coffeLint do **package.json**. Za pomocí **Sublime Text** balíčků kontroluje při psaní kód coffescriptu.
- Drobné úpravy coffee souborů dle coffeLinteru

### 0.0.3 / 17.12.2014
- Odstranění nepotřebných souborů z GITu

### 0.0.2 / 16.12.2014
- Přidání **bower install** do **start.sh**.
- Přidání node modulu **inline-imagesize** do GITu. Vlastník tasku nepříjímá pull requesty.
- Úprava gitignore - ignorování složky **bower_components** v GITu.
- Úprava gitignore - vyjmutí node modulu **inline-imagesize** z ignorace

### 0.0.1 / 16.12.2014
- vytvoření.

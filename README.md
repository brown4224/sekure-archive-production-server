I've overhalled the Angular 2 app to include the offical angular webpack.
However, this does not have a cli.  As such web pack will strip .js .jpg .css and other files that are not white listed.

Important:
You must white list these in the .angular-cli.json folder
Using @angular/compiler-cli": "2.4.0"

This package is no longer supporting systemjs from the literature.
Use the typings.d.ts moduel for third party js
Use polyfills.ts for browser compatibility

To get started.
npm install -g @angular/cli

Make sure the post script runs
typings install

launch server
ng serve
visit: localhost:4200

production
ng build
view dist directory



# SekureProduction

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-rc.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

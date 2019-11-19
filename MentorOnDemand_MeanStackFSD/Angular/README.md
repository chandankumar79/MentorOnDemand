# Project2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

* register component contains registration for both user and mentor
* login component contains registration for both user and mentor
* activity component contains registration for both user and mentor

// *** IMPLEMENTATION NOTES ----------------------------------------------- ***
/*
 * Auth guard only check if there is an existing token, so the problem comes
 * when a student logged in tries to access mentor profile or admin profile.
 * Maybe this problem won't come due to the fact that user profile will try
 * to fetch the tokened data based on url, so if the user data does not exit,
 * link will be navigated to login page and local token will be deleted.
 * --- however better to avaoid such issues
 *
 *
*/

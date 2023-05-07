# SuperHeroUI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## First step after scaffolding the project

Create 3 folders under the app directory - components, models, services

## creating a service

change directory to the services directory (under src/app)
run example command - ng g s super-hero --skip-tests

## generating a component

ng g c edit-hero --skip-tests

## Can't bind to 'ngModel' since it isn't a known property of 'input'.ngtsc(-998002)

This error usually occurs when you have not imported the FormsModule or ReactiveFormsModule in your Angular module. The ngModel directive is part of the FormsModule, and the formControlName directive is part of the ReactiveFormsModule. Therefore, you need to import the corresponding module in your module file.

## Setting up the Edit Hero Component
1. generated the component *reference above
2. Edited the edit-hero view by adding in a form. 
  2a. contains two way data binding using ngModel for each of the fields
  2b. ngSubmit directive invokes the onSubmit function in the edit-hero component 
3. Edited the edit-hero component.ts to: 

  3a. import the superHeroService in the constructor 
  3b. implement the onSubmit() function
    - onSubmit function invokes the superHeroService.editSuperHero and passes in the hero object
    - onSubmit function subscribes to the service method and emits an event with the return object (SuperHero array/list)

4. edited the app.component.html view to implement the new edit-hero component

  4a. Added a new table data row to the table body which contains an edit button
    - upon clicking this edit button, it calls the editHero method in the app.component.ts and supplies the current hero from the selected row
  4b. Added the edit-hero selector in the app.component.html file at the bottom
    - Used input binding to send the hero object from the parent that was being edited to the child component
    - used output binding to emit an event from the child when the superhero list was updated which calls a method in the parent component. this method will update the grid to reflect the updated list of heroes


## Unit Testing Overview

Karma, the angular test runner, is looking for a specific naming convention.
the test file should match the file name being tested exactly but with the addition of .spec.
  Example-> compute.ts
            compute.spec.ts

Jasmine, our testing framework, provides methods for us to test our code

  common methods include
  1. describe() -> group of related tests //suite
  2. it() -> individual test //spec

      example
          describe('compute', () => {
            it('should return 0 if input is negative', () => {
                //unit test
            })

            it('should increment the input if it is positive', () => {
                //unit test
            })
          })

  3. beforeEach(() => {}) -> Jasmine executes this before each spec in the suite. useful for common initializaiton/arrange code

  4. afterEach(( => {})) -> Jasmine executes this after each spec in the suite, used for cleanup

  5. beforeAll(() => {}) -> executed once before all tests in a suite

  6. afterAll -> once after all the tests

## Unit testing Structure
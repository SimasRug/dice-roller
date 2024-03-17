# Virtual Dice Roller

## Project Setup

This is a `Angular` project created using `Angular CLI`.

Using angular standalone components instead of the Module approach.

## Run and Test the Project

#### Install libraries

```sh
npm install
```

#### Run project in dev environment

```sh
npm run start
```

alternatively

```sh
ng serve
```

#### Run unit tests

```sh
npm run test
```

alternatively

```sh
ng test
```

### Description

I went with virtual dice roller challenge, because I thought it would be the most challenging and in my option had the most potential as a visual project.
I really wanted to do something with 3D dice. I played with the tough of using [Dice Box](https://www.npmjs.com/package/@3d-dice/dice-box) library and create something like this [project](https://codesandbox.io/p/sandbox/lhbs99?file=%2Fsrc%2Findex.js). However, it had almost everything built in. It would not have been much of a challenge if I used it.

It would've been fun to approach this with a `canvas` or `three.js` approach, but there was not enough time for that. So I went with simple 2d dice and css animations.

#### Improvements

If I would keep working on this project I would add the following features and changes:

- More declarative programming. Here I used a mix between declarative and imperative programming. I would like to go full declarative. (Not working for angular for a year I forgot some of the best practices)
- Better animations and transitions. I would like to add more animations and transitions to the project. I think it would make it more fun and engaging.
- 3D dice.
- Better styling.
- Better responsive design.
- Testing using `Jest` and `Angular Testing Library`.
- Better state management. I would like to add a service layer between the component and the store.
- `Cypress` for e2e testing.

### File structure

For this project I went with a [DDD](https://medium.com/steve-cruz/domain-driven-design-ddd-file-structure-ade7fb26553d) approach. Maybe it is a bit overkill for this specific project. However, I think it is a good approach for larger projects.

### State Management

I used `ngrx` for state management. In a real life project I would probably use a service as a layer between the component and the store. However, for this project I went with a direct approach, did not see the point of overcomplicating the usage.

### Unit testing

For unit testing I used the default `Jasmine` and `Karma` setup that comes with `Angular CLI`. My preference is to use `Jest` combined with `Angular Testing Library` for unit testing. I thought it would be sufficient for this project.

### Styling & Design

For styling went with SCSS. I did not see a need for a styling library. I used `Flexbox` for layout and `CSS Grid` for the dice grid. Some components are not 100% styled like the `dice-sides-selector` and the `slider-display` they contain some native html elements that require extra attention to style. but with the time limitation it might differ per machine and browser.

For the design itself I went with a blocky and bright approach. It could be categorized a brutalism design. I thought it would be a fun approach for a dice roller.

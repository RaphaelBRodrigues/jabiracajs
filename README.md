![Licence](https://img.shields.io/badge/license-GNU-blue)
[![npm version](https://badge.fury.io/js/sweet-warning.svg)](https://www.npmjs.com/package/sweet-warning) 
[![npm](https://img.shields.io/npm/dm/sweet-warning.svg)](https://www.npmjs.com/package/sweet-warning)
![.github/workflows/release_on_npm.yml](https://github.com/raphaelbrodrigues/sweet-warning/actions/workflows/release_on_npm.yml/badge.svg)
![.github/workflows/test.yml](https://github.com/raphaelbrodrigues/sweet-warning/actions/workflows/test.yml/badge.svg)


# Sweet warning

This node package will play a sweet __sound__ when the things go wrong

## Usage
```sh
  npx sweet-warning
```
or 
```sh
  npm install -g sweet-warning
```
```sh
  sweet-warning
```

## Examples
Play the default sound once
```sh
  npx sweet-warning
```

Play the default sound how many times you want
```sh
  npx sweet-warning --repeat <times>
```
e.g
```sh
  npx sweet-warning --repeat 5
```

Play the default sound until ...
```sh
  npx sweet-warning --infinite
```

Using in a node project
```jsonp
// package.json

{
  "name": "test",
  "scripts": {
    "build": "tsc || npx sweet-warning"
  }
}
```

You can also set a custom sound using a `.wav` file and the `--filepath` flag
  ```sh
    npx sweet-warning --filename ./meu-deus-do-ceu-berg.wav
  ```
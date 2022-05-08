## tomou-na-jabiraca
This node package will play a sweet __tomou na jabiraca__ when the things go wrong

## Usage
```
  npx tomou-na-jabiraca
```
or 
```sh
  npm install -g tomou-na-jabiraca
```

## Examples
Play the default sound once
```sh
  npx tomou-na-jabiraca
```

Play the default sound how many times you want
```sh
  npx tomou-na-jabiraca --repeat <times>
```
e.g
```sh
  npx tomou-na-jabiraca --repeat 5
```

Play the default sound until ...
```sh
  npx tomou-na-jabiraca --infinite
```

Using in a node project
```jsonp
// package.json

{
  "name": "test",
  "scripts": {
    "build": "tsc || npx tomou-na-jabiraca"
  }
}
```

You can also set a custom sound using a `.wav` file and the `--filepath` flag
  ```sh
    npx tomou-na-jabiraca --filename ./meu-deus-do-ceu-berg.wav
  ```
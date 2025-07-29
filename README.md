# Legacy Business Registry

Design System proof of concept

## Getting Started

This project was created using:

- [Webpack](https://webpack.js.org/) as a web application bundler.
- [Yarn](https://classic.yarnpkg.com/en/) to manage project dependencies.
- [MapLibre](https://maplibre.org/) for map framework.

## Using in Your Project

1. Load package into your project
   ```
   yarn add @cityofdetroit/legacy-business-registry
   ```
   ```
   npm i @cityofdetroit/legacy-business-registry
   ```

## Contributing

### Setup Local Environment

1. Download the repo.
   ```
   $ git clone git@github.com:jedgar1mx/legacy-business-registry.git
   ```
2. Install node dependencies.

   ```
   $ yarn
   ```

3. Run local instance.

   ```
   $ yarn start
   ```

4. Build productions files.
   ```
   $ yarn build
   ```

### Formatting and Linting

The remote repository will enforce ESLint rules and Prettier formatting.

To check ESLint and Prettier formatting locally:

```
$ yarn lint
```

To format the code in `./src/`:

```
$ yarn prettier -w ./src
```

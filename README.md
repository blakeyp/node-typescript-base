## Starter template for Node.js/Typescript projects

### Node.js version
Run on latest version of Node to guarantee the widest compatibility with latest ECMAScript features including stage 3 ESNext features [https://node.green/#ESNEXT]

Lower the TS compilation target as appropriate if you need to run on older versions of Node.js

### CommonJS vs ES modules
Typescript by default compiles down to native Node CommonJS modules (ie. `require` syntax). However, the latest versions of Node (>=v15.3.0) now support ES modules (ie. import/export) without an experimental flag. This additionally enables extra language features such as top-level await

To switch to ESM, change type in package.json to "module" and set target and module in tsconfig to "ESNext"

Important: ESM requires fully-qualified import paths, meaning you'll need to specify '.js' extension on imports in TS source [https://github.com/microsoft/TypeScript/issues/16577]

### Enable source maps
npm start runs Node with the `--enable-source-maps` flag (>=v12.12.0) - this caches source maps such that stack traces reference the original TS source,
rather than the js dist output, which makes debugging easier
[https://nodejs.medium.com/source-maps-in-node-js-482872b56116]

### Incremental build
To speed up recompile times when making changes, npm run build uses the --incremental flag [https://github.com/microsoft/TypeScript/issues/16577]

### Npm scripts

#### Watch
Watch command uses nodemon to watch for TS source changes, rebuild and run

#### Debug
Debug command waits for debugger to be attached (via VSCode 'Attach' config in launch.json). Can also use with watch command

#### Lint
Runs ESLint using its recommended rules for JS and extended ruleset for Typescript

### Updating packages
`npm outdated` - see which packages are due updating

`npx npm-check-updates -u` - update to latest versions including major

`npm update` - install updated versions

### Typescript version in VSCode
Specify `"typescript.tsdk": "./node_modules/typescript/lib"` in .vscode/settings.json to force VSCode to use the locally (project) installed version of TS

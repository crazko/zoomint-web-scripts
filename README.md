# Common web scripts

⚒ Work in Progress 👷‍♂️

TODO:

- \*ignore files support
- husky

## Usage

Install:

```sh
npm i -D @zoomint/web-scripts
```

Add the scripts and commit hooks to your `package.json`:

```json
{
  "scripts": {
    "audit": "web-scripts audit",
    "format": "web-scripts format",
    "lint": "web-scripts lint",
    "test": "web-scripts test"
  }
  // "husky": {
  //   "hooks": {
  //     "commit-msg": "web-scripts commitmsg",
  //     "pre-commit": "web-scripts precommit"
  //   }
  // }
}
```

Add following files to your project's root directory:

`prettier.config.js`:

```js
module.exports = require('@zoomint/web-scripts/lib/configs/prettier.config');
```

## Extending default configuration

### Web Scripts

Add `web-scripts.config.js`:

```js
module.exports = Object.assign({}, require('@zoomint/web-scripts/lib/configs/web-scripts.config'), {
  // ...
});
```

Options:

| Property name            | Default Value     | Description                                                           |
| ------------------------ | ----------------- | --------------------------------------------------------------------- |
| `auditFilename`          | `vulnerabilities` | Filename of the vulnerabilities report                                |
| `auditLevel`             | `critical`        | Severity level of [`audit command`](https://docs.npmjs.com/cli/audit) |
| `testResultsDestination` | `./test-results`  | Directory for code coverage, vulnerabilities report                   |

### Linting

Add `.eslintrc.js`:

```js
module.exports = {
  extends: ['./node_modules/@zoomint/web-scripts/lib/configs/eslintrc.js'],
  // ...
};
```

### Testing

Add `jest.config.js`:

```js
module.exports = Object.assign({}, require('@zoomint/web-scripts/lib/configs/jest.config'), {
  // ...
});
```

## Development

### Scripts

| `npm run ...` | Description              |
| ------------- | ------------------------ |
| `audit`       | runs a security audit    |
| `build`       | builds the web scripts   |
| `clean`       | cleans `./lib` directory |
| `format`      | formats source files     |
| `lint`        | runs linter              |
| `test`        | runs tests               |

---

## Sources in no particular order:

- https://github.com/spotify/web-scripts
- https://github.com/sindresorhus/awesome-nodejs#command-line-utilities
- http://yargs.js.org/docs/
- https://github.com/sindresorhus/meow
- https://github.com/sw-yx/cli-cheatsheet
- https://oclif.io/docs/
- https://github.com/sw-yx/egghead-cli-workshop
- https://egghead.io/courses/build-custom-cli-tooling-with-oclif-and-react-ink
- https://github.com/kentcdodds/kcd-scripts/

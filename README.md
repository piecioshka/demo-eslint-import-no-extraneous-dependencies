# demo-eslint-import-no-extraneous-dependencies

🚁 Demo of ESLint plugin "import" and rule "no-extraneous-dependencies"

This project demonstrates how path-based allowances impact the `import/no-extraneous-dependencies` rule from `eslint-plugin-import`.

## Current intent

`debug` is listed under `devDependencies` but is imported from two places:

- `src/index.js` (allowed — `src/**` is whitelisted)
- `shared/shared.js` (not allowed — `shared/**` is NOT whitelisted)

Running ESLint will therefore report an error for `shared/shared.js` only. This shows how narrowing the allowed globs helps catch accidental dev-only imports in shared/runtime code.

## Project layout

```
shared/
  shared.js      # Imports debug (should trigger error)
src/
  index.js       # Imports debug (allowed by config)
tests/
  example.spec.js # Uses Node's built-in test/assert modules
```

## ESLint configuration (excerpt from `.eslintrc.json`)

```jsonc
{
  "plugins": ["import"],
  "extends": ["eslint:recommended", "plugin:import/recommended"],
  "rules": {
    "import/no-extraneous-dependencies": [
      "error",
      {
        // BAD (demo): shared/** omitted so dev deps forbidden there
        "devDependencies": ["src/**", "tests/**"]
      }
    ]
  }
}
```

To allow `debug` inside `shared/`, you would extend the glob list:

```jsonc
"devDependencies": ["shared/**", "src/**", "tests/**"]
```

## Usage

```fish
npm install
npm run lint
```

Expected ESLint output will include an error similar to:

```
shared/shared.js  error  'debug' should be listed in the project's dependencies, not devDependencies  import/no-extraneous-dependencies
```

Tests (optional demonstration of code structure):

```fish
npm test
```

## Adjusting behavior

- Add or remove glob patterns under `devDependencies` to refine where dev-only packages can appear.
- Keep dev-only utilities out of shared/runtime folders to avoid shipping them inadvertently.

## License

Public Domain / Unlicensed example.

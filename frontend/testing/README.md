# Why is there a `testing/` directory?

Next.js with Turbopack does **not** support having a `babel.config.js` (or `.babelrc`) in your project root. If you add a Babel config file, Turbopack will refuse to start, showing an error like:

```
⨯ You are using configuration and/or tools that are not yet
supported by Next.js with Turbopack:
Babel detected (babel.config.js)
  Babel is not yet supported. To use Turbopack at the moment,
  you'll need to remove your usage of Babel.
```

However, Jest (with babel-jest) **requires** a Babel config file to transform TypeScript/JSX for unit tests.

**Solution:**
- The `testing/` directory contains a `babel.config.js` used **only for Jest**.
- The Jest config (`jest.config.js`) is set to use this file via the `configFile` option for `babel-jest`.
- This allows you to run unit tests with Babel and Jest, while still using Turbopack for Next.js development/builds.

**Summary:**
- Keep all Babel config for testing in `testing/babel.config.js`.
- Do not put a `babel.config.js` or `.babelrc` in the project root.
- This setup avoids conflicts with Turbopack and keeps both testing and development workflows working smoothly.

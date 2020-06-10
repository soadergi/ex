module.exports = {
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
  },
  extends: [
    "airbnb",
    'plugin:node/recommended',
    'plugin:import/errors',
    //TODO: connect prettier back
    // 'plugin:prettier/recommended',
  ],
  "env": {
    "browser": true,
  },
  "rules": {
    //TODO: connect prettier back
    // 'prettier/prettier': [2],
    "react/jsx-props-no-spreading": [0],
    "import/no-unresolved": [0],
    "react/destructuring-assignment": [2],
    "prefer-destructuring": [0],
    "jsx-a11y/no-static-element-interactions": [0],
    "linebreak-style": [0],
    "react/jsx-filename-extension": [0],
    "import/prefer-default-export": [0],

    "jsx-a11y/click-events-have-key-events": [1],
    "jsx-a11y/anchor-is-valid": [1],
    "jsx-a11y/label-has-associated-control": [0],
    "jsx-a11y/label-has-for": [0],
    "max-len": [2, { "code": 120 }],
    "react/jsx-one-expression-per-line": [2],
    "semi": [2, "never"],
    "import/order": [2, {
      "newlines-between": "always",
      "groups": [
        "builtin",
        "external",
        "internal",
        "parent",
        "sibling",
        "index",
      ]
    }],
    "react/jsx-max-props-per-line": [2, {
      "maximum": 1, "when": "always"
    }],
    "no-implicit-globals": [2],
    "react/prop-types": [0],
    "react-hooks/rules-of-hooks": [2], // Checks rules of Hooks
    "arrow-parens": [2, "as-needed", { "requireForBlockBody": true }],
    "react-hooks/exhaustive-deps": [1], // Checks effect dependencies
    "max-lines": [2, {"max": 200, "skipBlankLines": true, "skipComments": true}],
    //TODO: think about this
    "node/no-unsupported-features/es-syntax": 0,
    "node/no-missing-import": 0,
    "node/no-unpublished-require": 0,
  }
}


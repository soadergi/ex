module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true,
    "jasmine": true,
    "es6": true,
  },
  "globals": {
    "isProdOrAnalyze": false,
    "LOOKUP": false,
  },
  "plugins": [
    "react-hooks"
  ],
  "rules": {
    "react/jsx-props-no-spreading": [0],
    "react/destructuring-assignment": [1],
    "import/no-unresolved": [0],
    "prefer-destructuring": [0],
    "import/extensions": [0],
    "react/no-danger": [0],
    "jsx-a11y/no-static-element-interactions": [0],
    "linebreak-style": [0],
    "react/jsx-filename-extension": [1, { "extensions": [".js"] }],
    "import/prefer-default-export": [0],

    "jsx-a11y/click-events-have-key-events": [1],
    "jsx-a11y/anchor-is-valid": [1],
    "jsx-a11y/label-has-associated-control": [0],
    "jsx-a11y/label-has-for": [0],
    "max-len": [2, { "code": 120 }],
    "react/jsx-one-expression-per-line": [2],
    "semi": [2, "never"],
    "react/jsx-max-props-per-line": [2, {
      "maximum": 1, "when": "always"
    }],
    "no-empty-pattern": [0],
    "no-implicit-globals": [2],
    "react/prop-types": [2, {
      ignore: ['i18nTexts', 'globalScope']
    }],
    "arrow-parens": [2, "as-needed", { "requireForBlockBody": true }],
    "import/no-webpack-loader-syntax": [0],
    "no-magic-numbers": [2, { ignore: [-1, 0, 1, 2, 1000, 60, 24]}],
    "no-multiple-empty-lines": [2, {"max": 1, "maxEOF": 0}],
    "react-hooks/rules-of-hooks": [2], // Checks rules of Hooks
    "react-hooks/exhaustive-deps": 'warn',
    "import/order": ["error", {
      "newlines-between": "always",
      "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
      "pathGroups": [
        {
          "pattern": "weplay-singleton/**",
          "group": "internal",
          "position": "after"
        },
        {
          "pattern": "weplay-core/**",
          "group": "internal",
          "position": "after"
        },
        {
          "pattern": "weplay-components/**",
          "group": "internal",
          "position": "after"
        },
        {
          "pattern": "weplay-platform/**",
          "group": "internal",
          "position": "after"
        },
        {
          "pattern": "weplay-competitive/**",
          "group": "internal",
          "position": "after"
        },
        {
          "pattern": "weplay-events/**",
          "group": "internal",
          "position": "after"
        },
        {
          "pattern": "weplay-media/**",
          "group": "internal",
          "position": "after"
        },
        {
          "pattern": "weplay-mini-games/**",
          "group": "internal",
          "position": "after"
        },
         //TODO we need to think about general rule for src folder
        {
          "pattern": "components/**",
          "group": "internal",
          "position": "after"
        },
        {
          "pattern": "reduxs/**",
          "group": "internal",
          "position": "after"
        },
        {
          "pattern": "pages/**",
          "group": "internal",
          "position": "after"
        },
        {
          "pattern": "legacy-components/**",
          "group": "internal",
          "position": "after"
        },
        {
          "pattern": "hooks/**",
          "group": "internal",
          "position": "after"
        },
        {
          "pattern": "assets/**",
          "group": "internal",
          "position": "after"
        },
        {
          "pattern": "customPropTypes/**",
          "group": "internal",
          "position": "after"
        },
        {
          "pattern": "_pages/**",
          "group": "internal",
          "position": "after"
        },
        {
          "pattern": "helpers/**",
          "group": "internal",
          "position": "after"
        }
      ],
      pathGroupsExcludedImportTypes: [
        'weplay-singleton',
        'weplay-core',
        'weplay-components',
        'weplay-competitive',
        'weplay-events',
        'weplay-media',
        'weplay-platform',
      ]
    }],
    "max-lines": [2, {"max": 200, "skipBlankLines": true, "skipComments": true}],
  }
}

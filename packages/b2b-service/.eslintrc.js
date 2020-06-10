module.exports = {
  "extends": ["../../.eslintrc.js"],
  "env": {
    "browser": true,
    "node": true,
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["packages/b2b-service/src"]
      }
    }
  },
  "rules": {
    "import/no-unresolved": [2],
    "react/prop-types": [0],
    "react-hooks/exhaustive-deps": [2], // Checks effect dependencies
  }
}


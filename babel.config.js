module.exports = function config(api) {
  api.cache(true)
  return {
    env: {
      next: {
        presets: [
          ['next/babel', {
            'preset-env': {
              targets: [
                '> 1%',
                'last 2 versions',
              ],
            },
            'transform-runtime': {},
            'styled-jsx': {},
            'class-properties': {},
          }],
        ],
      },
    },
    presets: [
      ['@babel/preset-env', {
        targets: [
          '> 1%',
          'last 2 versions',
        ],
      }],
      '@babel/preset-react',
    ],
    plugins: [
      ['ramda', {
        useES: true,
      }],
      'lodash',
      '@babel/plugin-proposal-function-bind',

      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-logical-assignment-operators',
      [
        '@babel/plugin-proposal-optional-chaining',
        { loose: false },
      ],
      [
        '@babel/plugin-proposal-pipeline-operator',
        { proposal: 'minimal' },
      ],
      [
        '@babel/plugin-proposal-nullish-coalescing-operator',
        { loose: false },
      ],
      '@babel/plugin-proposal-do-expressions',

      [
        '@babel/plugin-proposal-decorators',
        { legacy: true },
      ],
      '@babel/plugin-proposal-function-sent',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-numeric-separator',
      '@babel/plugin-proposal-throw-expressions',

      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-syntax-import-meta',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-json-strings',
    ],
    // eslint-disable-next-line max-len
    ignore: [/node_modules\/(?!weplay-components|weplay-core|weplay-singleton|weplay-competitive|weplay-media|weplay-mini-games|weplay-platform|weplay-events\/).*/],
  }
}

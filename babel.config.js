module.exports = {
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-react', {
      runtime: 'automatic',
      development: process.env.NODE_ENV === 'development',
      importSource: '@welldone-software/why-did-you-render',
    },
    ['@babel/preset-env', {
      bugfixes: true,
      loose: true,
      targets: {
        esmodules: true,
      }
    }],
  ],
  plugins: [['@babel/plugin-proposal-class-properties', { loose: true }]],
};

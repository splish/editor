module.exports = api => {
  const isProduction = () => process.env.NODE_ENV === 'production'
  api.cache(isProduction)

  return {
    // TODO: we need @babel/preset-flow here because of https://github.com/babel/babel-loader/issues/624
    presets: ['@splish-me/editor-babel-preset/src', '@babel/preset-flow']
  }
}

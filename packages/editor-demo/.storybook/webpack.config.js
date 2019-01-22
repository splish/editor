module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [
        [
          require.resolve('babel-preset-react-app'),
          { flow: false, typescript: true }
        ]
      ],
      plugins: [
        [
          require.resolve('babel-plugin-module-resolver'),
          {
            alias: {
              '@splish-me/editor': '@splish-me/editor/src',
              '@splish-me/editor-html-renderer':
                '@splish-me/editor-html-renderer/src',
              '@splish-me/editor-plugin-text':
                '@splish-me/editor-plugin-text/src',
              '@splish-me/editor-plugin-text-plugin':
                '@splish-me/editor-plugin-text-plugin/src',
              '@splish-me/editor-plugin-text-plugin-code':
                '@splish-me/editor-plugin-text-plugin-code/src',
              '@splish-me/editor-plugin-text-plugin-headings':
                '@splish-me/editor-plugin-text-plugin-headings/src',
              '@splish-me/editor-plugin-text-plugin-link':
                '@splish-me/editor-plugin-text-plugin-link/src',
              '@splish-me/editor-plugin-text-plugin-lists':
                '@splish-me/editor-plugin-text-plugin-lists/src',
              '@splish-me/editor-plugin-text-plugin-paragraph':
                '@splish-me/editor-plugin-text-plugin-paragraph/src',
              '@splish-me/editor-plugin-text-plugin-rich-text':
                '@splish-me/editor-plugin-text-plugin-rich-text/src',
              '@splish-me/editor-plugin-text-plugin-ui':
                '@splish-me/editor-plugin-text-plugin-ui/src',
              '@splish-me/editor-plugin-text-renderer':
                '@splish-me/editor-plugin-text-renderer/src',
              '@splish-me/editor-renderer': '@splish-me/editor-renderer/src',
              '@splish-me/editor-shared': '@splish-me/editor-shared/src',
              '@splish-me/editor-ui': '@splish-me/editor-ui/src'
            }
          }
        ]
      ]
    }
  })
  config.resolve.extensions.push('.ts', '.tsx')
  return config
}

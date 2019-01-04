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
              '@splish-me/editor-core': '@splish-me/editor-core/src',
              '@splish-me/editor-core-contexts':
                '@splish-me/editor-core-contexts/src',
              '@splish-me/editor-core-document':
                '@splish-me/editor-core-document/src',
              '@splish-me/editor-html-renderer':
                '@splish-me/editor-html-renderer/src',
              '@splish-me/editor-renderer': '@splish-me/editor-renderer/src',
              '@splish-me/editor-types': '@splish-me/editor-types/src',
              '@splish-me/ory-editor-core': '@splish-me/ory-editor-core/src',
              '@splish-me/plugin-text': '@splish-me/plugin-text/src',
              '@splish-me/plugin-text-plugin':
                '@splish-me/plugin-text-plugin/src',
              '@splish-me/plugin-text-plugin-code':
                '@splish-me/plugin-text-plugin-code/src',
              '@splish-me/plugin-text-plugin-paragraph':
                '@splish-me/plugin-text-plugin-paragraph/src',
              '@splish-me/plugin-text-renderer':
                '@splish-me/plugin-text-renderer/src',
              '@splish-me/ui-add-sidebar': '@splish-me/ui-add-sidebar/src',
              '@splish-me/ui-mode-toolbar': '@splish-me/ui-mode-toolbar/src',
              '@splish-me/ui-plugin-sidebar':
                '@splish-me/ui-plugin-sidebar/src',
              '@splish-me/ui-sidebar': '@splish-me/ui-sidebar/src'
            }
          }
        ]
      ]
    }
  })
  config.resolve.extensions.push('.ts', '.tsx')
  return config
}

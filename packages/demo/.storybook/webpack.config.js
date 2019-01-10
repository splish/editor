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
              '@splish-me/editor-core-html-renderer':
                '@splish-me/editor-core-html-renderer/src',
              '@splish-me/editor-core-renderer':
                '@splish-me/editor-core-renderer/src',
              '@splish-me/editor-plugin-types':
                '@splish-me/editor-core-types/src',
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
              '@splish-me/editor-ui-add-sidebar':
                '@splish-me/editor-ui-add-sidebar/src',
              '@splish-me/editor-ui-mode-toolbar':
                '@splish-me/editor-ui-mode-toolbar/src',
              '@splish-me/editor-ui-plugin-sidebar':
                '@splish-me/editor-ui-plugin-sidebar/src',
              '@splish-me/editor-ui-plugin-toolbar':
                '@splish-me/editor-ui-plugin-toolbar/src',
              '@splish-me/editor-ui-sidebar':
                '@splish-me/editor-ui-sidebar/src',
              '@splish-me/ory-editor-core': '@splish-me/ory-editor-core/src'
            }
          }
        ]
      ]
    }
  })
  config.resolve.extensions.push('.ts', '.tsx')
  return config
}

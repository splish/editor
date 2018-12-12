# Changelog

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [0.1.0]

### Added

- Use [front-slate-edit-list](https://github.com/frontapp/slate-edit-list)

### Changed

- Update to `slate@^0.41.0`

### Breaking Changes

- Remove `createToggleUnorderedList` resp. `createToggleOrderedList` in favor for `toggleUnorderedList` resp. `toggleOrderedList` in lists plugin
- Remove `defaultNode` from `SlatePluginOptions`, i.e. it is always fixed by the shipped default node of the paragraph plugin

[unreleased]: https://github.com/splish-me/editor/tree/master/packages/slate
[0.1.0]: https://github.com/splish-me/editor/tree/@splish-me%2Feditor-plugin-slate@0.1.0/packages/slate
[0.0.12]: https://github.com/splish-me/editor/tree/b26cd3de573d896888626a7e1e4f7e199c73861b/packages/slate

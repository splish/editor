'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.A = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _link = require('material-ui/svg-icons/content/link');

var _link2 = _interopRequireDefault(_link);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _helpers = require('../../helpers');

var _Plugin2 = require('../Plugin');

var _Plugin3 = _interopRequireDefault(_Plugin2);

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _slate = require('slate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This file is part of ORY Editor.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ORY Editor is free software: you can redistribute it and/or modify
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * it under the terms of the GNU Lesser General Public License as published by
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * the Free Software Foundation, either version 3 of the License, or
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * (at your option) any later version.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ORY Editor is distributed in the hope that it will be useful,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * but WITHOUT ANY WARRANTY; without even the implied warranty of
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * GNU Lesser General Public License for more details.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You should have received a copy of the GNU Lesser General Public License
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license LGPL-3.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright 2016-2018 Aeneas Rekkas
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/* eslint-disable no-alert, prefer-reflect, default-case, react/display-name */


var A = exports.A = 'LINK/LINK';

var Button = function (_Component) {
  _inherits(Button, _Component);

  function Button() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Button);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Button.__proto__ || Object.getPrototypeOf(Button)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      open: false,
      href: '',
      title: '',
      hadLinks: false
    }, _this.onRef = function (component) {
      if (!component && true) {
        return null;
      }

      var e = component.querySelector('input');
      if (e) {
        e.focus();
      }
    }, _this.onClick = function (e) {
      var _this$props = _this.props,
          editorState = _this$props.editorState,
          onChange = _this$props.onChange;

      e.preventDefault();

      var hasLinks = editorState.inlines.some(function (inline) {
        return inline.type === A;
      });

      if (hasLinks) {
        var newState = editorState.transform().unwrapInline(A).apply();
        onChange(newState);
      } else if (editorState.isExpanded) {
        _this.setState({
          open: true,
          wasExpanded: editorState.isExpanded,
          href: '',
          title: '',
          hadLinks: hasLinks
        });
      } else {
        _this.setState({
          open: true,
          wasExpanded: editorState.isExpanded,
          href: '',
          title: '',
          hadLinks: hasLinks
        });
      }
    }, _this.handleClose = function () {
      _this.setState({ open: false });

      var newState = _this.props.editorState.transform().focus().apply();
      window.setTimeout(function () {
        return _this.props.onChange(newState);
      }, 1);
    }, _this.handleSubmit = function () {
      _this.setState({ open: false });

      if (!_this.state.href) {
        _this.handleClose();
        return;
      }

      if (_this.state.wasExpanded) {
        var _newState = _this.props.editorState.transform().focus().apply().transform().wrapInline({
          type: A,
          data: { href: _this.state.href }
        }).collapseToEnd().apply();

        window.setTimeout(function () {
          return _this.props.onChange(_newState);
        }, 1);
        window.setTimeout(function () {
          return _this.props.focus();
        }, 100);
        return;
      }

      if (!_this.state.title) {
        _this.handleClose();
        return;
      }

      var newState = _this.props.editorState.transform().insertText(_this.state.title).extend(-_this.state.title.length).wrapInline({
        type: A,
        data: { href: _this.state.href }
      }).collapseToEnd().focus().apply();

      _this.props.onChange(newState);
      window.setTimeout(function () {
        return _this.props.focus();
      }, 100);
    }, _this.onHrefChange = function (e) {
      _this.setState({ href: e.target.value });
    }, _this.onTitleChange = function (e) {
      _this.setState({ title: e.target.value });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Button, [{
    key: 'render',
    value: function render() {
      var actions = [_react2.default.createElement(_FlatButton2.default, {
        key: '0',
        label: 'Cancel',
        primary: true,
        onTouchTap: this.handleClose
      }), _react2.default.createElement(_FlatButton2.default, {
        key: '1',
        label: 'Submit',
        primary: true,
        onTouchTap: this.handleSubmit
      })];
      var editorState = this.props.editorState;


      var hasLinks = editorState.inlines.some(function (inline) {
        return inline.type === A;
      });
      return _react2.default.createElement(
        _MuiThemeProvider2.default,
        { muiTheme: (0, _getMuiTheme2.default)() },
        _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(_helpers.ToolbarButton, {
            onClick: this.onClick,
            isActive: hasLinks,
            icon: _react2.default.createElement(_link2.default, null)
          }),
          _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(
              _Dialog2.default,
              {
                className: 'ory-prevent-blur',
                title: 'Create a link',
                modal: false,
                open: this.state.open,
                actions: [actions]
              },
              this.state.wasExpanded ? null : _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_TextField2.default, {
                  hintText: 'Link title',
                  onChange: this.onTitleChange,
                  value: this.state.title
                })
              ),
              _react2.default.createElement(
                'div',
                { ref: this.onRef },
                _react2.default.createElement(_TextField2.default, {
                  hintText: 'http://example.com/my/link.html',
                  onChange: this.onHrefChange,
                  value: this.state.href
                })
              )
            )
          )
        )
      );
    }
  }]);

  return Button;
}(_react.Component);

var LinkPlugin = function (_Plugin) {
  _inherits(LinkPlugin, _Plugin);

  function LinkPlugin() {
    var _ref2;

    var _temp2, _this2, _ret2;

    _classCallCheck(this, LinkPlugin);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref2 = LinkPlugin.__proto__ || Object.getPrototypeOf(LinkPlugin)).call.apply(_ref2, [this].concat(args))), _this2), _this2.name = 'link', _this2.nodes = _defineProperty({}, A, _node2.default), _this2.hoverButtons = [Button], _this2.toolbarButtons = [Button], _this2.deserialize = function (el, next) {
      switch (el.tagName.toLowerCase()) {
        case 'a':
          return {
            kind: 'inline',
            type: A,
            nodes: next(el.childNodes),
            data: _slate.Data.create({
              href: (el.attrs.find(function (_ref3) {
                var name = _ref3.name;
                return name === 'href';
              }) || {
                value: ''
              }).value
            })
          };
      }
    }, _this2.serialize = function (object, children) {
      if (object.kind !== 'inline') {
        return;
      }
      switch (object.type) {
        case A:
          return _react2.default.createElement(
            'a',
            { href: object.data.get('href') },
            children
          );
      }
    }, _temp2), _possibleConstructorReturn(_this2, _ret2);
  }

  return LinkPlugin;
}(_Plugin3.default);

exports.default = LinkPlugin;
//# sourceMappingURL=index.js.map
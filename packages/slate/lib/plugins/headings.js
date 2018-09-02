'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.H6 = exports.H5 = exports.H4 = exports.H3 = exports.H2 = exports.H1 = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _looksOne = require('material-ui/svg-icons/image/looks-one');

var _looksOne2 = _interopRequireDefault(_looksOne);

var _looksTwo = require('material-ui/svg-icons/image/looks-two');

var _looksTwo2 = _interopRequireDefault(_looksTwo);

var _looks = require('material-ui/svg-icons/image/looks-3');

var _looks2 = _interopRequireDefault(_looks);

var _looks3 = require('material-ui/svg-icons/image/looks-4');

var _looks4 = _interopRequireDefault(_looks3);

var _looks5 = require('material-ui/svg-icons/image/looks-5');

var _looks6 = _interopRequireDefault(_looks5);

var _looks7 = require('material-ui/svg-icons/image/looks-6');

var _looks8 = _interopRequireDefault(_looks7);

var _helpers = require('../helpers');

var _Plugin2 = require('./Plugin');

var _Plugin3 = _interopRequireDefault(_Plugin2);

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

/* eslint-disable prefer-reflect, default-case, react/display-name */

// import { Data } from 'slate'


var H1 = exports.H1 = 'HEADINGS/HEADING-ONE';
var H2 = exports.H2 = 'HEADINGS/HEADING-TWO';
var H3 = exports.H3 = 'HEADINGS/HEADING-THREE';
var H4 = exports.H4 = 'HEADINGS/HEADING-FOUR';
var H5 = exports.H5 = 'HEADINGS/HEADING-FIVE';
var H6 = exports.H6 = 'HEADINGS/HEADING-SIX';

var createNode = function createNode(type, el, next) {
  return {
    kind: 'block',
    type: type,
    // data: Data.create({ style: el.attribs.style }),
    nodes: next(el.childNodes)
  };
};

var HeadingsPlugin = function (_Plugin) {
  _inherits(HeadingsPlugin, _Plugin);

  function HeadingsPlugin(props) {
    var _this$nodes;

    _classCallCheck(this, HeadingsPlugin);

    var _this = _possibleConstructorReturn(this, (HeadingsPlugin.__proto__ || Object.getPrototypeOf(HeadingsPlugin)).call(this, props));

    _this.createButton = function (type, icon) {
      return function (_ref) {
        var editorState = _ref.editorState,
            onChange = _ref.onChange;

        var onClick = function onClick(e) {
          e.preventDefault();

          var isActive = editorState.blocks.some(function (block) {
            return block.type === type;
          });

          onChange(editorState.transform().setBlock(isActive ? _this.DEFAULT_NODE : type).apply());
        };

        var isActive = editorState.blocks.some(function (block) {
          return block.type === type;
        });

        return _react2.default.createElement(_helpers.ToolbarButton, { onClick: onClick, isActive: isActive, icon: icon });
      };
    };

    _this.name = 'headings';
    _this.nodes = (_this$nodes = {}, _defineProperty(_this$nodes, H1, (0, _helpers.makeTagNode)('h1')), _defineProperty(_this$nodes, H2, (0, _helpers.makeTagNode)('h2')), _defineProperty(_this$nodes, H3, (0, _helpers.makeTagNode)('h3')), _defineProperty(_this$nodes, H4, (0, _helpers.makeTagNode)('h4')), _defineProperty(_this$nodes, H5, (0, _helpers.makeTagNode)('h5')), _defineProperty(_this$nodes, H6, (0, _helpers.makeTagNode)('h6')), _this$nodes);
    _this.toolbarButtons = [_this.createButton(H1, _react2.default.createElement(_looksOne2.default, null)), _this.createButton(H2, _react2.default.createElement(_looksTwo2.default, null)), _this.createButton(H3, _react2.default.createElement(_looks2.default, null)), _this.createButton(H4, _react2.default.createElement(_looks4.default, null)), _this.createButton(H5, _react2.default.createElement(_looks6.default, null)), _this.createButton(H6, _react2.default.createElement(_looks8.default, null))];

    _this.deserialize = function (el, next) {
      switch (el.tagName.toLowerCase()) {
        case 'h1':
          return createNode(H1, el, next);
        case 'h2':
          return createNode(H2, el, next);
        case 'h3':
          return createNode(H3, el, next);
        case 'h4':
          return createNode(H4, el, next);
        case 'h5':
          return createNode(H5, el, next);
        case 'h6':
          return createNode(H6, el, next);
      }
    };

    _this.serialize = function (object, children) {
      if (object.kind !== 'block') {
        return;
      }
      var style = { textAlign: object.data.get('align') };

      switch (object.type) {
        case H1:
          return _react2.default.createElement(
            'h1',
            { style: style },
            children
          );
        case H2:
          return _react2.default.createElement(
            'h2',
            { style: style },
            children
          );
        case H3:
          return _react2.default.createElement(
            'h3',
            { style: style },
            children
          );
        case H4:
          return _react2.default.createElement(
            'h4',
            { style: style },
            children
          );
        case H5:
          return _react2.default.createElement(
            'h5',
            { style: style },
            children
          );
        case H6:
          return _react2.default.createElement(
            'h6',
            { style: style },
            children
          );
      }
    };

    _this.DEFAULT_NODE = props.DEFAULT_NODE;
    return _this;
  }

  // eslint-disable-next-line react/display-name


  return HeadingsPlugin;
}(_Plugin3.default);

exports.default = HeadingsPlugin;
//# sourceMappingURL=headings.js.map
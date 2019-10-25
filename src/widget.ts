// Copyright (c) QuantStack
// Distributed under the terms of the Modified BSD License.

const d3Format = require('d3-format');

import {
  DOMWidgetModel, DOMWidgetView
} from '@jupyter-widgets/base';

import {
  MODULE_NAME, MODULE_VERSION
} from './version';

// Load CSS
import '../css/textslider.css';


export
class TextSliderModel extends DOMWidgetModel {
  defaults() {
    return {...super.defaults(),
      _model_name: TextSliderModel.model_name,
      _model_module: TextSliderModel.model_module,
      _model_module_version: TextSliderModel.model_module_version,
      _view_name: TextSliderModel.view_name,
      _view_module: TextSliderModel.view_module,
      _view_module_version: TextSliderModel.view_module_version,
      value : 0
    };
  }

  static model_name = 'TextSliderModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'TextSliderView';
  static view_module = MODULE_NAME;
  static view_module_version = MODULE_VERSION;
}


export
class TextSliderView extends DOMWidgetView {
  render() {
    // Initialize text formatter
    this.model.on("change:format", () => {
      this.formatter = d3Format.format(this.model.get("format"));
      this.updateText();
    });
    this.formatter = d3Format.format(this.model.get("format"));

    // Initialize text element
    this.textElement = document.createElement('span');
    this.textElement.classList.add('jupyter-widgets-textslider');
    this.textElement.title = 'Drag to adjust';

    this.el.appendChild(this.textElement);

    this.updateText();
    this.model.on('change:value', this.updateText.bind(this));
  }

  updateText() {
    this.textElement.textContent = this.formatter(this.model.get('value'));
  }

  textElement: HTMLSpanElement;
  formatter: (value: number) => string;

  model: TextSliderModel;
}

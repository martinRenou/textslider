// Copyright (c) QuantStack
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel, DOMWidgetView
} from '@jupyter-widgets/base';

import {
  MODULE_NAME, MODULE_VERSION
} from './version';


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
    this.value_changed();
    this.model.on('change:value', this.value_changed, this);
  }

  value_changed() {
    this.el.textContent = this.model.get('value');
  }

  model: TextSliderModel;
}

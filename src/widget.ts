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
    this.model.on('change:format', () => {
      this.formatter = d3Format.format(this.model.get('format'));
      this.updateText();
    });
    this.formatter = d3Format.format(this.model.get('format'));

    // Initialize text element
    this.textElement = document.createElement('span');
    this.textElement.classList.add('jupyter-widgets-textslider');
    this.textElement.title = 'Drag to adjust';

    this.el.appendChild(this.textElement);

    this.updateText();
    this.model.on('change:value', this.updateText.bind(this));

    // Initialize event listeners
    this.dragging = false;
    this.startDragX = null;
    this.startDragY = null;
    this.initialDragValue = null;
    this.dragListener = { handleEvent: this.drag.bind(this) };
    this.endDraggingListener = { handleEvent: this.endDragging.bind(this) };
    this.textElement.onmousedown = this.startDragging.bind(this);
  }

  /**
   * Update the text element.
   */
  updateText() {
    this.textElement.textContent = this.formatter(this.model.get('value'));
  }

  /**
   * Set the new widget value.
   */
  setValue(value: number) {
    const min = this.model.get('min');
    const max = this.model.get('max');

    if (min !== null && value < min) {
      value = min;
    }
    if (max !== null && value > max) {
      value = max;
    }

    if (value !== this.model.get('value')) {
      this.model.set('value', value);
      this.touch();
    }
  }

  /**
   * Return the value that is delta steps away from base.
   */
  adjust(base: number, delta: number) {
    return base + delta * this.model.get('step');
  }

  /**
   * Handle a mouse move that impacts the current value.
   */
  handleMouseMove(event: MouseEvent) {
    if (this.initialDragValue == null || this.startDragX == null) {
      return;
    }

    this.setValue(this.adjust(this.initialDragValue, Math.round((event.pageX - this.startDragX) / 10)));
  }

  /**
   * Start dragging, this will initialize the dragging and setup event listeners for mouse movements.
   */
  startDragging(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();

    this.dragging = true;
    this.startDragX = event.pageX;
    this.startDragY = event.pageY;
    this.initialDragValue = this.model.get('value');

    document.addEventListener('mousemove', this.dragListener);
    document.addEventListener('mouseup', this.endDraggingListener);
  }

  /**
   * Handle drag event, this will modify the value depending on the mouse position.
   */
  drag(event: MouseEvent) {
    this.handleMouseMove(event);
  }

  /**
   * End dragging, this will remove event listeners for mouse movements.
   */
  endDragging(event: MouseEvent) {
    this.handleMouseMove(event);

    document.removeEventListener('mousemove', this.dragListener);
    document.removeEventListener('mouseup', this.endDraggingListener);
  }

  textElement: HTMLSpanElement;
  formatter: (value: number) => string;

  dragging: boolean;
  startDragX: number | null;
  startDragY: number | null;
  initialDragValue: number | null;
  dragListener: EventListenerObject;
  endDraggingListener: EventListenerObject;

  model: TextSliderModel;
}

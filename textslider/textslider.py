#!/usr/bin/env python
# coding: utf-8

# Copyright (c) QuantStack.
# Distributed under the terms of the Modified BSD License.

"""
TextSlider widget
"""

from traitlets import Unicode, CFloat

from ipywidgets.widgets.widget_float import _BoundedFloat

from ._frontend import module_name, module_version


class TextSlider(_BoundedFloat):
    """A text element  that you can slide for changing its value."""

    format = Unicode('.1f').tag(sync=True)
    step = CFloat(0.1, help="Minimum step to increment the value").tag(sync=True)

    _view_name = Unicode('TextSliderView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _model_name = Unicode('TextSliderModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)

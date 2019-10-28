#!/usr/bin/env python
# coding: utf-8

# Copyright (c) QuantStack.
# Distributed under the terms of the Modified BSD License.

"""
TextSlider widget
"""

from traitlets import Unicode, CFloat, CInt

from ipywidgets.widgets.widget_float import _BoundedFloat
from ipywidgets.widgets.widget_int import _BoundedInt
from ipywidgets import NumberFormat

from ._frontend import module_name, module_version


class FloatTextSlider(_BoundedFloat):
    """A float text element  that you can slide for changing its value."""

    format = NumberFormat('.1f').tag(sync=True)
    step = CFloat(0.1, help="Minimum step to increment the value").tag(sync=True)

    _view_name = Unicode('FloatTextSliderView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _model_name = Unicode('FloatTextSliderModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)


class IntTextSlider(_BoundedInt):
    """An integer text element  that you can slide for changing its value."""

    format = NumberFormat('d').tag(sync=True)
    step = CInt(1, help="Minimum step to increment the value").tag(sync=True)

    _view_name = Unicode('IntTextSliderView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _model_name = Unicode('IntTextSliderModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)

tui.util.defineNamespace("fedoc.content", {});
fedoc.content["series_bubbleChartSeries.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview Bubble chart series component.\n * @author NHN Ent.\n *         FE Development Team &lt;dl_javascript@nhnent.com>\n */\n\n'use strict';\n\nvar Series = require('./series');\nvar CoordinateTypeSeriesBase = require('./coordinateTypeSeriesBase');\n\nvar BubbleChartSeries = tui.util.defineClass(Series, /** @lends BubbleChartSeries.prototype */ {\n    /**\n     * Bubble chart series component.\n     * @constructs BubbleChartSeries\n     * @extends Series\n     */\n    init: function() {\n        Series.apply(this, arguments);\n    },\n\n    /**\n     * Calculate step value for label axis.\n     * @returns {number}\n     * @private\n     */\n    _calculateStep: function() {\n        var step = 0;\n        var dimension, seriesDataModel, size, len;\n\n        if (this.dataProcessor.hasCategories()) {\n            dimension = this.boundsMaker.getDimension('series');\n            seriesDataModel = this.dataProcessor.getSeriesDataModel(this.seriesName);\n            len = this.dataProcessor.getCategories().length;\n\n            if (seriesDataModel.isXCountGreaterThanYCount()) {\n                size = dimension.height;\n            } else {\n                size = dimension.width;\n            }\n\n            step = size / len;\n        }\n\n        return step;\n    },\n\n    /**\n     * Make bound for bubble chart.\n     * @param {{x: number, y: number, r: number}} ratioMap - ratio map\n     * @param {number} positionByStep - position value by step\n     * @param {number} maxRadius - max radius\n     * @returns {{left: number, top: number, radius: number}}\n     * @private\n     */\n    _makeBound: function(ratioMap, positionByStep, maxRadius) {\n        var dimension = this.boundsMaker.getDimension('series');\n        var left = tui.util.isExisty(ratioMap.x) ? (ratioMap.x * dimension.width) : positionByStep;\n        var top = tui.util.isExisty(ratioMap.y) ? (ratioMap.y * dimension.height) : positionByStep;\n\n        return {\n            left: left,\n            top: dimension.height - top,\n            radius: Math.max(maxRadius * ratioMap.r, 2)\n        };\n    },\n\n    /**\n     * Make bounds for bubble chart.\n     * @returns {Array.&lt;Array.&lt;{left: number, top: number, radius: number}>>} positions\n     * @private\n     */\n    _makeBounds: function() {\n        var self = this;\n        var seriesDataModel = this.dataProcessor.getSeriesDataModel(this.seriesName);\n        var maxRadius = this.boundsMaker.getMaxRadiusForBubbleChart();\n        var step = this._calculateStep();\n        var start = step ? step / 2 : 0;\n\n        return seriesDataModel.map(function(seriesGroup, index) {\n            var positionByStep = start + (step * index);\n\n            return seriesGroup.map(function(seriesItem) {\n                var hasRationMap = (seriesItem &amp;&amp; seriesItem.ratioMap);\n\n                return hasRationMap ? self._makeBound(seriesItem.ratioMap, positionByStep, maxRadius) : null;\n            });\n        });\n    }\n});\n\nCoordinateTypeSeriesBase.mixin(BubbleChartSeries);\ntui.util.CustomEvents.mixin(BubbleChartSeries);\n\nmodule.exports = BubbleChartSeries;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"
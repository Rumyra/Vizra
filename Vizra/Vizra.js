import vizraUtils from './vizraUtils.js';
import VizraCanvas from './VizraCanvas.js';
import vizraPaths from './shape/vizraPaths.js';
import VizraShape from './shape/VizraShape.js';
import VizraCoords from './physics/VizraCoords.js';
import VizraColour from './colour/VizraColour.js';
import VizraPalette from './colour/VizraPalette.js';

import VizraAnalyser from './audio/vizraAnalyser.js';

// add an init for Vizra based on classed below needing canvas els and audio contexts etc... -> see setup in app

const Vizra = {};
Vizra.utils = vizraUtils;
Vizra.paths = vizraPaths;
Vizra.canvas = VizraCanvas;
Vizra.shape = VizraShape;
Vizra.coords = VizraCoords;
Vizra.colour = VizraColour;
Vizra.palette = VizraPalette;

Vizra.analyser = VizraAnalyser;

export default Vizra;
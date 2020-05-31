# Vizra
A set of libraries to generatively create canvas shapes: Still in version 0.000001

## Physics

A vector (VizVector) type, is used for the physics in the boid (VizBoid) which is then in turn used to build a grid of boids (VizGrid)

## Facade

A colour type (VizColour) is used with paths (VizPaths) to make up a tile (Viz Tile)

## State

Make all params global and included within master Viz - each input changes exactly the same param for each variation on the above - MIDI controllers are _not_ a different set up for each viz (a different viz is essentially a tile switch).

### Pads
- tile switch
- colour switch & FX
- grid switch

### CCs
- tile & path transforms
- colour FX
- boid physics
- grid params

### Audio
- all of the above (velocity peak for pads & velocity val for cc)

#### JS Doc Command

`~Vizra/Vizra jsdoc -c docs/config.json`

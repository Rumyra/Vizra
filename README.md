# Vizra
A set of libraries to generatively create canvas shapes: Still in version 0.000001

## Files

- physics/VizVector -> returns a vector type
- physics/VizGrid -> returns a generated grid of vector types based on input params

- colour/VizColour -> returns a colour type
- colour/VizPalette -> can be made from colours or pattern fills, returns colour types

- shape/vizPath -> a collection of 2d paths for use in shapes
- shape/VizShape -> returns a shape type
- shape/VizTile -> made from shape types

- state -> not done yet

- canvas/VizCanvas -> sets up a canvas element, with size, wrapper, dpr etc...
- canvas/VixScreen -> sets up the context using canvas, save images, pattern fills etc...

- utils -> a collection of utilities to use throughout lib. Mostly random number generation

## Physics

A vector (VizVector), is used to build a grid of boids (VizGrid)

Possibly add boid later

## Facade

Paths are used to create shapes (VizShape) which is then used to build tiles (VizTiles)

## Colour

A colour type (VizColour) or pattern fill (in context) is used to make up palettes (VizPalette)

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

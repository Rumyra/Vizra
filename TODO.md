# List of mods to put back into Vizra

- shape, vector, colour
- stage (extends/includes canvas)

# Mods from files moved
- vi.js /
- vicolour.js /
- vivector.js /
- canvas.js /
- coords.js /
- paths.js /
- utils.js /


# VECTOR ===============================
- move vector methods out of utils - it seems I have done this in Phyzra
- forces should be seperate to shape, so you can build up a shape from multiple paths and then apply forces
- make velocity and acceleration getters & setters
- setDirection sets acceleration
- it's the grid that should hold the physics, not the Vi which is the shape... -> maybe the vector object should have physics too -> maybe pass in the vector to vi, rather than creating a new one
- decide on a spelling for normalise
- scaledown is spelt wrong in vivector.js
- make sure physics works - have a good think
- edgebounce doesn't take into account dpi

# BOID ===============
- which collision function is right? Add to boid.js

# GRID ===============================
<!-- - consider taking clustering out of grid & put it into vis generation - I don't think I actually want to do this, we can update grid on raf call  -->
<!-- - where does coords sit now? Should canvas extend it? - no I think the way you've done it is fine -->
<!-- - need an xgridcount and ygridcount - how many items on each axis -> this has been started, needs to be read only and regenrated if the grid is -->
<!-- - the distribution could do with a 'denominator' - something to multiply the values by for different size screens -->
- REFACTOR ENTIRE CLASS AND THINK ABOUT PARENT CLASS
- iso needs square or real iso -> add a triangle ratio
<!-- - sort out offsetX and offsetY in vi -->
<!-- - check custom coords - can we input x: y: - make vector? -->
- consider different coord classes... a parent class, then grid, circular, random - these then get used in canvas class to generate the gris eneded for vis
<!-- - coords 85 _generated_ x & y -->
- xgridsize and ygridsize in coords need some adjustment for returning correct x y if custom
- custom coords need to be object - make sure documentation reflects
- polar coords should involve angle (o) like 08.js
- one line of grid coords
- added an iso2 which is real iso, iso as it stands is tri -> not true, iso2 is now equalateral tri, first iso was, well hacky, but keep it
- the other thing is something funny is going on with iso2 tesellation, I think it might be clustering
<!-- - added dense option to grid -->

# SHAPE/TILE ==========================
- Vi.js -> this.fillByColour = true, set fill needs to check if colour is set & return correct fill, as does context.fillStyle in _draw()
- add all created paths back to paths library
- canvas needs pattern functions - include simple offscreen
- add colour names to vicolour for fill
- stroke . hsla in Vi for colour
- sort out ability to do fill colour properly
- sort out vi scale
- make sure paths work with size
- what about shape.add to build up a shape from paths? (TILES)
- fix Vi stroke
- vi stroke and fill defaults should be determined based on canvas stroke & fill
- change the naming of paths?
- lots of things to think about with a vi - size get and set
- possibly add offset to constructor of Vi
- 24.js - the problem with passing in chance to the path function (which is what we want to do) is we need to do it 9 times, once for each square, otherwise it will just draw the whole thing

# UTILS ============================
- add/update noise functions
- X added utils.bellCurve

# COLOUR ==============================
- colour should be new colour or new pattern - pattern can take colours
- extend colour to have rgb
- better colour invert?
- lumshift, opshift etc... need to rotate
- pallettes would be good

# GENERAL =====================
- sort out import paths
- possible way to include 3D https://threejs.org/docs/index.html#manual/en/introduction/How-to-use-WebGL2
- see 14.js for param suggestion
- move tile and boid individual update() to one main update (like viz.draw())
- add global composite functionality to canvas
- if there's no typed om support in a browser the canvas can only be fullscreen
- offscreencanvas is not supported
- move tests & docs from lib and put them in parent dir

# Ideas for vis
- change the size of 02 - like Andy's t-shirt

---
layout: blog
title: 'What even is TileMill?'
category: blog
---

_The other day, my friend [Dave](http://twitter.com/allafarce) asked me, "Okay. So what does [TileMill](http://tilemill.com) **actually do**?" This was my response (with the curse words edited out, and a few links thrown in). I was told it'd be useful to people. Enjoy!_

-----------

**On Tue, Jan 28, 2014 at 3:43 PM, [Lyzi Diamond](http://lyzidiamond.com) wrote:**

TileMill allows you to load in [vector](http://en.wikipedia.org/wiki/GIS_file_formats#Vector_formats) and/or [raster](http://en.wikipedia.org/wiki/GIS_file_formats#Raster_formats) data, style it using a language called [CartoCSS](https://www.mapbox.com/tilemill/docs/manual/carto/) (often abbreviated "carto"), and export raster [map tiles](http://wiki.openstreetmap.org/wiki/Tiles). Map tiles can be exported as PNG, SVG, or [MBTiles](https://www.mapbox.com/developers/mbtiles/), which is [Mapbox](http://mapbox.com)'s format. TileMill also allows you to add feature layers on top of your tiles, which are vector layers that have some sort of interactivity (tooltips, for example).

TileMill only allows you to have one interactivity/feature layer at a time. Typically the interaction involves tooltips. That's the basic interactivity functionality built in to TileMill (you can do more stuff in [Leaflet](http://leafletjs.com), as I'm sure you know). Because you're loading in (mostly) vector layers that have a lot of data associated with them (attributes/properties/columns in a database table/whatever else you want to call it), you can pull from that data to make individualized tooltips without hardcoding them. There's more info on how to do that [here](https://www.mapbox.com/tilemill/docs/crashcourse/tooltips/).

Styling vector layers is also a pretty cool thing that can pull from attribute information -- if you wanted to make [graduated symbols](http://wiki.gis.com/wiki/index.php/Graduated_Symbols) based on the values of some attribute, you can do that within CartoCSS. There's a lot of functionality there. You can read more about styling in TileMill [here](https://www.mapbox.com/tilemill/docs/manual/carto/).

The bread and butter of TileMill is obviously tiles. It seems really trivial, right? Why can't I just draw some crap on some images and put those images in a map? There are a few reasons.

A map tile is a very specific thing. Map tiles are 256x256 pixel images that are placed side by side inside of a web map to give the illusion of one very large, seamless image. Maps have specific zoom levels that are explicitly defined, from zoom level 0 through zoom level 20. Zoom level 0 is one tile for the whole world. It looks like this:

<img src="/images/zoom0.png" class="inline">

Zoom level 1 is four tiles for the whole world, in a 2x2 grid. Zoom level 2 is 16 tiles for the whole world, in a 4x4 grid. You see where this is going.

Zoom levels are the same across all tilesets. Zoom level 0 is always going to be one tile for the world, 1 will be four tiles, etc. You can imagine that the whole world at zoom level 20 gets pretty unwieldy. It's a **lot** of data. When you're zoomed way in and panning around a map, only the tiles that are being viewed are rendered, and then cached. It's actually quite efficient and does create the illusion of a seamless image, because you are only ever rendering a subset of the tiles, which doesn't take very long.

The URL for the tile above is http://a.tiles.mapbox.com/v3/lyzidiamond.map-ietb6srb/0/0/0.png. The first part is obviously the server. The last three numbers, as I'm sure you've figured out, delineate the zoom level and the x/y location of that particular tile in the grid. Zoom 0 is a pretty bad example of this. Let's go to zoom 1.

<img src="/images/zoom-1-1-0.png" class="inline">

This is the tile in the first row in the second column of the zoom level 1 2x2 grid. Its URL is http://a.tiles.mapbox.com/v3/lyzidiamond.map-ietb6srb/1/1/0.png. You can see that at the end of the URL, it shows us that we're looking at a tile from zoom level 1 in the 1, 0 part of the grid.

<img src="/images/tilegrid.png" class="inline">

Two more, way zoomed in, just for fun:

<img src="/images/zoom-12-1009-1878.png" class="inline">

URL: http://a.tiles.mapbox.com/v3/lyzidiamond.map-ietb6srb/12/1009/1878.png

<img src="/images/zoom-12-1009-1879.png" class="inline">

URL: http://a.tiles.mapbox.com/v3/lyzidiamond.map-ietb6srb/12/1009/1879.png, or the tile right below the previous one. Get it? Pretty cool, right?

So you've now deduced that there's a pretty rigorous file structure that is required to manage all of this.

<img src="/images/tile-files.png" class="inline">

Notice that in this image, it doesn't have every zoom level, or even the entirety of the grid. TileMill will ask you for a) a geographic area and b) the number of zoom levels you want before you export. If you're trying to do something too epically large, or with a ton of layers that are going to be annoying/resource-consuming to render down, it'll give you a nice little warning, along the lines of "HEY JERKFACE WE DON'T WANNA DO THAT FIX YR STUFF." But nicer. Then they export your tiles into this file structure, and indeed host them as well. If they're hosting a ton of your crap or you're getting a ton of views, they ask you to pay them.

(Mostly, these are PNGs. Mapbox likes its MBTiles format for a bunch of reasons, one of which is that some tiles [particularly in the middle of water bodies] are always going to look the same, at every zoom level and in any location. You can read them loving on it more [here](https://www.mapbox.com/developers/mbtiles/).)

_(Editor's note: the original version of the following paragraph was incorrect, so I've included an updated version here.)_

Okay, on to [vector tiles](http://wiki.openstreetmap.org/wiki/Vector_tiles). [Vector tiles](https://www.mapbox.com/blog/vector-tiles/) use data structure magic ([protocol buffers](http://en.wikipedia.org/wiki/Protocol_Buffers)) to store all sorts of information you'd have in a geographic vector data layer and then renders it into images on the fly. This makes it really awesomely space-efficient; the entirety of [OpenStreetMap](http://openstreetmap.org)'s data as vector tiles can fit on just about 60GB, [small enough to fit on a thumb drive](https://vine.co/v/b0DvTPnpPtw).

Vector tiles are going to be a part of TileMill2 when it's released, which will also come pre-loaded with the whole world in OSM vectors. Seriously. Mapbox is maybe the coolest company ever of ever.

I'm pretty sure I missed some stuff. Let me know if you have any other questions. Sorry I wrote an essay, but that's kind of what I do.

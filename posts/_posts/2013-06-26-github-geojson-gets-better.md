---
layout: blog
title: 'GitHub and GeoJSON: Just Keeps Getting Better'
category: blog
---

_This post originally appeared on [GIS Collective](http://giscollective.org)._

<h1><img src="http://giscollective.org/wp-content/uploads/2013/06/cluster.png" class="inline"></h1>

GitHub has announced today some [new features](https://github.com/blog/1541-geojson-rendering-improvements) for rendering geographic data, coming off its announcement two weeks ago that GeoJSON data would now be displayed on a map when opened inside a repo. These changes show that the folks over at GitHub are serious about the importance of geospatial, and recognize that more of the world’s developers are turning to maps and coordinates as a way to display, communicate, and analyze data. Spatial is special once again!

From the post:

<blockquote>
  <ul>
    <li>
      GitHub now supports rendering <a href="https://github.com/mbostock/topojson">TopoJSON</a>, an extension of GeoJSON that encodes topology and can be up to 80% smaller than their GeoJSON equivalents.
    </li>
    <li>
      Starting today, you don’t have to rename geo files with a new extension. GitHub will now render GeoJSON (and TopoJSON) in all <a href="https://github.com/search?q=extension%3Ageojson&type=Code&ref=searchresults">.geojson</a>, <a href="https://github.com/search?q=extension%3Atopojson&type=Code&s=">.topojson</a>, and <a href="https://github.com/search?q=FeatureCollection+extension%3Ajson&type=Code&s=indexed">.json</a> files.
    </li>
    <li>
      Complex geographic datasets can often be difficult to visualize, especially if points are grouped close together. We now <a href="https://github.com/Leaflet/Leaflet.markercluster">automatically cluster</a> nearby markers, allowing us to <a href="https://github.com/benbalter/dc-maps">better support</a> larger datasets.
    </li>
  <ul>
</blockquote>

You can also now use the rendered map and embed it elsewhere, which is great if you want a quick geographic visualization! Head over to the [original post](https://github.com/blog/1541-geojson-rendering-improvements) to read more, and let’s get some more geogeeks on the GitHubs!

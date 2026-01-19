---
date: '2015-10-27'
slug: external-geojson-mapbox
title: "Adding External GeoJSON with Mapbox.js"
categories: ['older']
---

A couple years ago, I wrote a blog post about [adding external GeoJSON data to your Leaflet map using link relations](https://lyzidiamond.com/posts/osgeo-august-meeting/). Then I wrote another one about [using AJAX tools to do the same thing](https://lyzidiamond.com/posts/external-geojson-and-leaflet-the-other-way/). Here, years later, is the third part of that series: Adding External GeoJSON with Mapbox.js.

## Mapbox.js vs Leaflet

[Mapbox.js](https://mapbox.com/mapbox.js) is an extension of [Leaflet.js](https://leafletjs.com). It includes everything in Leaflet, plus some additional objects and methods. These additions were added to make it super simple to work with Mapbox tools and services while still utilizing the awesome power of Leaflet.

For example, initializing a map with Mapbox tiles in Mapbox.js:

```
L.mapbox.accessToken = <your access token here>
var map = L.mapbox.map('map', 'mapbox.streets');
```

Initializing a map with Mapbox tiles in Leaflet:

```
var map = L.map('map');
L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: '<your access token here>'
}).addTo(map);
```

In Mapbox.js, we have access to a [`L.mapbox.map()`](https://www.mapbox.com/mapbox.js/api/v2.2.2/l-mapbox-map/) object that handles a lot of things for us, including attribution, creating the request for tiles, etc. Neither of these methods are better than the other one -- with Mapbox.js, you can initialize your map either way.

Mapbox.js adds a few other objects, too. (Hint: anything that starts with `L.mapbox` is Mapbox.js-specific.) One that is particularly useful for putting data on a map is [`L.mapbox.featureLayer()`](https://www.mapbox.com/mapbox.js/api/v2.2.2/l-mapbox-featurelayer/).

## `loadURL()`

By far the most fascinating part of `L.mapbox.featureLayer()` for me is the built-in [`loadURL()`](https://www.mapbox.com/mapbox.js/api/v2.2.2/l-mapbox-featurelayer/#section-featurelayer-loadurl) method. It does exactly what you think it does: it takes data from a URL and passes it as data into the `L.mapbox.featureLayer()` object.

```
var myLayer = L.mapbox.featureLayer()
  .loadURL('mydata.geojson')
  .addTo(map);
```

![](https://i.giphy.com/DqSw5gyRQ5yPC.gif)

_I seriously have no idea why I didn't write this blog post before now. This is magical stuff._

So, what's going on here? Through `loadURL()`, `L.mapbox.featureLayer()` essentially has built-in AJAX functionality. It's asynchronously loading the data from the URL into our `myLayer` object and adding it to the map.

Yes. It's that easy.

### Adding additional functionality

Because the data is being loaded asynchronously, the code will continue to execute before the data is finished loading. This means that if you want to do anything with the data at all (add custom tooltips, for example), you have to make sure the data is finished loading first.

We can do this with the `on('ready', ...)` [event handler](https://www.mapbox.com/mapbox.js/api/v2.2.2/l-events/):

```
var myLayer = L.mapbox.featureLayer()
  .loadURL('mydata.geojson')
  .on('ready', function() {
    myLayer.eachLayer(function(layer) {
      layer.bindPopup(layer.features.properties.name);
    });
  })
  .addTo(map);
```

With this code, we're saying, "When the data is finished loading, iterate over each feature in the layer and bind to it a popup with that feature's 'name' property."

Or, as another example, let's say you want your map to zoom and pan to the bounds of your data:

```
var myLayer = L.mapbox.featureLayer()
  .loadURL('mydata.geojson')
  .on('ready', function() {
    map.fitBounds(myLayer.getBounds());
  })
  .addTo(map);
```

Ooh, what about the two together?!

```
var myLayer = L.mapbox.featureLayer()
  .loadURL('mydata.geojson')
  .on('ready', function() {
    myLayer.eachLayer(function(layer) {
      map.fitBounds(myLayer.getBounds());
      layer.bindPopup(layer.features.properties.name);
    });
  })
  .addTo(map);
```

If we need to manipulate `myLayer` at all, we can add functionality to do so in the `on('ready', ...)` event handler.

## `L.mapbox.featureLayer()` does other stuff too

While `loadURL()` is clearly the coolest thing `L.mapbox.featureLayer()` can do (clearly I'm biased), there are plenty of other awesome things about it!

### It has some magical properties!

If you add certain properties to your GeoJSON and then load the data as a `L.mapbox.featureLayer()`, you can see them in action:

- **`'marker-color'`**: when the feature is loaded to the map, the initial marker will be this color
- **`'marker-symbol'`**: the initial marker will feature this [maki](https://mapbox.com/maki) symbol
- **`'marker-size'`**: the initial marker will be this size
- **`'title'`** and **`'description'`**: if these properties are present, popups will automatically be bound to the markers with `'title'` as the title and `'description'` as the body.

### You can load data from your Mapbox Editor projects!

Instead of passing data as the first argument when creating the object, you have the option to add a Mapbox project ID. Projects are what's created when you make a map with [Mapbox Editor](https://mapbox.com/editor) -- if you create a `L.mapbox.featureLayer()` with a project ID, the data loaded in will be whatever data is in that project.

```
L.mapbox.featureLayer('mapbox.dc-markers')
  .addTo(map);
```

### You can dynamically set data filters!

When you define your `L.mapbox.featureLayer()`, you can add a `filter` option. `filter` is defined by a function that iterates over the GeoJSON features with some sort of condition -- if the feature passes the condition, it's added to the object, and if it doesn't, it's not included. `L.mapbox.featureLayer()` has a [`setFilter()`](https://www.mapbox.com/mapbox.js/api/v2.2.2/l-mapbox-featurelayer/#section-featurelayer-setfilter) method that can be called whenever you want -- ou can pass in a function with a condition, and only the features that pass the condition will be displayed on the map.

Be careful with this one, though! `setFilter()` works by removing all of the data from the map and then re-adding it, so if you add any external functionality to your object, make sure that functionality is added every time the layer is loaded.

You can see an example of `setFilter()` in action [here](https://www.mapbox.com/mapbox.js/example/v1.0.0/multiple-marker-filters/).

## Seriously, though, this is super cool

Give this a try! Check out the [Mapbox.js examples](https://www.mapbox.com/mapbox.js/example/v1.0.0/) for more things you can play with. As always, let me know if you have any questions (I'm [@lyzidiamond](https://twitter.com/lyzidiamond) on Twitter).

Also, here is a puppy:

![](https://i.giphy.com/toBi1QFDo6xAk.gif)

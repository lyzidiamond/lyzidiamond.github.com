---
layout: blog
title: 'Adding GeoJSON to Leaflet with Link Relations: notes from PDX OSGEO, August 2013'
---

_Wednesday night, I was fortunate to attend the August meeting of PDX OSGEO, Portland's meetup for open source geo shenanigans. I learned some new stuff, got to see a [3D-printed map tile](http://www.mapbox.com/blog/weekend-hack-printing-3d-tiles/) (!!!!!), and got a chance to show off some of my recent work. The bulk of my contribution to the meeting was showing off a new technique for adding GeoJSON to a Leaflet map. This is an overview of what I talked about, with more detail and background._

---

[Leaflet](http://leafletjs.com) is one of the best mapping libraries out there; it's certainly my favorite! But one thing that's somewhat convoluted is adding and using GeoJSON layers inside your Leaflet map. The [Leaflet API](http://leafletjs.com/reference.html) does have a [constructor for adding a GeoJSON layer](http://leafletjs.com/reference.html#geojson), which is great! But when you have a GeoJSON file with hundreds or thousands of features, it makes most sense to house that data in an external file. The challenge then comes when trying to use or reference that file when constructing your map.

Let's look at an example. (This is the same example I used at the meeting.) A few months ago, my friend Liza tweeted at me:

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/lyzidiamond">@lyzidiamond</a> You know maps, right? Is there a website that shows all the places in Portland where cupcakes can be purchased on map? <a href="https://twitter.com/search?q=%23serious&amp;src=hash">#serious</a></p>&mdash; Liza J (@lizaface) <a href="https://twitter.com/lizaface/statuses/335503955603890176">May 17, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

And so, with all of my infinite free time*, I set off to construct a [GeoJSON file](https://github.com/lyzidiamond/lyzidiamond.github.com/blob/master/cupcakes.json) of places to buy cupcakes in Portland. _(Disclaimer: It's not comprehensive and it's not at all done, so expect it to change significantly and frequently.)_ But when I set off to create my map, I ran into the problem of referencing this file. How was I to assign the data to a variable such that I could use it in the L.geoJson constructor and add it as a layer to my map?

Typically when I have an issue like this, I turn to the best tech support at my disposal: Twitter.

<blockquote class="twitter-tweet"><p>Question: What is the best way to reference an external geojson file for use in a <a href="https://twitter.com/LeafletJS">@LeafletJS</a> map? Do I assign to a variable in the file?</p>&mdash; Lyzi Diamond (@lyzidiamond) <a href="https://twitter.com/lyzidiamond/statuses/364169343854059520">August 4, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

The folks at Leaflet agreed that this would be the best way to go:

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/lyzidiamond">@lyzidiamond</a> yep, it&#39;s the simplest way if you&#39;re including the GeoJSON statically on page load</p>&mdash; Leaflet (@LeafletJS) <a href="https://twitter.com/LeafletJS/statuses/364336552383492097">August 5, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

One of my Twitter friends, Sean Gillies, had another suggestion:

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/lyzidiamond">@lyzidiamond</a> Fwiw, we use a typed link at ISAW: <a href="http://t.co/Ea2MzuchBV">http://t.co/Ea2MzuchBV</a>. If you don&#39;t want an extra request, you can use a data uri.</p>&mdash; Sean Gillies (@sgillies) <a href="https://twitter.com/sgillies/statuses/364171433246588928">August 4, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I decided to play with this a little more, and it totally worked! And it worked well! So let's talk about it.

JSON and GeoJSON files are just JavaScript files. (JSON stands for JavaScript Object Notation; you can read more about JSON as a file type in a previous post, [here](http://lyzidiamond.com/posts/github-geojson/).) As such, you can reference a JSON or GeoJSON file as a script, the same way you would for, say, including the Leaflet or jQuery libraries in your code.

    <script src="./cupcakes.json"></script>

Adding a link to a script allows you access to its content; it's as if you copy-pasted the code in the script into your HTML file. Everything that is in that file is now effectively inside your HTML file and can be referenced and used freely. Adding the GeoJSON at the top does the same thing, but the GeoJSON data has no name. It's not attached to a variable. It's just features that can't be referenced, containing geometry and properties that can't be referenced. For the purposes of our map, it is essentially useless.

The obvious solution is to add a variable definition to our cupcakes.json file. That would mean that instead of this:

    {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              -122.65335738658904,
              45.512083676585156
            ]
          },
          "properties": {
              "name": "Hungry Heart Cupcakes",
              "address": "1212 SE Hawthorne Boulevard",
              "website": "http://www.hungryheartcupcakes.com",
              "gluten free": "no",
              "open1": "Monday - Sunday, 11am - 9pm"
          }
        },

    ...

we would have something like this:

    var cupcakes = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              -122.65335738658904,
              45.512083676585156
            ]
          },
          "properties": {
              "name": "Hungry Heart Cupcakes",
              "address": "1212 SE Hawthorne Boulevard",
              "website": "http://www.hungryheartcupcakes.com",
              "gluten free": "no",
              "open1": "Monday - Sunday, 11am - 9pm"
          }
        },

    ...

This would totally work, but it would mean that our cupcakes.json file would no longer be a true JSON/GeoJSON file. If you tried to [show the file in GitHub](http://lyzidiamond.com/posts/github-geojson-gets-better/), for example, the points would not be interpreted and a map would not be rendered. Additionally, you don't always have direct control over the GeoJSON file itself, especially if it's a shared dataset or if it's being returned from some other process. Adding a variable definition could also potentially mess up the work of anyone else trying to use your dataset, if it is indeed a dataset you constructed.

So what can you do? You can used a typed link/link relation and a little bit of jQuery. It's really quite magical.

Let's look at the code, and then talk through it. You can view a live version of this [here](http://lyzidiamond.com/cupcakes.html).

    <html>
    <head>
      <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.5/leaflet.css" />
      <style type="text/css">
      body {  padding: 0; margin: 0;  }
      html, body, #cupcake-map {  height: 100%;  }
      </style>
      <script src="http://cdn.leafletjs.com/leaflet-0.5/leaflet.js"></script>
      <script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
      <link rel="points" type="application/json" href="./cupcakes.json">
    </head>
    <body>
      <div id="cupcake-map"></div>
      <script>
      var cupcakeTiles = L.tileLayer('http://a.tiles.mapbox.com/v3/lyzidiamond.map-ietb6srb/{z}/{x}/{y}.png', {  maxZooom: 18  });

      $.getJSON($('link[rel="points"]').attr("href"), function(data) {
        var geojson = L.geoJson(data, {
          onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name);
          }
        });
        var map = L.map('cupcake-map').fitBounds(geojson.getBounds());
        cupcakeTiles.addTo(map);
        geojson.addTo(map);
      });
      </script>
    </body>
    </html>

Leaflet, as discussed previously, is a JavaScript mapping library with a lot of great functionality. (For more info on getting started with and using Leaflet, check out their [Quick Start Tutorial](http://leafletjs.com/examples/quick-start.html).) In order to use it, we need to include both a Leaflet CSS file (for map styling) and the Leaflet JavaScript file, which is what the stylesheet on line 3 and the script on line 8 are all about. Lines 4 through 7 are CSS rules to give our map a height and ensure that it is actually full-screen on the page.

The other library we need to make this work is called [jQuery](http://jquery.com/). jQuery is a JavaScript library that can make developing way easier, as it takes some of the complicated parts of the language and synthesizes them into easy-to-use pieces. Line 9 includes jQuery in our map, which allows us to use its functionality.

The interesting part comes at Line 10. This is where we are including our JSON** file using a [link relation](http://blog.whatwg.org/the-road-to-html-5-link-relations). As defined on the WHATWG blog post to which I just linked, "Regular links (<code><a href></code>) simply point to another page. Link relations are a way to explain _why_ you're pointing to another page. They finish the sentence, 'I'm pointing to this other page because...'"

Typcailly, link relations are used with a common set of keywords that have specific value to the browser. For example, our CSS stylesheet on line 3 has the link relation <code>rel="stylesheet"</code>. This is the most common link relation, and every browser knows to download the data from the link before loading the page, as the relation tells it that the linked data contains important style information.

In our case, we are sort of hacking around that. We don't necessarily want the browser to fetch the data on load or at any particular time. Indeed, we don't want the browser to do anything with our GeoJSON file until we tell it to. Thus, we supply the link with a <code>rel="points"</code>, which isn't going to have any unintended consequences. (For more information on link relation keywords and what they do, check out [this comprehensive list](http://microformats.org/wiki/existing-rel-values).)

Now let's get into the body of our HTML. The first think you see on line 13 is an empty div with id "cupcake-map." This is how Leaflet works: you create an empty div, and then write some JavaScript to fill it in. For us, this JavaScript starts on the very next line, as it's a full-screen web map.

Our JavaScript is sandwiched between <code>script</code> tags, which lets the browser know that anything inside of them is JavaScript and should be treated as such. (This was mirrored in lines 4 and 7 in the head, with <code>style</code> tags.) The first thing we do in our script (line 15) is define a variable called cupcakeTiles, and use the Leaflet [tileLayer](http://leafletjs.com/reference.html#tilelayer) constructor to define a map tile layer (more info on that at the link). This map uses custom tiles I made using [MapBox](http://mapbox.com), so this constructor links to those tiles. It also adds a property for maxZoom, ensuring that the map will not be zoomed in past zoom level 18. (For more information on web maps and zoom levels and how they work, check out [this excellent blog post](http://www.mapbox.com/developers/guide/).)

Line 17 is where the code gets interesting, as we employ jQuery's [getJSON method](http://api.jquery.com/jQuery.getJSON/). This method takes three parameters: A URL of the location of the data, a plain object or string that gets sent with the request for the data, and a function to execute if the request for data is successful. The second parameter is optional, and you'll see we don't actually use it in our example.

We pass <code>$('link[rel="points"]').attr("href")</code> as our first parameter, which actually _does_ translate to a URL. It finds a link by its rel value (<code>$('link[rel="points"]')</code>), and then uses a getter method [attr](http://api.jquery.com/attr/) to pull the value of the href parameter in the link. This returns <code>"./cupcakes.json"</code>, which is the location of our JSON file. (I should also note that our link has an attribute <code>type</code> that is defined as <code>'application/json'</code>. This helps the browser understand that the data in the link is JSON and should be treated as such.)

The second parameter is actually a function to be executed upon successful retrieval of data, called a _[callback function](https://developer.mozilla.org/en-US/docs/Mozilla/js-ctypes/js-ctypes_reference/Callbacks)_. (If that blows your mind, take some time to read about [asynchronous programming](http://en.wikipedia.org/wiki/Asynchronous_I/O). It's really fascinating.) We actually have housed all the rest of the map creation and layer adding functionality of our map inside of this callback function, which ensures that the map won't draw unless the GeoJSON has sucecssfully been retrieved.

Our callback function takes one parameter, data, which will be the data that's returned from the getJSON method. The first thing the function does is create a variable geojson and use the Leaflet [geoJson](http://leafletjs.com/reference.html#geojson) constructor to define a GeoJSON layer. The constructor takes two parameters: one for the actual GeoJSON that will make the layer (data, in our case), and any options you wish to specify. One of thse is called [onEachFeature](http://leafletjs.com/reference.html#geojson-oneachfeature), which is most commonly used for attaching popups to data. That's how we used it, anyway! As the value for onEachFeature, we define a function that takes our data and adds a popup to each feature that shows whatever value is in that feature's "name" property.

After we have defined our GeoJSON layer, we have to actually create our map. This is done on line 23, where we create a variable map and use the Leaflet [map](http://leafletjs.com/reference.html#map-class) constructor to put our map in the "cupcake-map" div. We then also add a method [fitBounds()](http://leafletjs.com/reference.html#map-fitbounds) and pass it the extent of our GeoJSON data, which sets the bounds of our map to match the bounds of our data.

The last two lines are pretty self-explanatory: we add our cupcakeTiles layer to the map and we add our geojson layer to the map.

So what did we just do? We made a map with custom tiles that grabs GeoJSON from an external file without changing that file. Oh, and we added some popups to the GeoJSON features and set the bounds of our map to match the bounds of the data. Not too bad for 29 lines of code!

*This is a joke.
**JSON and GeoJSON are just JavaScript objects. A GeoJSON file can be saved as type *.geojson, *.json, or *.js. All of them work.
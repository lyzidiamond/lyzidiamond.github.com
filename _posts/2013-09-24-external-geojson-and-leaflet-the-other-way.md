---
layout: blog
title: 'External GeoJSON and Leaflet: The Other Way(s)'
---

**_Editor's Note:_** _This post was updated in November 2014 to fix errors and reflect the most recent versions of Leaflet and jQuery._

I will always be a student. In the wide world of geospatial technology, we are all going to be students forever. So when someone from Twitter tells me a better way to do something that seems intuitive and worthwhile, I have no problem sharing it with the world, even when it contradicts something I said before.

I'm specifically talking about my last technical post, ["Adding GeoJSON to Leaflet with Link Relations"](http://lyzidiamond.com/posts/osgeo-august-meeting/). The technique I outlined totally worked, and people seem to be enjoying using it, but as is usual for these sorts of things, someone from Twitter offered another suggestion:

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/vtcraghead">@vtcraghead</a> <a href="https://twitter.com/lyzidiamond">@lyzidiamond</a> How is this advantageous to: $.getJSON(&quot;mydata.geojson&quot;, function (data) {&#10;markers.addData(data);&#10;});</p>&mdash; Bryan McBride (@brymcbride) <a href="https://twitter.com/brymcbride/statuses/382535707798929408">September 24, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I thought about this for a minute. Why _wasn't_ I just passing my GeoJSON file directly into jQuery's `getJSON()` method? I thought I had tried it and it hadn't worked. But then I tried it. And it [totally worked](http://lyzidiamond.com/cupcakes/cupcakes_fail.html)!

So let's take a look at this code, and compare it to the code I posted last month.

<h2>Passing JSON directly into getJSON method.</h2>

    <!doctype html>
    <html>
    <head>
      <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.5/leaflet.css" />
      <!--[if lte IE 8]>
         <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.5/leaflet.ie.css" />
      <![endif]-->
      <style type="text/css">
        body {
          padding: 0;
          margin: 0;
        }

        html, body, #cupcake-map {
          height: 100%;
        }

      </style>
      <script src="http://cdn.leafletjs.com/leaflet-0.5/leaflet.js"></script>
      <script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
    <body>
      <div id="cupcake-map"></div>
      <script>
      var cupcakeTiles = L.tileLayer('http://a.tiles.mapbox.com/v3/lyzidiamond.map-ietb6srb/{z}/{x}/{y}.png', {
        maxZoom: 18
      });

      $.getJSON("./cupcakes/cupcakes.json", function(data) {
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

There are two main differences. First of all, the link relation in the `<head>` is gone. Second, the first argument to the jQuery `getJSON()` method is different. Instead of using some additional jQuery code to identify the linked JSON and pull out the content, we just simply pass the JSON file _itself_ into the method. (The second argument remains the same, a callback function upon successful "getting" of the JSON file.) Everything else is the same. And as you [can see](http://lyzidiamond.com/cupcakes/cupcakes_fail.html), it looks [exactly the same](http://lyzidiamond.com/cupcakes/cupcakes.html).

<h2>This is great! Should I just use this instead of link relations all the time?</h2>

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/vtcraghead">@vtcraghead</a> <a href="https://twitter.com/lyzidiamond">@lyzidiamond</a> Might need to be proxied if cross-domain...</p>&mdash; Bryan McBride (@brymcbride) <a href="https://twitter.com/brymcbride/statuses/382541743947665408">September 24, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

No. This technique worked for me because my [cupcakes.html](http://lyzidiamond.com/cupcakes_fail.html) and [cupcakes.json](http://lyzidiamond.com/cupcakes.json) files are in the same domain. If my files were in separate domains, I would have to create a proxy. (There is a nice example of a simple PHP proxy and an example its usage with jQuery's getJSON method [here](https://gist.github.com/bmcbride/6614373#file-proxy-php). According to Twitter, you can write these proxies in other languages too, but [it can be annoying/time consuming](https://twitter.com/billdollins/status/382561454500487168).)

A proxy is required when using this method because of the [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Same_origin_policy_for_JavaScript), which affects browser-side programming languages. The policy sets restrictions on how scripts loaded from one origin can interact with resources from different origins in the interest of security ("origins" meaning "domains" in this case). Most methods and properties are not accessible when being requested from a different domain, so a proxy domain must be created to mimic a same-origin request.

<h2>Oh. That sounds annoying. Is there another way?</h2>

You bet. [Calvin Metcalf](https://twitter.com/CWMma) has created a nice little plugin for [Leaflet](http://leafletjs.com) called [leaflet-ajax](https://github.com/calvinmetcalf/leaflet-ajax) that allows you to make a request for JSON using Ajax and allows a request/response for JSONP, making it possible to pull JSON from another domain.

    var geojsonLayer = new L.GeoJSON.AJAX("./cupcakes.json");
    var geojsonLayer = new L.GeoJSON.AJAX("http:example.com/cupcakes.jsonp", {dataType:"jsonp"});

<h2>Wait, wait, back up. AJAX? JSONP? What?</h2>

<h3>Ajax</h3>

[Ajax](https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started) stands for Asynchronous JavaScript and XML. It is a way for web applications to send data to and receive data from a server asynchronously, without disrupting the behavior of the page where the request was originated.

Ultimately, when we are loading our GeoJSON file onto the page, we are loading it from the server and displaying it in the browser, which means communication needs to occur from the server-side, or back end, to the client-side, or front end. This communication happens at different times, depending on when the data is requested. In the example above, we are requesting the data in the getJSON method. In the [previous example](http://lyzidiamond.com/posts/osgeo-august-meeting/), we were requesting the data in the `<head>`, so the request was being made before the getJSON method was called. With Calvin's plugin, an Ajax request is being made when a variable is created for the geoJSON layer.

<h3>JSONP</h3>

[JSONP](http://json-p.org/) stands for "JSON with padding." It exists primarily to thwart the previously mentioned _same-origin policy_ and uses one of the allowed cross-domain mechanisms to get JSON from a different domain. I am not going to go into how JSONP works here; for more information on its structure and history, click the link. (EXTRA CREDIT: There is another, more commonly used tool for allowing JavaScript requests to be made across browsers, caled [cross-origin resource sharing, or CORS](http://enable-cors.org/). It isn't yet a standard for this type of practice, however, because Internet Explorer has yet to implement it, making it a poor cross-<em>browser</em> solution.)

<h2>So how would that work, then?</h2>

As always, let's take a look at the code (live example [here](http://lyzidiamond.com/cupcakes/cupcakes_ajax.html)):

    <!doctype html>
    <html>
    <head>
      <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.5/leaflet.css" />
      <!--[if lte IE 8]>
         <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.5/leaflet.ie.css" />
      <![endif]-->
      <style type="text/css">
        body {
          padding: 0;
          margin: 0;
        }

        html, body, #cupcake-map {
          height: 100%;
        }

      </style>
      <script src="http://cdn.leafletjs.com/leaflet-0.5/leaflet.js"></script>
      <script src="https://raw.github.com/calvinmetcalf/leaflet-ajax/master/dist/leaflet.ajax.min.js"></script>
    <body>
      <div id="cupcake-map"></div>
      <script>
      var cupcakeTiles = L.tileLayer('http://a.tiles.mapbox.com/v3/lyzidiamond.map-ietb6srb/{z}/{x}/{y}.png', {
        maxZoom: 18
      });

      function popUp(feature, layer) {
        layer.bindPopup(feature.properties.name);
      }

      var geojsonLayer = new L.GeoJSON.AJAX("./cupcakes.json", {onEachFeature:popUp});

      var map = L.map('cupcake-map').fitBounds(geojsonLayer.getBounds());
      cupcakeTiles.addTo(map);
      geojsonLayer.addTo(map);

      </script>
    </body>
    </html>

What's different here? A few things. First, notice that instead of the jQuery `<script>` tag in the `<head>`, I instead added Calvin's Leaflet-Ajax plugin, allowing us to use the methods housed therein. (For more information on Leaflet plugins, click [here](http://leafletjs.com/plugins.html).) Second, I made a function popUp that binds a tool tip to each feature (when asked to do so) that displays the text from the "name" field of the properties of the feature. (This was in our previous example as well, but was not explicitly defined; it was simply an [anonymous function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope) being used as a value for the onEachFeature option when adding a new layer. For more info on options when using the Leaflet GeoJSON constructor, check out the [Leaflet API Reference](http://leafletjs.com/reference.html#geojson).)

Third, I define a variable geojsonLayer and, using the Leaflet GeoJSON constructor with Calvin's plugin, use the AJAX method, passing in first the location of my GeoJSON file and second the options for the layer, which include setting the onEachFeature method to the popUp function. This means that when any feature in the layer is clicked on, a tool tip with the information defined in the popUp function will show up.

I then define the map object, tell Leaflet to put it in the div with ID `cupcake-map`, fit the bounds of the map to the extend of the features in the GeoJSON layer, add the basemap tiles to the map, and add the GeoJSON layer to the map.

Now, this isn't an example of loading JSON from a different domain, but if you look at the GitHub repo for the Leaflet-Ajax tool, there's a [nice little example](https://github.com/calvinmetcalf/leaflet-ajax/blob/master/example/index.html) showing off this functionality.

<h2>Wow! That's a lot of different ways to add GeoJSON to a Leaflet map.</h2>

I know, right? Isn't it awesome?! Different techniques will work for different situations, but all of them have some similar features:

  - There is no need to add a variable definition inside of an external JSON, making it not a true JSON file.
  - Using an external GeoJSON file is no problem, and files can be easily switched out at any time.
  - They work!

So go forth, young web cartographers and spatial analysts! Add all the GeoJSON. With these techniques, I think you'll have a ton of fun.

(Oh, and. I'm always interested in hearing about new techniques and tools. Hit me up on [the Twitters](http://twitter.com/lyzidiamond) if you find something interesting!)
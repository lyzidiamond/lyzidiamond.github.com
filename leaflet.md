    <!doctype html>
    <html>
    <head>
    <!-- Adding in the Leaflet CSS file -->
    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.6.4/leaflet.css" />
    <!--[if lte IE 8]>
         <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.6.4/leaflet.ie.css" />
    <![endif]-->

    <!-- Adding Leaflet JavaScript file -->
    <script src="http://cdn.leafletjs.com/leaflet-0.6.4/leaflet.js"></script>

    <!-- Adding styling info for the map -->
    <style type="text/css">
    #map { height: 600px; }
    </style>

    </head>

    <body>
      <div id="map"></div>
      <script>

      var map = L.map('map').setView([45.51,-122.67], 14);

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      var marker = L.marker([45.516469,-122.676208]).addTo(map);

      marker.bindPopup("EsriPDX");

      </script>
    </body>
    </html>
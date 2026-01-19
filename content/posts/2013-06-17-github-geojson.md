---
date: '2013-06-17'
slug: github-geojson
title: 'GitHub: Bringing GeoJSON To Life Since 2013'
categories: ['older']
---

_This post originally appeared on [GIS Collective](https://giscollective.org)._

<h1><img src="https://giscollective.org/wp-content/uploads/2013/06/githubgeojson1.png" class="inline" width="100%"></h1>

Last week, the code repository heroes over at [GitHub](https://github.com) made an awesome announcement: [Any .geojson files living in GitHub repos will now be rendered on a Leaflet-driven, OSM tile-backed map right inside of GitHub](https://github.com/blog/1528-there-s-a-map-for-that), with tooltips showing the data properties to boot! This is a truly exciting moment for all geonerds who code, developers who use geodata, and everyone in between.

“Hey, wait a minute,” you may be saying. “What is GitHub again? And [GeoJSON](https://www.geojson.org/)… I think I’ve heard of that, but what is it for?” Do not fret! We at GISC know that the field is moving quickly, and we are happy to provide guidance and direction for your geospatial journey.

<h2>Git and GitHub</h2>

<h1><img src="https://www.palermo.edu/Archivos_content/ingenieria/top/130712_git_github_topdenota1.jpg" class="inline"></h1>

Before learning about GitHub, we first have to understand [git](https://git-scm.com). Git is a tool that allows multiple people to work on the same files at the same time without overwriting each other’s changes. This general concept is called _version control_, and git is a _version control system_. There are several other version control systems out there, but git is popular because it does its job more efficiently than many (if not all) of the others.

In order for multiple people to work on a project, the data has to live in a place where multiple people can access it, right? GitHub is that place: the site houses thousands and thousands of projects, in individual workspaces called _repositories_, or _repos_, that multiple people can access, copy, edit, and update using the tools available via git. These repositories also have a tracking element; when someone makes a change to a project, or a _commit_, information is stored about the user, the time, the exact changes that were made (all the way down to the individual line inside the file!), and a unique ID that allows the project owner to restore back to that particular moment. It’s pretty effing cool.

Because git is so great, and GitHub is so popular, people have been using it for all kinds of projects, coding and otherwise. I have seen professors put lectures and lecture notes on GitHub, several of my friends use it as a place to work on resumes and terminal projects… you can basically use it for anything. Shoot, even the code for my website lives on GitHub. So it follows that with the advent of mapping and geospatial analysis on the web, there is a lot of geodata housed on GitHub.

<h2>GeoJSON</h2>

<h1><img src="https://giscollective.org/wp-content/uploads/2013/06/geojson.png" class="inline"></h1>

One of the more common formats used for geospatial data in web mapping applications is called _GeoJSON_. GeoJSON was born out of a format called _[JSON](https://json.org)_, which stands for JavaScript Object Notation. JSON is like a table turned on its side; each row gets its own section, and inside of that section is a series of properties and values unique to that row. For example, a table of Presidents of the United States might look something like this:

<h1><img src="https://giscollective.org/wp-content/uploads/2013/06/presidents.png" class="inline"></h1>

In JSON, the table might look like this:

<code>

  “presidents” : {
    “name” : “Barack Obama”,
      “hometown” : “Honolulu, HI”,
      “number” : “44”,
      “year elected” : “2008”,
      “terms served” : “2”,
      “child1” : {
        “name” : “Malia”,
        “born” : “1998”
      },
      “child2” : {
        “name” : “Sasha”,
        “born” : “2001”
      }
    },
    {
      “name” : “George W. Bush”,
      “hometown” : “New Haven, CT”,
      “number” : “43”,
      “year elected” : “2000”,
      “terms served” : “2”,
      “child1” : {
        “name” : “Jenna”,
        “born” : “1981”
      },
      “child2” : {
        “name” : “Barbara”,
        “born” : “1981”
      }
    }
    
</code>

GeoJSON takes this format and adds geometry, allowing mapping engines and libraries to parse the data and place these objects in space using coordinates, as well as properties, which can be thought of like the fields and values in an attribute table. GeoJSON allows for points, lines, polygons, and a few other data types, but it’s all formatted in much the same way as the JSON example, above.

Many if not all of the open source mapping libraries for JavaScript ([Leaflet](https://leafletjs.com) and [MapBox](https://mapbox.com) most notably) support GeoJSON and allow GeoJSON layers to be added to their maps. [QGIS](https://qgis.org), the open source desktop mapping application, also allows the user to view and export data in the GeoJSON format. This has made it extremely popular as a geodata format, which is why it shows up frequently on GitHub.

<h2>In Summary</h2>

So now that we know what GitHub is used for and how GeoJSON works, we can clearly see why GitHub’s announcement last week was such a big deal: If you click on any .geojson file in a repo on github.com, the data will be rendered and displayed on a map. No more scrolling through text and trying to figure out where [45.528402,-122.65762] might be, because all of the data is displayed spatially for easy perusal!

With limited time and limited space, I can only say so much, so this wasn’t a thorough walkthrough of git, GitHub, or GeoJSON. I didn’t even touch Leaflet or [OpenStreetMap](https://openstreetmap.org) — posts going into all of these things in depth will be on the blog in the coming weeks. For now, head on over to GitHub, find some GeoJSON files, check out the sweet maps, and maybe try making your own repo! And please stay tuned for more updates — by the end of the summer, you’re going to be using git like a pro!

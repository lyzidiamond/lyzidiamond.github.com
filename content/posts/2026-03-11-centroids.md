---
date: 2026-03-11
slug: centroids-as-a-service
title: "Building a Flask web service in 2026"
---





Back in 2014, I wrote a small Flask app called Centroids as a Service. It did one thing: take a GeoJSON file, calculate the centroids, and return a GeoJSON file. I was just learning to code, and I built this little tool as a way to practice writing a Python web app and deploying to Heroku. Cut to 2026: Heroku is EOL (RIP), Flask is no longer in beta, and I understand quite a bit more about making tools that are useful and useable.

I spent the last few days updating the app to modernize the code, add additional features, and set it up to deploy to Render. 


- Intro
- What I built
- How it works
- Changes I made (same app)
    - Deploying to Render
    - Modernizing the Flask app
- Things I added
    - visualization
- How to run it yourself
- Possible future enhancements
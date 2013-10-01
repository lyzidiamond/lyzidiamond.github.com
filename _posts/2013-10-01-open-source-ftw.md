---
layout: blog
title: 'Open Source FTW!'
---

For some time, I've been frustrated with the lack of social spaces for developers to work together on map-related projects here in Portland. There are [lanaguage-specific meetups](http://calagator.org), and there are definitely people hacking on spatial projects at those, but it's in the context of the programming language, not the field of geospatial tech. I have also long been fascinated with the pedagogical issues of teaching developers about geographic principles and geographers about computer programming. I began wondering: is there a place for a meetup like this in Portland?

At some point during this thought process, I discovered [MaptimeSF](http://twitter.com/maptimesf), a weekly map hack night run by a few of the excellent folks over at [Stamen](http://stamen.com) in San Francsico. I heard that there were a couple similar groups popping up around the country, so I decided to get in contact about starting one in Portland. Thus was born [MaptimePDX](http://twitter.com/maptimepdx).

<blockquote class="twitter-tweet"><p>MaptimePDX is ON! Sunday 9/29, 1pm-4pm at Flux (<a href="http://t.co/aYGp0GPG3E">http://t.co/aYGp0GPG3E</a>), part of <a href="https://twitter.com/WhereCampPDX">@WhereCampPDX</a>. EXCITED! More info: <a href="http://t.co/iLH0CmtXOd">http://t.co/iLH0CmtXOd</a></p>&mdash; MaptimePDX (@MaptimePDX) <a href="https://twitter.com/MaptimePDX/statuses/382250375849320448">September 23, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

This past weekend was [WhereCampPDX](http://wherecamppdx.org), which seemed like the perfect time to hold the inaugural MaptimePDX event. In addition to hosting an open hack for anyone who was interested in joining us, I prepared a little exercise I've been wanting to write for a while. It's called [Learn GeoJSON](http://github.com/lyzidiamond/learn-geojson), and its goal is to teach about the principles and ideas of [git](http://git-scm.org), [GitHub](http://github.com), and [GeoJSON](http://geojson.org) without having to lead beginners through dealing with (a) code and (b) the command line. You can view the slides I used for my presentation [here](http://lyzidiamond.com/learn-geojson/learn-geojson.html).

<blockquote class="twitter-tweet"><p>Who&#39;s excited for <a href="https://twitter.com/MaptimePDX">@MaptimePDX</a> today? I am! I&#39;m also frantically finishing up the exercise we&#39;re going to do :-P</p>&mdash; Lyzi Diamond (@lyzidiamond) <a href="https://twitter.com/lyzidiamond/statuses/384381323470577665">September 29, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

The basic idea is to use GitHub as a collaboration tool for building crowd-sourced geographic (GeoJSON) datasets with the help of the excellent [geojson.io](http://geojson.io). Essentially, users fork the original (my) repo, open their desired geojson files using geojson.io (which gives them the option of clicking back and forth between a table-based format and GeoJSON format — hooray unintentional learning tools!), add some points visually, commit to their repo, and make a pull request back to the original repo. (Further information and more detailed instructions are available on the README in the [GitHub repo](http://github.com/lyzidiamond/learn-geojson). I also intend on writing a blog post about it once it's totally done, so look out for that.) It actually went pretty smoothly up to that point, which was awesome!

Then I turned back to the projector to show an example of merging a pull request, seeing as I had about ten of them at that point, and lo and behold...

<h1><img src="https://raw.github.com/lyzidiamond/lyzidiamond.github.com/master/images/mergeconflict.png" width="100%"></h1>

Every pull request had a merge conflict! I got super frustrated, asked the group to talk amongst themselves, and investigated a little bit. When I checked the diff, this is what I saw:

<h1><img src="https://raw.github.com/lyzidiamond/lyzidiamond.github.com/master/images/diff.png" width="100%"></h1>

Every feature in the dataset was on the same line! JavaScript doesn't care about line breaks, so this is definitely acceptable and is totally still valid GeoJSON, but makes it near impossible for use with this collaboration technique I was preaching. I didn't even notice it beforehand, because it appears to be line broken in geojson.io:

<h1><img src="https://raw.github.com/lyzidiamond/lyzidiamond.github.com/master/images/geojsonio.png" width="100%"></h1>

A conundrum, to be certain. I thought to myself, "Ugh, I can't believe I didn't figure this out ahead of time. How could I screw this up so badly?" It wasn't a pretty scene.

But fortunately, I was surrounded by a few of the [great](http://twitter.com/reidab) [geo hackers](http://twitter.com/pdxmele) I had been so eager to recruit to MaptimePDX. And they said, "You know, geojson.io is an open source project. We can just add some code to implement line breaks, make a pull request, and see if it gets merged!"

So they did. And less than an hour later...

<h1><img src="https://raw.github.com/lyzidiamond/lyzidiamond.github.com/master/images/merged.png" width="100%"></h1>

It was merged! Mele checked it afterwards, and it [totally works](https://github.com/pdxmele/pdxpyconmap/commit/7890ee0924e987eda955c6218d95778026fd9384):

<h1><img src="https://raw.github.com/lyzidiamond/lyzidiamond.github.com/master/images/melecommit.png" width="100%"></h1>

Now, save for having to resolve the conflicts with each of the commits made pre-prettifying, this exercise will work completely smoothly in the future. I can't wait to present it again.

### This is a long story.

But everyone has one of these stories — stories that make them realize what's been right in front of them the whole time. And this is mine: open source is the future. Open source is the only way we can move forward. I'm hooked. I'm completely and totally hooked. I think Mele put it best:

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/lyzidiamond">@lyzidiamond</a> <a href="https://twitter.com/reidab">@reidab</a> open source FTW</p>&mdash; Mele Sax-Barnett (@pdxmele) <a href="https://twitter.com/pdxmele/statuses/384455625674989568">September 29, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
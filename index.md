---
layout: page
title: Victory Formation
tagline: Making, taking, shaking
---
{% include JB/setup %}

My name is Lyzi Diamond. I'm a geographer, college football enthusiast, would-be statistician, and hopeful newbie developer. This is where I put things I make and write. My interests include:

* College football
* Geography and geoscience
* Marketing and copywriting
* Research and technical writing
* Technology in nonprofits and nonprofit management
* Social media
* Python and JavaScript
* Most things

During the day, I work at the [Oregon Department of Geology and Mineral Industries](http://oregongeology.org) as  GIS Technician, working on flood mapping projects for Oregon's coastal counties. I also volunteer for [ChickTech](http://chicketch.org) doing writing for their website and helping coordinate events. I'm a proud member of [PyLadies PDX](http://www.meetup.com/PyLadies-PDX/), the [Portland Python User Group](http://www.meetup.com/pdxpython), the [ORURISA Young Professionals](http://www.orurisa.org/ORURISAYP), and I do some work for the [Northwest GIS User Group](http://www.nwgis.org/). I don't have a lot of free time, but when I do, I want to help people out with anything listed above. Email  me: <lyzidiamond@gmail.com>.

## Current Projects

Right now, I'm working on learning Django, Python, JavaScript, HTML, and marrying all these things with college football. Updates on any and all of these things can be found in these here posts:

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>



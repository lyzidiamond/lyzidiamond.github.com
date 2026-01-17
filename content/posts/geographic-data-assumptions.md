---
date: '2013-07-02'
title: 'Geographic Data Assumptions: MAUP and Ecological Fallacies'
---

_This post originally appeared on [GIS Collective](https://giscollective.org)._

Humans are generally adept at critical thinking and deductive reasoning. We tend to understand the world around us fairly easily, because the world operates on a few basic principles. By relying on these principles, we can find the signals through the noise (or at least narrow it down to a few options). To do this, we tend to rely on assumption and inference.

This is a good thing. It allows us to, for example, use words that others may not have heard before without having to explain them explicitly. One could deduce that “polygamy” probably means marriage to multiple people, because “monogamy” is the marriage (hah) of the Greek words _monos_ (one) and _gamos_ (marriage), and the Greek word _polys_ means many. You don’t have to look it up, and because you’ve seen the word “monogamy” so many times, you understand “polygamy” in context.

Maps are a little different. Modern society has allowed for the growth of spatial literacy, and with maps in our pockets (yes, on the cell phones), we do a pretty good job of navigating using lines and cardinal directions. As such, we feel we are qualified to learn about the world in a spatial way, which many of us are! But it’s important to know about the ways that maps can distort our understanding of data, such that we can challenge our assumptions in the future.

---

In 1991, Mark Monmonier wrote a book called [“How to Lie With Maps.”](https://www.amazon.com/How-Lie-Maps-2nd-Edition/dp/0226534219) The book remains essential to any geographic information science curriculum, and for those interested in learning more about the subjects I’m going to touch on here, it’s a great resource. The first paragraph of the introduction reads:

<blockquote><p>Not only is it easy to lie with maps, it’s essential. To portray meaningful relationships for a complex, three-dimensional world on a flat sheet of paper or a video screen, a map must distort reality. As a scale model, the map must use symbols that almost always are proportionally much bigger or thicker than the features they represent. To avoid hiding critical information in a fog of detail, the map must offer a selective, incomplete view of reality. There’s no escape from the cartographic paradox: to present a useful and truthful picture, an accurate map must tell white lies.</p></blockquote>

There’s the first thing to realize: **every map is lying to you all the time**. In an ideal world, the map is lying to you in the hopes of conveying the most information to you that it possibly can, but sometimes maps make generalizations and approximations for sake of the cartographer and not the map’s intended audience. Let’s take a look at an example.

<img src="https://giscollective.org/wp-content/uploads/2013/07/maup2.png" class="inline" width="100%">

This is a map from the [Washington Post](https://www.washingtonpost.com/wp-srv/special/politics/election-map-2012/president/) showing the results of the 2012 presidential election. Considering that presidential races in this country are decided by the electoral college, and each state’s electors all vote for the same candidate, breaking out the data state by state makes sense. Nevada is blue, Mississippi is red, Obama won the election, let’s all go get a beer.

But this map doesn’t tell the whole story. Let’s look at another map from the Washington Post of the exact same data, just aggregated differently.

<img src="https://giscollective.org/wp-content/uploads/2013/07/maup3.png" class="inline" width="100%">

Nevada doesn’t look as blue as it did in the previous map, and Mississippi doesn’t look quite as red. By grouping data by states, the map was hiding some of the complexity in the data, causing the reader to make certain assumptions.

This is a common and well-documented spatial data visualization circumstance called the [modifiable areal unit problem](https://en.wikipedia.org/wiki/Modifiable_areal_unit_problem), often acronomized as MAUP. First identified by Gehlke and Biehl in 1934, the MAUP is a statistical bias that is influenced by both the means in which point-based data is aggregated, and the districts into which that data is grouped.

The presidential election maps above were (in theory*) generated from point-based data: one vote, one point. But showing 117 million points on a map would take a really long time and it wouldn’t be that useful (plus, it’s a cartographic nightmare). The cartographer is all but obligated to aggregate and group the data for ease of consumption, but every grouping mechanism is going to present its own challenges.

For example, I live in Portland, which is in Multnomah County, Oregon. In the 2012 election, Multnomah County had 367,992 ballots cast in 132 precincts. (Oregon has vote by mail, so that changes things around a bit geographically, but that’s not super relevant here.) 75.37% of the votes cast for president were cast for Barack Obama. When you look at Multnomah County on the presidential map above, you’ll see that it’s pretty blue.

<img src="https://giscollective.org/wp-content/uploads/2013/07/maup4.png" class="inline" width="100%">

But is that map telling you what’s really going on beneath the aggregation? Nope. Could one theoretically assume that all 367,992 ballots in Multnomah County were cast for Obama? Sure. Does it matter? In this case, probably not that much for you and me, but if you’re interested in conducting a political campaign, the MAUP could seriously hinder your strategy: _especially_ if you only have access to aggregated data.

This assumption falls into a category of assumptions called **ecological fallacies**. Ecological fallacies fall into four camps:

* Confusion between ecological correlations and individual correlations
* Confusion between group average and total average
* Simpson’s Paradox (when comparing two populations divided in groups of different sizes, the average of some variable in the first population can be higher in every group and yet lower in the total population)
* Confusion between higher average and higher likelihood

_(Believe it or not, [Wikipedia](https://en.wikipedia.org/wiki/Ecological_fallacy) does a really great job breaking each of these down. If you’re interested in learning more about the specifics, head over there.)_

Ecological fallacies and modifiable areal unit problems go hand in hand: the methods for aggregating the data tend to highlight certain trends that are potentially damaging to true understanding (MAUP), and the conclusions drawn from the aggregated data can be erroneous (ecological fallacies).

Where this is really important is in the realm of public policy. Every policy proposal comes with a statistical analysis of need, or a statistical analysis of effectiveness based on geographic data (that’s why we have a census, y’all), and then an analysis and conclusions drawn from that data. But if the only data available for a specific metric is aggregated into neighborhoods, or census tracts, or zip codes, or watersheds, or any other group, are we really getting the whole story? Are the assumptions we’re making about the data correct?

When I tell people I make maps for a living, one of the most common responses is, “That’s still a job? Isn’t everything already mapped?”** Although it’s an extremely irritating and silly question, answering it several times has brought me to this conclusion: data display and design issues (MAUP) and the problems with data understanding (ecological fallacies), along with many other things, make data visualization a fascinating (and extremely relevant) science. I believe it is the job of the cartographer to understand the assumptions that will be made when users try to interpret her product, to try and provide as much data as possible, and to be as up front and honest about the ways in which the data is distorted by visualization.

Maps, just like any other information graphic, exist to show signals in the noise. We as cartographers should work hard to identify common assumptions and work _with_ them to tell accurate and interesting stories.

<em>* This is likely false. Election data is aggregated by polling place/ward/district/whatever grouping system is employed where you live. Which creates its own statistical data aggregation problems, no?</em>

<em>** I usually come up with two disparate geographic datasets that are so laughably separate that nobody would ever map them together, and talk about how cool it would be if they were juxtaposed. Like, a map of New York City showing art galleries overlayed with National Flood Insurance Program policy holders. If you’re interested in those sorts of strange map mashups, check out Rebecca Solint’s book, <a href="https://www.amazon.com/Infinite-City-San-Francisco-Atlas/dp/052026506">Infinite City: A San Francisco Atlas."</a></em>

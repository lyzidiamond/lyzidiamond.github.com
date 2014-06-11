---
layout: blog
title: 'Building a LocalWiki Changebot'
---

<h1><img src="/images/lexwiki.png" class="inline"></h1>

One thing that became obvious soon after becoming part of the Code for America family was the abundance of community-focused wikis – sites where anyone can contribute, intended to facilitate community around shared knowledge. Some cities have very successful and robust wikis (I'm looking at you, [OaklandWiki](http://oaklandwiki.org)), but others have some work to do to catch up.

During National Day of Civic Hacking last year in Lexington, [OpenLexington](http://openlexington.org) (the local [Code for America brigade](http://brigade.codeforamerica.org)) launched [LexingtonWiki](http://lexington-wiki.org), which is built on [LocalWiki](http://localwiki.org). Unfortunately, it hasn't yet gotten much traction, which is a huge bummer! The [Lexingteam](http://teambiglex.tumblr.com) thought it might be cool to have [Twitter notifications](http://twitter.com/openlexington) when a page on the wiki is edited/updated to try and publicize the wiki and get more folks editing. Turns out it's a pretty easy thing to set up.

## This is how we did it:

- Every LocalWiki instance has a Recent Changes RSS feed, and there's a pretty cool but casually hidden/relatively unknown feed for those changes. It lives at `http://[your wiki's URL]/Recent_Changes/_feed`.
- Discovering that feed was like, 90% of the challenge. From there, we set up a recipe in [IFTTT](http://ifttt.com) to automatically tweet when that feed was updated.

<h1><img src="/images/wikibot_ifttt.png" class="inline"></h1>

*IFTTT stands for IF This Then That. It's a service that allows you to combine internet services – in this case, a connecting a feed update to Twitter. People use IFTTT for all kinds of stuff: [getting a text message every day with the day's forecast](https://ifttt.com/recipes/83847-text-me-today-s-forecast-each-morning), [backing up their contacts to a Google Spreadsheet](https://ifttt.com/recipes/102384-backup-my-contacts-to-a-google-spreadsheet), or [saving their Instagram photos to Dropbox](https://ifttt.com/recipes/1552-instagram-dropbox).*

- Setting up a recipe in IFTTT is pretty easy. After you get an account and log in, click **Create a Recipe**.

<h1><img src="/images/create_recipe.png" class="inline"></h1>

- Click the link where it says **"this"** and select Feed from the list of triggers.

<h1><img src="/images/click_feed.png" class="inline"></h1>

- Since every item added to the feed is a new change, you can select **New feed item** as your trigger.
- Copy and paste the URL for the feed into the box provided and click **Create Trigger**.

<h1><img src="/images/create_trigger.png" class="inline"></h1>

- Click where it says **"that"** and choose **Twitter** as your action channel. You will probably have to set up IFTTT such that it can interact with your Twitter account, if you haven't already.
- Under Choose an Action, click **Post a tweet**.
- Now you can compose your tweet. The `EntryTitle` and `EntryUrl` fields will be automatically populated from the feed. The rest of the tweet is all yours to compose! When you're done, click **Create Action**.

<h1><img src="/images/create_action.png" class="inline"></h1>

- Look over everything to make sure you like it, and then click **Create Recipe.**

## Boom!

You have a **LocalWikiBot**. Recipes on IFTTT are triggered automatically every 15 minutes, so if you have a lot of edits, expect a flood of tweets on that mark. You can also set up your bot to have an action outside of Twitter: check out the full list of possible channels [here](https://ifttt.com/channels).
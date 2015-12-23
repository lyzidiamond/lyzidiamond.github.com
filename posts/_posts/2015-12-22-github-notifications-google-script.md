---
layout: blog
title: "Manage GitHub notification messages in Gmail with Google Apps Scripts"
---

A couple weeks ago, my colleague [Bryan Housel](https://twitter.com/bhousel) posted an internal note at work about GitHub's custom mail headers and how to use them to filter email notifications in Mail.app. [Mapbox has a lot of GitHub repos](https://github.com/mapbox), so we happily welcome any methods for managing what we call the "firehose." But not all of us use Mail.app, so I took his workflow and figured out how to make it work in the Gmail web interface using [Google Apps Scripts](https://developers.google.com/apps-script/?hl=en)! Here's how you can do that, too.

## What is Google Apps Scripts?

Google Apps Scripts allow you to write JavaScript to create programmatic add-ons for all of your Google apps (like Docs, Sheets, Calendar, and, in this case, Gmail). In this case, I wrote a script with Google Apps Scripts to interact with my Gmail account.

## What are these magical GitHub custom headers?

GitHub adds several [custom headers](https://support.google.com/mail/answer/29436?hl=en) to its email notifications. One of these, `X-GitHub-Reason`, states the _reason_ you are receiving the notification. Here is the full list of values for `X-GitHub-Reason` from the [GitHub API documentation](https://developer.github.com/v3/activity/notifications/#notification-reasons):

- **`subscribed`** &mdash; The notification arrived because you're watching the repository
- **`manual`** &mdash; The notification arrived because you've specifically decided to subscribe to the thread (via an Issue or Pull Request)
- **`author`** &mdash; The notification arrived because you've created the thread
- **`comment`** &mdash; The notification arrived because you've commented on the thread
- **`mention`** &mdash; The notification arrived because you were specifically @mentioned in the content
- **`team_mention`** &mdash; The notification arrived because you were on a team that was mentioned (like @org/team)
- **`state_change`** &mdash; The notification arrived because you changed the thread state (like closing an Issue or merging a Pull Request)
- **`assign`** &mdash; The notification arrived because you were assigned to the Issue

The _reason_ for receiving a notification is a useful way to categorize messages when you're receiving hundreds of them per day.

## How can you make these work for you in Gmail?

Gmail provides lots of handy ways to manage your inbox. I use [multiple inboxes](http://gmailblog.blogspot.com/2009/02/new-in-labs-multiple-inboxes.html) to keep my messages visually separated based on how they're labeled. Multiple inboxes are great because you can set multiple rules for what is to be included in each one -- for example, I can have one inbox that only contains messages from my parents or my sister that are starred and have an "Urgent" label.

For my work email, my five inboxes are:

- **Take Action** &mdash; messages starred with a red bang.
- **Assigned to me** &mdash; messages labeled "Assigned to me"
- **Participating** &mdash; messages labeled "Participating"
- **Mentioned** &mdash; messages labeled "Mention by name" or "Team mention"
- **Notifications** &mdash; all GitHub notifications

The script I wrote runs through the new emails in my inbox and labels them appropriately so they show up in the correct inbox.

## Okay, I'm sold! Show me the script!

Okay! Here it is!

{% highlight js %}
function processInbox() {
  var threads = GmailApp.getInboxThreads(0, 50);
  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];
    var messages = thread.getMessages();
    if (messages && ((messages[0].getFrom()).indexOf("github.com") > -1)) {
      thread.addLabel(GmailApp.getUserLabelByName("GitHub"));
      if ((messages[0].getFrom()).indexOf("notifications@github.com") > -1) {
        thread.addLabel(GmailApp.getUserLabelByName("Notification"));
        for (var j = 0; j < messages.length; j++) {
          var message = messages[j];
          sortMessage(message, thread);
        }
      }
      thread.moveToArchive();
    }
  }
}

function sortMessage(message, thread) {
  var body = message.getRawContent();
  if ((body.indexOf("X-GitHub-Reason: author") > -1) || (body.indexOf("X-GitHub-Reason: comment") > -1)) {
    thread.addLabel(GmailApp.getUserLabelByName("Participating"));
  }
  if (body.indexOf("X-GitHub-Reason: mention") > -1) {
    thread.addLabel(GmailApp.getUserLabelByName("Mention by name"));
  }
  if (body.indexOf("X-GitHub-Reason: team_mention") > -1) {
    thread.addLabel(GmailApp.getUserLabelByName("Team mention"));
  }
  if (body.indexOf("X-GitHub-Reason: assign") > -1) {
    thread.addLabel(GmailApp.getUserLabelByName("Assigned to me"));
  }
}
{% endhighlight %}

### What does this script do, exactly?

Glad you asked! This script:

- runs through the 50 most recent emails in your inbox
- adds a `GitHub` label if the message is from GitHub
- adds a `Notifications` label if the message is from `notifications@github.com`
- adds a `Participating` label if `X-GitHub-Reason` is `author` or `comment`
- adds a `Mention by name` label if `X-GitHub-Reason` is `mention`
- adds a `Team mention` label if `X-GitHub-Reason` is `team_mention`
- adds an `Assigned to me` label if `X-GitHub-Reason` is `assign`
- archives all messages labeled `GitHub`
- runs once per minute

## Neat! How do I make it work with my Gmail account?

You only have to do a few things:

### Add labels you want in Gmail

Add the following labels to your Gmail account:

- GitHub
- Notifications
- Participating
- Mention by name
- Team mention
- Assigned to me

Any label you use in the script must already exist in your Gmail account. (Note: You can create labels programmatically in your script, but this script will run automatically over and over again, and you only want to create the labels once. Doing it manually is most efficient.)

### Enable Google Apps Scripts for your account

Before you can write a script, you need to enable the Google Apps Scripts app in Google Drive. In your Google Drive home page, click **New** and hover over **More**. If you see **Google Apps Script** as one of the options, great! If not, click **Connect more apps** and connect the Google Apps Script app.

![](/images/addscript.png)

### Start a new script

Click **New** and **Google Apps Script** to start a new script. You should see a page that looks like this:

![](/images/blankscript.png)

Give the script a title and erase the empty `myFunction()` function.

### Copy and paste the script code into the body of your new script. Then run it!

Take the code I provided here and copy/paste it into the script. Make sure the drop down menu for starting function has `processInbox()` selected, then click play to run it! Note: You may have to run the script several times at first if you have more than 50 GitHub notifications in your inbox.

Once it's run a couple/few times, you can set a trigger for it to run once per minute by clicking the timer button.

![](/images/scriptui.png)

Boom! You're off to the races.

## Next steps

If you'd like to adapt this script to your specific needs, please do so! [There are many methods available for interacting with Gmail using Google Apps Scripts](https://developers.google.com/apps-script/reference/gmail/). As always, please [drop me a line](/) if you have any questions!

---
layout: post
title: Circumlocution and Code
category: posts
---

_"¿Cómo se dice 'roommate' en español?"_

We've all experienced those moments when we can't remember a word. It's on the tips of our tongues, and we try, but we can't seem to find it. Remarkably (or not-so-remarkably), this does not prevent us from communicating our idea. We just use other words to describe what we're talking about, describing it instead of picking the exact word.

> "I met this guy yesterday who had the most interesting job. He is a zoologist who focuses on birds!"
> "You mean an ornithologist?"
> "Right, an ornithologist. Anyway, he had the cutest accent..."

This practice is common in university language courses, where students are instructed to speak only in their language of study and not to utter a word of English. In these cases, where students do not have a command of the vocabulary in the new language, the conversations tend to consist of talking _around_ the actual words in order to foster meaning. For example:

> "¿Quién es ella?"
> "Ella vive en mi casa."
>[Translation: Who is she? She lives in my house.]

The term for "roommate" in Spanish is "compañero de casa," but "alquien que vive en mi casa" (someone who lives in my house) works just as well. The student in the example didn't know the word for roommate, so he talked _around_ it. This is called **circumlocution.**

As a newbie coder, I find myself frequently circumlocuting when writing code. My Python vocabulary is limited, but even with the small amount of knowledge I have obtained and the few methods I know, I can still effectively write scripts that execute without error. They're not beautiful or concise, necessarily, but they _work_. As a beginner, this is extremely empowering.

For example, I have been writing a Python scraper to pull some data from an HTML page. (I'll write a post dedicated to it with more specifics when it's done.) A part of the data I'm trying to gather requires me to break apart a string into pieces and insert those pieces into separate columns. Using my limited Pythonic vocabulary and the help of an external library, I was able to isolate the string I needed to break apart... but then I was stuck. Cursory Google searches instructed me to use regular expressions, but that required knowledge I didn't have, and time I didn't have to acquire said knowledge. Instead, I used a piece of vocabulary I already knew: Python's built in partition() method. By selecting elements from resulting tuples and using partition() a few times, I finally got the pieces I wanted into my database. I talked _around_ the problem, circumlocuting using the vocabulary I knew to achieve my desired end.

And it worked. Just as "person who lives in my house" and "roommate" mean roughly the same thing when communicating with a peer, the partition() method and the result of a regular expression mean roughly the same thing to the computer. And it worked. And that felt _awesome_.

Will I continue using this roundabout method forever? Certainly not. But I bet knowing the long way around and writing too many lines of code will be helpful when I learn the shortcuts that are used by more proficient programmers to achieve the same ends. Not only will I understand what I'm doing better, I will have made the mistake myself and be more encouraged to try it another way in order to make progress.

I vote that experienced developers encourage beginners to write code this way, to try the long way, to solve problems using the tools they have. Too often novice coders are afraid to show what they have created for fear of being belittled by those who know how to do it "better." If we turn circumlocution into an accepted learning tool and begin to see it as part of the process, I believe that more beginners will feel confident showing the world their code and will later relish the opportunity to see where they've been and how far they've come.
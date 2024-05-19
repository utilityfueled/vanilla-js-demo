## Introduction
 
This is a simple vanilla JS implementation of content-checker--who needs fancy React for content moderation?

content-checker works with both ESM and CommonJS projects! [Check out the npm package](https://www.npmjs.com/package/content-checker)
and the [GitHub repo](https://github.com/utilityfueled/content-checker)

Install dependencies using 

```
npm install
```

Run the script using

```
node index.js
```

## What is content-checker?

`content-checker` is designed to be a modern, open-source library for programmatic and AI content moderation. Currently content-checker supports image and text moderation.
Thanks to Google's Perspective API, in addition to detecting specific profane words, we can detect malicious **intent** in text.
So, a user who tries to circumvent the AI profanity filter by using a variation of a profane word, or even just a malicious phrase
without a specific word in the profanity list, will still be flagged. Image moderation is also supported, using the Inception V3 model of the NSFW JS library.
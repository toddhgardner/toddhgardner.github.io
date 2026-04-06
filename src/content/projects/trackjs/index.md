---
title: TrackJS
subtitle: JavaScript Error Monitoring
description: |-
  I co-founded TrackJS in 2013 with Eric Brandes and Nick Pelton to solve a problem I kept running into doing consulting work: JavaScript errors in production were nearly impossible to debug without context. TrackJS became a bootstrapped, profitable business that has been catching errors for developers at companies like 3M, IKEA, Venmo, and thousands of others for over a decade.
startedOn: 2013-03-01
image: ./trackjs.png
url: "https://trackjs.com/"
---

I co-founded TrackJS in early 2013 with Eric Brandes and Nick Pelton. The idea came out of my consulting work, where I kept running into the same problem: JavaScript errors in production were nearly impossible to understand. The browser gives you a message, a file name, and a line number — and if you're lucky, a stack trace. That's not enough to actually fix anything.

The insight that became TrackJS was that errors don't happen in a vacuum. There's always a story: what the user clicked, which network requests fired, what the console was saying, what was happening in the DOM. We built the Telemetry Timeline to capture that story automatically, giving developers a replay of everything that led up to the error. It turned out to be a genuinely novel idea — most of the major error monitoring platforms have since built their own version of it, which they call "breadcrumbs."

We launched at Minnebar, a local Minneapolis tech unconference, demoed at JavaScriptMN, and started finding customers who had the same frustrations we did. The original name was {Track:js}, which was supposed to feel developer-y and a little clever. It mostly just confused people about what our name actually was. In 2018 we simplified to TrackJS and cleaned up the whole brand along with it.

The business was bootstrapped from the start — the three of us put in $1,500 each and built from there. No outside investors, no VC, no one to answer to but our customers. That turned out to be one of the best decisions we made. It meant we could focus on building a tool developers actually wanted rather than chasing growth metrics that don't reflect real value. TrackJS has been profitable for over a decade and is still owned and operated by the people who built it.

One of the things I'm most proud of is how we approached pricing. Most error monitoring tools charge by error volume, which creates a perverse incentive: the vendor makes more money when your app is broken. We priced by page views instead, which aligns our interests with our customers'. We want you to have fewer errors, not more.

The product has grown a lot since the early days. We added source map support, advanced filtering and ignore rules, custom metadata, multiple application management, Node.js support, and integrations with Slack and Teams. We also built out a large library of JavaScript error reference documentation to help developers understand and fix common errors — which ended up being a meaningful source of organic traffic and goodwill in the developer community.

TrackJS is rated 4.7 out of 5 on G2, and the feedback that shows up most often is some variation of "it just works, and when I need help, a real engineer responds." That's intentional. Eric and I have always handled support ourselves, which keeps us close to customer problems and honest about where the product falls short.

Over the years, building and running TrackJS has taught me more about sustainable software businesses than anything else I've done. How to keep infrastructure costs sane. How to say no to features that don't serve your core customer. How to survive vendor failures, browser changes, and shifting ecosystems without the safety net of a funding runway. It's been a genuinely great business to build.
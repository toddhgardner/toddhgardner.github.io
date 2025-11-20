---
title: "Build vs Buy: What This Week's Outages Should Teach You"
description: |-
  The simple rule everyone gets wrong: build what makes you unique, buy what makes you run. But whatever you do, make sure you understand it well enough to fix it when it breaks. Because it will break.
publishedOn: '2025-11-19'
tags:
  - Engineering
  - Leadership
  - Business
---

A few years back, I gave a conference talk called "Build vs Buy: Software Systems at Jurassic Park" where I argued that the real villain wasn't the velociraptors or the T-Rex—it was Dennis Nedry's custom software. The park's catastrophic failure wasn't just about one disgruntled programmer; it was about choosing to build critical infrastructure that should have been bought. You can [watch the whole thing here](/blog/build-vs-buy), but this week's events make the lesson worth revisiting.

In the span of a few days, we've watched some of the internet's most critical infrastructure go down. [Cloudflare had a major outage today](https://blog.cloudflare.com/18-november-2025-outage/) that took down huge swaths of the web. [GitHub went down](https://www.githubstatus.com/incidents/5q7nmlxz30sk). [AWS had issues last week](https://www.theguardian.com/technology/2025/oct/24/amazon-reveals-cause-of-aws-outage). And while each failure had its own specific cause, they all highlight the same fundamental problem: we've built our businesses on top of abstractions we don't understand, controlled by companies we can't influence.

## The Simple Rule That Everyone Gets Wrong

Here's the thing, **if your core business function depends on some capability, you should own it** if at all possible. You need to control your destiny, and you need to take every opportunity to be better than your competitors. If you just buy "the thing you do," then why should anyone buy it from you?

But tech leaders consistently get this backwards. They'll spend months building their own analytics tools while running their entire product on a cloud provider they don't understand. They'll craft artisanal monitoring solutions while their actual business logic—the thing customers pay for—runs on someone else's computer.

## The Infrastructure Trap

Of course, there are exceptions. Sometimes you can't do something you depend on because of expertise or affordability. As a software provider, I need servers, networks, and datacenters to deliver my software, but I couldn't afford to build a datacenter.

But here's where most companies go wrong: just because I need some infrastructure doesn't mean I should jump to a full-on cloud provider. I need some servers. I don't need a globally-redundant PaaS that allows me to ignore how computers work. In my experience, that's an outage waiting to happen.

This is what I mean about controlling your own destiny. Building my product on hardware is transparent. When something goes wrong, it's understandable. A DIMM went bad. We lost a drive. The system needs to be swapped out. It's understandable, and I have a timeline and alternatives that I can control.

But with cloud providers, there are millions of lines of code between my stuff and anything real. No one really understands how all of it works. When Cloudflare's Bot Management system started choking on a malformed configuration file today, it took down services that had nothing to do with bot management. When something goes down, it can take hours for anyone to even acknowledge the problem, and there's little transparency about how long it will take to fix. Meanwhile, customers are screaming.

## The Right Way to Think About It

This has informed our philosophy on how we choose to build or buy software:

**Build what delivers your value.** If I need something to deliver my products, I try as hard as I can to build it myself. I want to own it. I want to control it. I don't want to depend on someone else or suffer their mistakes. If I can't build it for cost or expertise reasons, I want to buy something that is as simple as possible. Something that has as thin of an abstraction layer as possible.

**Buy everything else.** If I don't need it to deliver my services, I want to buy it. I want to buy analytics. I want to buy CRM. I want to buy business operations products.

Some things you should probably buy, even if you don't buy them from me.

- **Error monitoring?** Buy it. ([TrackJS](https://trackjs.com))
- **Performance monitoring?** Buy it. ([Request Metrics](https://requestmetrics.com))
- **SSL certificate management?** Definitely buy it. ([CertKit](https://www.certkit.io/))

These aren't your core business. They're solved problems. Building them yourself is like Jurassic Park deciding to build their own door locks. How did that work out?

## The Abstraction Problem

The real danger isn't in buying software, it's in buying abstractions so complex that you can't understand what's happening when they fail. Yesterday's Cloudflare outage is a perfect example. A permissions change in a database caused a configuration file to double in size, which exceeded a hard-coded limit in their proxy software, which caused 5xx errors across their entire network.

How many layers of abstraction is that? How many of those layers could you debug if it was your system?

When you build on top of these massive platforms, you're not just outsourcing your infrastructure—you're outsourcing your ability to understand and fix problems. You're trading control for convenience, and when that convenience fails, you're helpless.

## Learn from the Dinosaurs

In Jurassic Park, they built everything themselves because they thought they were special. They thought their needs were unique. They thought they could do it better. They were wrong.

But they would have been just as wrong to outsource everything to InGen Cloud Services™ and hope for the best. The answer isn't at the extremes—it's in being thoughtful about what you build and what you buy.

Build what makes you unique. Buy what makes you run. And whatever you do, make sure you understand how it works well enough to fix it when it breaks.

Because it will break. And when it does, "we're experiencing higher than normal call volumes" isn't going to cut it with your customers.

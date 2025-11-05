---
title: "The Hotel WiFi Problem: Building Resilient JavaScript Apps"
publishedOn: 2025-10-16 12:43 PM -5:00
description: |-
  Your app works everywhere except that one customer's corporate network. Here's how to build JavaScript apps that survive hostile networks, captive portals, and the special hell of hotel WiFi.
tags: ["javascript", "trackjs", "error handling"]
---

Your app works everywhere except that one customer's corporate network. Sound familiar?

Last year, I got a support ticket that simply said: "App broken at Marriott." That's it. No error message, no screenshot, just five words that would teach me everything wrong with how we build web apps.

## The Hotel WiFi Circle of Hell

Hotel WiFi isn't just slow. It's actively hostile to your application. Here's what happens when your customer opens your app at the hotel:

DNS lies to you. Every domain resolves to their portal, regardless of what you actually requested. HTTPS gets intercepted, but certificates might still look valid because of corporate SSL inspection appliances. JavaScript files get cached indefinitely by "optimization" proxies that think they're helping. WebSocket connections are blocked because they look suspicious. Random requests get HTML login pages injected as responses.

The worst part? Your monitoring shows nothing. The errors happen before your JavaScript even loads. Your customer sees a broken app while your dashboards show five nines of uptime.

I spent three days debugging that Marriott issue. The customer would open our app, and it would immediately crash with [Unexpected token errors](https://trackjs.com/javascript-errors/unexpected-token/). But only at the hotel. And only after sitting idle for exactly 30 minutes.

## The Perfect Storm of Network Interference

Turned out, the customer was connecting through their company VPN while at the hotel. Double network hell.

The hotel WiFi was injecting a session timeout warning. But the corporate proxy was also injecting its own timeout warning. Our JSON API responses were getting both HTML snippets inserted into them, creating this monstrosity: valid HTTP headers saying everything was fine, Content-Type claiming it was JSON, but the body was HTML with inline JavaScript alert dialogs.

Status 200. Content-Type: application/json. Body: HTML with script tags.

This is the crazy reality of the modern web.

## The Three Rules of Network Survival

After years of fighting with hostile networks, here are my rules:

**Rule 1: Assume the network is lying**
Never trust HTTP headers. A 200 status doesn't mean success. Content-Type: application/json doesn't mean you're getting JSON. That HTTPS certificate might be from a corporate proxy, not your server. Validate everything at the application layer.

**Rule 2: Fail fast and loud**
When something seems wrong, don't try to soldier on. If you expect JSON and get HTML, stop immediately. Show the user a clear message about network issues. It's better to fail obviously than to corrupt data or crash mysteriously later.

**Rule 3: Build escape hatches**
Give users options when networks misbehave. Can they retry on mobile data? Save their work locally? Export their data? Don't just show an error and strand them. The network might be broken, but their work doesn't have to be lost.

## The Bottom Line

We pretend the internet is this reliable pipe that delivers our bytes unchanged. It's not. It's a chaotic mesh of proxies, firewalls, captive portals, and middleboxes, all trying to "optimize" or "secure" your traffic. Every network between your server and your user is a potential adversary.

Your JavaScript app needs to be paranoid. Not paranoid in the security sense (though that too), but paranoid in the "everyone is trying to help and their help will break everything" sense.

That Marriott customer? We eventually fixed their issue by detecting portal interference and showing a banner: "Network interference detected. Please disconnect from WiFi or VPN and use mobile data." Not elegant, but it worked.

Because sometimes the best solution isn't fixing the problem. It's helping users understand that the problem isn't your app—it's the hostile network environment trying to "help."

Build accordingly. The network is not your friend.
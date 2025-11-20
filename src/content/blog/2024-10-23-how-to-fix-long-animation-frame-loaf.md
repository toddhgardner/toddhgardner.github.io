---
title: "How to Fix Long Animation Frames (LoAF) and Speed Up Your Website"
description: |-
    If you’ve noticed your website feeling sluggish or unresponsive—especially during animations—you might be running into Long Animation Frames (LoAFs). LoAFs happen when a browser takes longer than 50 milliseconds to render an animation frame, leading to a janky experience that can frustrate users.
publishedOn: "2024-10-23"
tags:
  - Web Performance
  - Request Metrics
---

If you’ve noticed your website feeling sluggish or unresponsive—especially during animations—you might be running into **Long Animation Frames (LoAFs)**. LoAFs happen when a browser takes longer than 50 milliseconds to render an animation frame, leading to a janky experience that can frustrate users. But what exactly are LoAFs, and how can you fix them to ensure your site runs buttery smooth?

**LoAFs** occur when the browser’s rendering pipeline is overloaded. This can be due to heavy JavaScript execution, layout recalculations, or large files that take too long to process. Unlike the **Long Tasks API**, which only identifies long-running tasks, the **LoAF API**—introduced in **Chrome 123**—specifically tracks the rendering time of animation frames, giving developers more insight into why animations may feel laggy.

So, how do you go about fixing LoAFs?

## Common Causes of LoAFs

One of the major culprits of LoAFs is **long JavaScript execution**. When scripts run too long within a single frame, the browser struggles to keep up. A simple fix is to break up long-running tasks into smaller chunks using `setTimeout` or other techniques to allow the browser to render frames in between.

**Large JavaScript files** also play a big role in causing LoAFs. When a browser downloads a large JavaScript bundle, it has to parse, compile, and execute the entire file, which blocks the main thread and delays rendering. Code-splitting and deferring non-essential scripts are two ways to minimize the impact of large JavaScript files.

Another common issue is **forced synchronous layouts**, which happen when JavaScript modifies the DOM and immediately reads layout properties. This forces the browser to stop what it’s doing and recalculate the layout, delaying frame rendering. To avoid this, batch your DOM reads and writes and use CSS `transform` for animations, which bypass layout recalculations entirely.

## Tools for Tracking and Fixing LoAFs

Tracking down and fixing LoAFs requires the right tools. You can use **PerformanceObserver** to capture LoAF events as they happen and log them for further analysis. For real-world, user-based data, a **Real User Monitoring (RUM)** tool like **[Request Metrics](https://requestmetrics.com/web-performance/long-animation-frame-loaf/)** is even better, as it captures how LoAFs impact real users on different devices and under various network conditions.

Another great option is **Chrome DevTools**, where you can analyze the **Performance Panel** to see long tasks, paint events, and resource loads. While LoAFs aren’t exposed by default, you can extend DevTools using the **Performance API** to log and track long animation frames in real time.

### Wrapping Up

Fixing Long Animation Frames (LoAFs) is crucial to improving your website’s performance and delivering a smoother, more responsive user experience. Whether you’re dealing with **heavy JavaScript**, **large files**, or **forced layouts**, there are clear, actionable steps you can take to reduce LoAFs and improve your site’s animations.

If you want to dive deeper into how to track, analyze, and fix LoAFs, check out the **[full post I wrote about LoAFs](https://requestmetrics.com/web-performance/long-animation-frame-loaf/)** for more information.

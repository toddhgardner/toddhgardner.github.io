---
title: CertKit
subtitle: SSL Certificate Automation
description: |-
  I founded CertKit with Eric Brandes and Jordan Griffin after we built an internal tool to solve our own SSL certificate management problems at TrackJS. As certificate lifetimes started dropping toward 47 days, we realized what started as an internal convenience had become something other teams genuinely needed.
startedOn: 2025-09-01
image: ./certkit.png
url: "https://www.certkit.io/"
---

CertKit started as an internal tool with no name and no ambitions beyond solving our own problem at TrackJS. For years, managing SSL certificates was a once-a-year chore: buy a new wildcard certificate, pull up the checklist, spend an afternoon pushing it to every server that needed it. Annoying, but manageable.

Then the industry started driving certificate lifetimes down. 90 days became the norm, and 47 days is coming. At that cadence, an annual checklist becomes someone's part-time job. So Eric and I went looking for automation.

The obvious answer was certbot, the standard open source ACME client that everyone reaches for. It didn't work for us. Certbot assumes one certificate, one server, publicly accessible, running Linux. Our infrastructure doesn't match any of those assumptions. We use wildcards that need to be distributed to multiple hosts. Most of our servers aren't publicly accessible. We run Windows hosts alongside Linux. Certbot wasn't going to get there without so many workarounds that we'd have traded one operational risk for another.

So we built our own. The design was straightforward: a centralized ACME client that handles renewal in one place and distributes certificates to everything that needs them — Windows servers, Linux hosts, Java Keystores, whatever the environment requires. Because we're a monitoring company by trade, we built monitoring in from day one. Not just watching expiration dates, but verifying that the certificate actually running on each host matches the expected thumbprint. If automation fails silently and an old cert stays in place, CertKit catches it immediately.

It worked well enough that we kept adding to it. Better Windows support, local key storage, certificate transparency log monitoring, more platform integrations. And we started hearing from other teams who had the same infrastructure mismatch problems with certbot that we had. That's when we realized we had something worth turning into a real product.

We ran a quiet beta for about a year, gathering feedback and adding the things real infrastructure teams actually needed. CertKit formally launched in 2025 as a simple, affordable, fully automated certificate management platform built for infrastructure that doesn't fit the tidy assumptions of standard tooling.
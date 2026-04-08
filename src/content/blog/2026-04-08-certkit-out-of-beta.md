---
title: "CertKit is Out of Beta"
description: |-
  Why I built a certificate management platform, what's wrong with the way we handle certs today, and why CertKit exists as a commercial product now.
publishedOn: 2026-04-08
tags:
  - Business
  - CertKit
---

[CertKit](https://www.certkit.io) launched as a commercial product today. We're on Product Hunt and Show HN if you want to check it out. But I wanted to tell the backstory here.

## Certificates shouldn't be this hard

I've been managing web infrastructure for a long time. For most of that time, certificate management meant buying a cert, copying it to every server that needed it, and setting a calendar reminder for 11 months later. It wasn't elegant, but it worked.

It's not going to work anymore. Certificate lifetimes are dropping to 47 days. That calendar reminder strategy falls apart when you need to do it every six weeks, across every server, for every domain. The chain of "someone remembers, someone acts, someone verifies" breaks constantly even at yearly intervals. At 47 days, it's not a process. It's a full-time job.

## The Certbot gap

Certbot solved the issuance problem really well. If you have a Linux server with a public-facing domain, it mostly just works. But it stops at issuance. ACME runs on every machine, which means every machine needs to be internet-reachable or have DNS provider access. That rules out a lot of real-world infrastructure: Windows servers, JKS keystores, network appliances, anything behind a firewall that can't speak ACME.

And even when Certbot works, it doesn't handle distribution or monitoring. How do you push one certificate to a three-server web farm? How do you know the right cert is actually running everywhere? The answer is always "just write a script." Thanks.

## Why we built CertKit

CertKit starts from a different place. ACME is handled centrally, in one place. A small agent on each server handles deployment — including Windows, JKS, and appliances via custom file destinations and post-deploy commands. One dashboard shows every certificate across your infrastructure: what's deployed where, what's expiring, and whether the right cert is actually running based on an external thumbprint check.

I also wanted to get the security model right. Most certificate tools ask for your DNS API credentials to handle validation. That always felt wrong to me. CertKit uses a delegated CNAME record instead. You set it up once and we never need access to your DNS provider again.

## A year of beta

We launched the beta in July 2025. Over 600 people signed up. Several are running CertKit as their production certificate management platform right now. Some of the most important features came from those users telling us what we got wrong. The Keystore feature, RDP and RRAS support, better Windows infrastructure handling — none of that was on our original roadmap. Users beat it into us.

After a year of that, CertKit is stable, the core is solid, and we're ready to be a real product. We wrote up [the full launch details on the CertKit blog](https://www.certkit.io/blog/out-of-beta), including **founder pricing at 40% off forever** for early adopters who subscribe before May 31st.

If certificates are something you deal with, [give it a look](https://www.certkit.io). We're doing hands-on onboarding with every new customer right now. You get a real person.

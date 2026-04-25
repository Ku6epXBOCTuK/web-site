---
title: sveltekit static adapter tips
date: feb 2026
excerpt: adapter-static is simple until it isn't. form actions, dynamic routes, and other things that bite you when you don't have a server.
tag: tutorial
---

# sveltekit static adapter tips

adapter-static is simple until it isn't.

## The Gotchas

- form actions don't work without a server
- dynamic routes need explicit prerender
- API routes need adapter-static config

## Solutions

configure prerender: true for each dynamic route.

---
layout: page
title: A Tropical Tour of LeetCode
description: Classic dynamic programming problems, revisited as matrix multiplication in an exotic arithmetic.
order: 3
---

Take the matrix multiplication you already know, and change the arithmetic inside it:
wherever you would _multiply_ two numbers, **add** them instead; wherever you would
_add_, take the **max**. The result is called _tropical_ matrix multiplication, and it
has a strange superpower: many of the dynamic programming algorithms you meet in an
algorithms class — House Robber, maximum subarray sum, stock trading — _are_ tropical
matrix products, in disguise.

This is not a party trick. Once a DP is a matrix product, associativity kicks in: you
can cut the input anywhere, summarize the pieces independently, and multiply the
summaries back together. That one fact generates segment trees, parallel algorithms,
and closed-form answers for inputs of astronomical length — and it explains where the
"clever" combine rules in textbooks actually come from.

Each stop on the tour takes one problem you may have seen before, puts on the tropical
glasses, and cashes in one payoff. No prerequisites beyond basic DP and matrix
multiplication.

## Stops on the tour

{% assign chapters = site.stories | where: "series", "tropical-tour" | sort: "order" %}

<ul class="post-list">
  {% for chapter in chapters %}
    <li>
      <p class="post-meta">Stop {{ chapter.order }} of {{ chapters.size }}</p>
      <h3><a class="post-title" href="{{ chapter.url | relative_url }}">{{ chapter.title }}</a></h3>
      {% if chapter.description %}<p>{{ chapter.description }}</p>{% endif %}
    </li>
  {% endfor %}
</ul>

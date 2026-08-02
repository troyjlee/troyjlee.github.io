---
layout: page
permalink: /stories/
title: stories
description: Interesting things I don't want to forget.
nav: true
nav_order: 3
---

{% assign sorted = site.stories | sort: "order" %}

<ul class="post-list">
  {% for story in sorted %}
    {% unless story.subpage %}
      <li>
        <h3><a class="post-title" href="{{ story.url | relative_url }}">{{ story.title }}</a></h3>
        {% if story.description %}<p>{{ story.description }}</p>{% endif %}
      </li>
    {% endunless %}
  {% endfor %}
</ul>

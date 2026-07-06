---
layout: page
permalink: /notes/
title: notes
description: Series of informative pages on topics I find interesting.
nav: true
nav_order: 3
---

{% assign sorted_notes = site.notes | sort: "order" %}

<ul class="post-list">
  {% for note in sorted_notes %}
    <li>
      <h3><a class="post-title" href="{{ note.url | relative_url }}">{{ note.title }}</a></h3>
      {% if note.description %}<p>{{ note.description }}</p>{% endif %}
    </li>
  {% endfor %}
</ul>

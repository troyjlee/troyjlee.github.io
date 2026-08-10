---
layout: course
title: Advanced Algorithms
description: Advanced algorithm design and analysis.
year: 2026
term: Spring
course_id: advanced-algorithms-2026
schedule:
  - week: 1
    topic: Dynamic Programming
    description: >-
      Longest path in a DAG · Bellman–Ford: shortest paths with negative edges
      as DP on walks · maximum subarray sum · longest increasing subsequence ·
      coin change
    materials:
      - name: Lecture slides
        url: /assets/courses/advanced-algorithms-2026/lectures/week01.html
      - name: Lecture slides (PDF)
        url: /assets/courses/advanced-algorithms-2026/lectures/week01.pdf
      - name: "Animation: Longest Path in a DAG"
        url: /assets/courses/advanced-algorithms-2026/animations/longest_path_dag.html
      - name: "Animation: Bellman–Ford"
        url: /assets/courses/advanced-algorithms-2026/animations/bellman_ford.html
      - name: "Animation: Kadane's Algorithm"
        url: /assets/courses/advanced-algorithms-2026/animations/kadane.html
      - name: "Animation: Longest Increasing Subsequence"
        url: /assets/courses/advanced-algorithms-2026/animations/lis.html
      - name: "Animation: Patience Sorting"
        url: /assets/courses/advanced-algorithms-2026/animations/patience_sorting.html
      - name: "Animation: Coin Change"
        url: /assets/courses/advanced-algorithms-2026/animations/coin_change.html
  - week: 2
    topic: 2D Dynamic Programming
    description: >-
      Longest common subsequence · reducing LCS to LIS · fine-grained
      complexity: why the textbook algorithm may be optimal
    materials:
      - name: Lecture slides
        url: /assets/courses/advanced-algorithms-2026/lectures/week02.html
      - name: Lecture slides (PDF)
        url: /assets/courses/advanced-algorithms-2026/lectures/week02.pdf
      - name: "Animation: Longest Common Subsequence"
        url: /assets/courses/advanced-algorithms-2026/animations/lcs.html
  - week: 3
    topic: Dynamic Programming on Trees
    description: >-
      Maximum matching, maximum independent set, and minimum vertex cover on
      trees
    materials:
      - name: Lecture slides
        url: /assets/courses/advanced-algorithms-2026/lectures/week03.html
      - name: Lecture slides (PDF)
        url: /assets/courses/advanced-algorithms-2026/lectures/week03.pdf
      - name: "Animation: Dynamic Programming on Trees"
        url: /assets/courses/advanced-algorithms-2026/animations/tree_dp.html
      - name: "Animation: Kőnig's Theorem"
        url: /assets/courses/advanced-algorithms-2026/animations/konig.html
  - week: 4
    topic: Greedy Algorithms
    description: >-
      Greedy maximum matching on a tree · activity selection · the exchange
      property
  - week: 5
    topic: Kruskal's Algorithm
    description: >-
      The graphic matroid · every cut's minimum weight edge is in an MST ·
      implementing Kruskal with union-find
  - week: 6
    topic: Prim's Algorithm
    description: >-
      Review of Dijkstra's algorithm · Prim as Dijkstra with bottleneck
      distance · Borůvka's MST algorithm
  - week: 7
    topic: Minimum Cut
    description: >-
      Randomised algorithms and basic probability · Karger's randomised
      contraction algorithm
  - week: 8
    topic: Maximum Flow
    description: >-
      Ford–Fulkerson · Edmonds–Karp · max-flow = min-cut via the residual
      graph · applications: bipartite matching, matrix rounding
  - week: 9
    topic: Linear Programming I — Modelling and Geometry
    description: >-
      LPs in standard form · the feasible region as a polytope · LP
      relaxations and integrality gaps · Kruskal and the matroid polytope
  - week: 10
    topic: Linear Programming II — Duality
    description: >-
      Weak and strong duality · writing the dual of an LP · max-flow/min-cut
      as LP duality · König's theorem · complementary slackness
  - week: 11
    topic: NP-completeness
    description: >-
      Decision vs search problems · the verifier definition of NP ·
      polynomial-time reductions · SAT, 3SAT, independent set, vertex cover,
      clique, Hamiltonian path
  - week: 12
    topic: Approximation Algorithms
    description: >-
      LP-rounding and primal–dual 2-approximations for vertex cover ·
      2-approximation for metric TSP via MST · greedy ln(n)-approximation for
      set cover
---

A 12-week course on advanced algorithm design and analysis, continuing on from
Data Structures and Algorithms in C++.

Lecture notes and course materials are posted in the schedule below as the
course progresses.

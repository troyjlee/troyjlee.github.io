---
layout: course
title: Data Structures and Algorithms
description: Fundamental data structures and algorithms.
year: 2026
term: Fall
course_id: data-structures-algorithms-2026
schedule:
  - week: 1
    topic: C++ Basics
    description: >-
      Types, variables, control flow, functions · references vs values:
      pass-by-value, pass-by-reference, pass-by-const-reference · classes:
      members, constructors, access specifiers · `std::vector` as a user (not
      implementer)
  - week: 2
    topic: Pointers, Dynamic Memory, RAII
    description: >-
      Pointers: addresses, dereference, `nullptr` · dynamic memory: `new` /
      `delete`, heap vs stack · RAII: destructors and resource ownership ·
      a brief look at C-style arrays · header files and the compilation model
  - week: 3
    topic: Templates, Iterators, and Big-O
    description: >-
      Function templates and class templates · iterators: the abstraction and
      its categories · Big-O notation: definition, common growth rates, why we
      care · worked example: amortised analysis of `push_back`
  - week: 4
    topic: Linked Lists and Recursion
    description: >-
      Recursion: base case, recursive case, the call stack · singly linked
      lists: traversal, insertion, deletion · linked list vs vector: when O(1)
      vs Ω(n) matters in practice · recursion on linked structures
  - week: 5
    topic: Hash Tables, Stacks, and Queues
    description: >-
      Hash tables: hashing, collisions, chaining, expected O(1) lookup ·
      stacks and queues: LIFO/FIFO, typical use cases · `std::unordered_map`,
      `std::stack`, `std::queue` as users
  - week: 6
    topic: Sorting and Divide-and-Conquer
    description: >-
      Insertion sort and why it's O(n²) · the divide-and-conquer paradigm ·
      mergesort: algorithm, recurrence, O(n log n) analysis · quicksort:
      partition, average vs worst case
  - week: 7
    topic: Binary Trees, Traversals, and BSTs
    description: >-
      Binary trees as a recursive structure · preorder, inorder, and postorder
      traversals · binary search trees: invariant, insertion, search · inorder
      traversal of a BST yields sorted output
  - week: 8
    topic: Heaps and Priority Queues
    description: >-
      Binary heaps: array representation, heap property · push and pop (sift
      up, sift down) · priority queues: the abstraction, when to reach for
      one · `std::priority_queue` as a user
  - week: 9
    topic: "Graphs: Representations, BFS, and DFS"
    description: >-
      Graph representations: adjacency list vs adjacency matrix · directed vs
      undirected, weighted vs unweighted · BFS and unweighted shortest paths ·
      DFS as the natural traversal companion
  - week: 10
    topic: "DFS Applications: Cycle Detection and Topological Sort"
    description: >-
      DFS with colours, discovery and finish times · cycle detection in
      directed graphs · topological sort via DFS finish order and Kahn's
      algorithm · DAGs and why they're special
  - week: 11
    topic: "Shortest Paths: DAG Shortest Paths and Dijkstra"
    description: >-
      Shortest paths on a DAG by relaxing edges in topological order · why
      this fails on graphs with cycles · Dijkstra's algorithm and the priority
      queue insight · correctness intuition, complexity analysis
  - week: 12
    topic: Dynamic Programming (Intro)
    description: >-
      DP as recursion + memoisation · top-down (memoised) vs bottom-up
      (tabulated) formulations · overlapping subproblems and optimal
      substructure · connection back to DAG shortest paths · full treatment
      continues in
      [Advanced Algorithms](/teachings/advanced-algorithms-spring-2026/)
---

A 12-week course on fundamental data structures and algorithms in C++. Each
week has a 2-hour lecture and a 1.5-hour tutorial.

Lecture notes and course materials are posted in the schedule below as the
course progresses.

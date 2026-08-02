---
layout: page
title: A Tropical Take on Maximum Subarray Sum
description: Let the crossing problem force the four-field block summary, then watch the combine rules become one 3×3 tropical matrix product.
series: tropical-tour
subpage: true
order: 2
---

## The problem

> Given an array of numbers, find the contiguous subarray (containing at least
> one number) with the largest sum.
> ([LeetCode 53](https://leetcode.com/problems/maximum-subarray/))

We will use the first example from Leetcode

$$
[-2,1,-3,4,-1,2,1,-5,4].
$$

Its maximum subarray sum is obtained by

$$
[4,-1,2,1],
$$

whose sum is $$6$$.

## Defining subproblems

Call the input array $$\mathtt{a}$$. Let $$\mathtt{dp}[i]$$ be the
maximum subarray sum that _ends at_ $$\mathtt{a}[i]$$.

There are two possibilities. Either this subarray sum includes $$\mathtt{a}[i-1]$$
or not. If it does not, then the value is just $$\mathtt{a}[i]$$. If it does, then
the best we can do is to include the maximum subarray ending at $$\mathtt{a}[i-1]$$
and $$\mathtt{a}[i]$$.
Therefore $$\mathtt{dp}[0] = \mathtt{a}[0]$$ and for $$i \ge 1$$

$$
\mathtt{dp}[i]
=\max\bigl(\mathtt{a}[i],\ \mathtt{dp}[i-1]+\mathtt{a}[i]\bigr).
$$

Note that we don't need to remember the entire $$\mathtt{dp}$$ array, only
the previous value. Let's call that `ending` as in best subarray sum ending here.
We also keep `best`, the largest sum seen anywhere so far.

Here is the whole run with these two variables. The “ending here” column is allowed to fall: it must touch
the current value. The “best anywhere” column never falls because it may remember
an earlier winner.

| current value | best subarray ending here | `ending` | `best` |
| ------------- | ------------------------- | -------- | ------ |
| $$-2$$        | $$[-2]$$                  | $$-2$$   | $$-2$$ |
| $$1$$         | $$[1]$$                   | $$1$$    | $$1$$  |
| $$-3$$        | $$[1,-3]$$                | $$-2$$   | $$1$$  |
| $$4$$         | $$[4]$$                   | $$4$$    | $$4$$  |
| $$-1$$        | $$[4,-1]$$                | $$3$$    | $$4$$  |
| $$2$$         | $$[4,-1,2]$$              | $$5$$    | $$5$$  |
| $$1$$         | $$[4,-1,2,1]$$            | $$6$$    | $$6$$  |
| $$-5$$        | $$[4,-1,2,1,-5]$$         | $$1$$    | $$6$$  |
| $$4$$         | $$[4,-1,2,1,-5,4]$$       | $$5$$    | $$6$$  |

This is Kadane's algorithm:

```python
ending = best = float("-inf")

for v in values:
    ending = max(v, ending + v)
    best = max(best, ending)
```

Before moving on, notice why we need both variables. After reading the last
$$4$$, the best subarray ending there is worth only $$5$$, while the best
subarray anywhere is still the earlier one worth $$6$$.

## The crossing problem

Now we want to see how to turn Kadane's algorithm into (tropical) matrix multiplication.
To see how we might derive this, let's first think of the consequences of such a transformation.
Due to the associativity of matrix multiplication, it immediately gives a divide and conquer
algorithm for maximum subarray sum: we can multiply the matrices on the left half,
multiply the matrices on the right half, and finally take the product of these two results.

So, what is a divide and conquer algorithm for maximum subarray sum? The maximum subarray
is either completely contained in the left half, completely contained in the right half,
or crosses the middle. The first two cases are recursive calls to maximum subarray sum; what
we need to think about is the crossing case.

What is the maximum subarray sum that includes $$\mathtt{a}[i]$$ and $$\mathtt{a}[i+1]$$?
Well, this is the maximum subarray sum that _ends_ at $$\mathtt{a}[i]$$ plus the maximum
subarray sum that _begins_ at $$\mathtt{a}[i+1]$$. The `ending` value is our usual
dynamic programming subproblem. The `beginning` value is new information that is also
needed by a divide and conquer algorithm.

Let's see how we update `ending` when we combine two blocks. The new ending is either
the original ending of the right block, or it is the ending of the left block, plus
the sum of the whole right block. Hence there is another value that we will need, `total`,
the entire sum of a block. Now we have to keep 4 variables:

1. `best` - the maximum subarray sum seen so far.
2. `beginning` - the maximum subarray sum starting from the first element.
3. `ending` - the maximum subarray sum ending with the last element.
4. `total` - the sum of the array.

Let's look at the update of these 4 quantities.

## Four quantities, four updates

Suppose we have already computed the four quantities for a left block $$L$$ and
for the right block $$R$$ that follows it. Each of the four can be rebuilt for
the combined block:

$$
\begin{aligned}
\texttt{total}
  &=L.\texttt{total}+R.\texttt{total},\\
\texttt{beginning}
  &=\max\bigl(L.\texttt{beginning},\ L.\texttt{total}+R.\texttt{beginning}\bigr),\\
\texttt{ending}
  &=\max\bigl(R.\texttt{ending},\ L.\texttt{ending}+R.\texttt{total}\bigr),\\
\texttt{best}
  &=\max\bigl(L.\texttt{best},\ L.\texttt{ending}+R.\texttt{beginning},\ R.\texttt{best}\bigr).
\end{aligned}
$$

Each line is a one-sentence case analysis.

- `total`: sums just add.
- `beginning`: a subarray starting at the first element of the combined block
  either stops while still inside $$L$$ — the best such is
  $$L.\texttt{beginning}$$ — or it swallows all of $$L$$ and continues into
  $$R$$, earning $$L.\texttt{total}$$ plus the best beginning of $$R$$.
- `ending`: the mirror image, and the update we derived above.
- `best`: the winning subarray has three places to live — wholly inside
  $$L$$, wholly inside $$R$$, or crossing the seam. The crossing case is
  exactly the problem we just solved: $$L.\texttt{ending}+R.\texttt{beginning}$$.

The recursion bottoms out at a single element $$[v]$$, where all four
quantities equal $$v$$: the only nonempty subarray of $$[v]$$ is $$[v]$$
itself.

These four rules already form a complete divide-and-conquer algorithm: split
the array in half, recurse on each side, combine in constant time. The two
halves never look at each other, so they can be processed in parallel.

## A block and a subarray

Now let's see how the four quantities can be packaged into a matrix.

For this, let's fix a block of the input, say from index $$\ell$$ to index $$r$$.
We want to summarize how this block interacts with the (unknown) optimal
subarray $$[i,j]$$ realizing the maximum subarray sum. The block and the
optimal subarray are both contiguous sections of the array, so their whole
interaction is determined by where the block's two endpoints fall relative to
the subarray: $$\ell$$ is either **before** it ($$\ell < i$$), **inside** it
($$i \le \ell \le j$$), or **after** it ($$j < \ell$$), and similarly for
$$r$$. That gives nine cases, of which four are interesting.

1. $$\ell < i$$ and $$i \le r \le j$$: the subarray starts inside the block
   and runs at least to the block's last element. The overlap is $$[i, r]$$, a
   run ending at the block's last element, so the important information from the
   block is `ending`.
2. $$\ell < i$$ and $$j < r$$: the subarray lies wholly inside the block, so
   the important information is `best`.
3. $$i \le \ell$$ and $$r \le j$$: both endpoints of the block sit inside the subarray, so
   the subarray contains the whole block. The block contributes `total`.
4. $$i \le \ell \le j$$ and $$j < r$$: the subarray enters from the left and
   stops inside the block. The overlap is $$[\ell, j]$$, a run starting at the
   block's first element. The important information is `beginning`.

The remaining five cases carry no information. A block lying entirely before
the subarray ($$r < i$$) or entirely after it ($$j < \ell$$) contributes
$$0$$. The other three cases would force $$r < \ell$$ — a backwards block —
so they are impossible, and we assign them $$-\infty$$, which can never win
a maximum.

Arranging the nine cases in a matrix, with rows for $$\ell$$ and columns for
$$r$$:

| $$\ell$$ \ $$r$$                  | **before** ($$r < i$$) | **inside** ($$i \le r \le j$$) | **after** ($$j < r$$) |
| --------------------------------- | ---------------------- | ------------------------------ | --------------------- |
| **before** ($$\ell < i$$)         | $$0$$                  | `ending`                       | `best`                |
| **inside** ($$i \le \ell \le j$$) | $$-\infty$$            | `total`                        | `beginning`           |
| **after** ($$j < \ell$$)          | $$-\infty$$            | $$-\infty$$                    | $$0$$                 |

so that

$$
M_B=
\begin{pmatrix}
0 & \texttt{ending} & \texttt{best}\\
-\infty & \texttt{total} & \texttt{beginning}\\
-\infty & -\infty & 0
\end{pmatrix}.
$$

Note that we don't need to actually know the position of the optimal
subarray: the block reports its best offer for every case anyway.

## Why gluing is matrix multiplication

Look again at the shape of the four combine rules. Every rule is a maximum
over candidates, and every candidate is one number from $$L$$ plus one number
from $$R$$. There is a classical operation with exactly this shape — an entry
of a tropical matrix product,

$$
(M_L\otimes M_R)[p][q]=\max_k\bigl(M_L[p][k]+M_R[k][q]\bigr).
$$

For the product to make sense, the inner index $$k$$ has to mean the same
thing as a column of $$M_L$$ and as a row of $$M_R$$. And it does: a column of
$$M_L$$ asks where $$L$$'s right endpoint falls relative to the subarray, a
row of $$M_R$$ asks the same about $$R$$'s left endpoint, and these are the
two sides of one seam. Both indices report how the subarray stands at the
seam: it has not reached the seam yet ($$k=0$$, before), it spans the seam
($$k=1$$, inside), or it is already over ($$k=2$$, after).

Multiply two matrices of the shape $$M_B$$ and read off the entries, dropping
any candidate paired with a $$-\infty$$:

$$
\begin{aligned}
(M_L\otimes M_R)[0][1]
  &=\max\bigl(0+R.\texttt{ending},\ L.\texttt{ending}+R.\texttt{total}\bigr),\\
(M_L\otimes M_R)[1][1]
  &=L.\texttt{total}+R.\texttt{total},\\
(M_L\otimes M_R)[1][2]
  &=\max\bigl(L.\texttt{total}+R.\texttt{beginning},\ L.\texttt{beginning}+0\bigr),\\
(M_L\otimes M_R)[0][2]
  &=\max\bigl(0+R.\texttt{best},\ L.\texttt{ending}+R.\texttt{beginning},\ L.\texttt{best}+0\bigr).
\end{aligned}
$$

These are precisely the four update rules, landing in the same four positions,
while the constant $$0$$ and $$-\infty$$ entries reproduce themselves.
Matrices of this shape are closed under $$\otimes$$, and multiplying two
summaries _is_ the combine rule — with every candidate telling a consistent
story at the seam.

A single element $$[v]$$ has all four quantities equal to $$v$$, so its matrix
is

$$
T_v=
\begin{pmatrix}
0 & v & v\\
-\infty & v & v\\
-\infty & -\infty & 0
\end{pmatrix},
$$

and the summary of the whole array is the product

$$
T_{-2}\otimes T_1\otimes T_{-3}\otimes\cdots\otimes T_4,
$$

with the answer to the problem sitting in its top-right corner.

Evaluate that product left to right, one $$T_v$$ at a time, and the top row of
the running matrix is always

$$
(0,\ \texttt{ending so far},\ \texttt{best so far}).
$$

Kadane's two variables were the top row of a matrix product all along.

## Worked split

Split the running example after the first $$4$$:

$$
L=[-2,1,-3,4],
\qquad
R=[-1,2,1,-5,4].
$$

Their summaries are

$$
M_L=
\begin{pmatrix}
0 & 4 & 4\\
-\infty & 0 & 0\\
-\infty & -\infty & 0
\end{pmatrix},
\qquad
M_R=
\begin{pmatrix}
0 & 4 & 4\\
-\infty & 1 & 2\\
-\infty & -\infty & 0
\end{pmatrix}.
$$

For $$L$$, the `ending` and `best` subarrays are both the final $$[4]$$, worth
$$4$$. Its `total` is $$0$$, and its best `beginning` is the whole block, also
worth $$0$$.

For $$R$$:

- the `total` is $$1$$;
- the best `beginning` is $$[-1,2,1]$$, worth $$2$$;
- the best `ending` is the final $$[4]$$, worth $$4$$;
- the `best` subarray is also $$[4]$$, worth $$4$$.

The best subarray of the combined block is

$$
\max\bigl(
L.\texttt{best},\
L.\texttt{ending}+R.\texttt{beginning},\
R.\texttt{best}
\bigr)
=\max(4,\ 4+2,\ 4)
=6.
$$

The crossing case wins. It glues $$L$$'s ending subarray $$[4]$$ to $$R$$'s
beginning subarray $$[-1,2,1]$$, recovering $$[4,-1,2,1]$$.

## In Python

```python
from functools import reduce

NEG = float("-inf")

def single(v):                       # the four quantities for the block [v]
    return {"best": v, "beginning": v, "ending": v, "total": v}

def combine(L, R):                   # the four update rules
    return {
        "total":     L["total"] + R["total"],
        "beginning": max(L["beginning"], L["total"] + R["beginning"]),
        "ending":    max(R["ending"], L["ending"] + R["total"]),
        "best":      max(L["best"], L["ending"] + R["beginning"], R["best"]),
    }

def matmul(A, B):                    # matrix product, tropical arithmetic
    n = len(A)
    return [[max(A[i][k] + B[k][j] for k in range(n))
             for j in range(n)] for i in range(n)]

def element(v):                      # the same four numbers, shelved as a matrix
    return [[0,   v,   v],
            [NEG, v,   v],
            [NEG, NEG, 0]]

def kadane(values):
    ending = best = NEG
    for v in values:
        ending = max(v, ending + v)
        best = max(best, ending)
    return best

values = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

fields = reduce(combine, map(single, values))
matrix = reduce(matmul, map(element, values))

assert matrix == [[0,   fields["ending"], fields["best"]],
                  [NEG, fields["total"],  fields["beginning"]],
                  [NEG, NEG,              0]]
assert fields["best"] == matrix[0][2] == kadane(values) == 6
print(matrix[0][2])
```

The first `assert` is the whole card in one line: the hand-derived four-field
combine and the tropical matrix product build identical summaries.

This version requires a nonempty subarray, just like LeetCode 53. If an empty
subarray is allowed, floor the answer at zero: `max(0, matrix[0][2])`.

## What to remember

Thinking about a divide and conquer algorithm led us to the four quantities.
From there, the possible interactions of two intervals led to packaging
these four quantities into a matrix. Note that there are several ways
to do this, so one does need to be careful to choose a way such that
matrix multiplication is meaningful (indexing by where the _subarray's_
endpoints fall relative to the block, for example, does not support gluing:
a column of $$M_L$$ and a row of $$M_R$$ would then assert facts about
different things).

Associativity of matrix multiplication has all the benefits it did for
[house robber]({{ '/stories/tropical-tour/house-robber/' | relative_url }}).
Evaluated left to right, the top row of the running product is Kadane's pair
(`ending`, `best`). Evaluated as a balanced tree, the halves run in parallel.
Stopped anywhere in between, the partial products are reusable block
summaries.

{% comment %}
Restore when the wall-street stop is published:

The [next stop]({{ '/stories/tropical-tour/wall-street/' | relative_url }})
keeps the same three states — before, inside, after — but moves the gains:
instead of earning each value while
we are inside an interval, buying pays at the entrance and selling pays at the
exit. The two accounts will turn out to describe the same choice.
{% endcomment %}

## Further reading

My interest in this whole circle of ideas began with Troels Henriksen's note
[List Homomorphisms and Parallelism](https://sigkill.dk/writings/par/lhomo.html),
which uses maximum subarray sum as the motivating example. I highly recommend
reading it.

{% include tropical-tour-nav.liquid %}

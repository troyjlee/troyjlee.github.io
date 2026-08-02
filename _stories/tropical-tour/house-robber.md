---
layout: page
title: House Robber As Matrix Multiplication
description: Follow the familiar two-state sweep step by step, then watch its choices become a 2×2 tropical matrix.
series: tropical-tour
subpage: true
order: 1
---

## The problem

> Houses sit in a row, house $$i$$ holding value $$v_i$$. Rob houses to maximize total loot, but never two adjacent houses. ([LeetCode 198](https://leetcode.com/problems/house-robber/))

We will use example 2 from Leetcode:

$$
[2,7,9,3,1].
$$

The best plan robs houses worth $$2,9,1$$, for a total of $$12$$. Let us first
recall the usual dynamic programming approach to house robber.

## Subproblem definition

Let $$\mathtt{dp}[i]$$ be the most loot that can be robbed from houses
$$0,\ldots,i$$.

Call the array of house values $$\mathtt{a}$$. Set

$$
\mathtt{dp}[-1]=0,\qquad \mathtt{dp}[0]=a[0].
$$

For $$i\geq 1$$, the update rule is

$$
\mathtt{dp}[i]
=\max\bigl(\mathtt{dp}[i-1],\ \mathtt{dp}[i-2]+a[i]\bigr).
$$

There are two cases. If we skip house $$i$$, the most loot we can make is
$$\mathtt{dp}[i-1]$$. If we rob it, we must skip house $$i-1$$, leaving the best
answer through house $$i-2$$ plus the new loot $$a[i]$$.

Note that in the update, we do not need the full history of the
$$\mathtt{dp}$$ array, only the two previous values.

For the matrix view, it is helpful to write an equivalent two-state DP. As we
pass through the loot array, carry $$s$$, the most loot obtainable when we
_skip_ the previous house, and $$r$$, the most loot obtainable when we _rob_
the previous house.

When the current house has value $$v$$, the update becomes

$$
s'=\max(s,r),\qquad r'=s+v.
$$

Both right-hand sides use the old values $$s$$ and $$r$$. After computing them,
replace $$(s,r)$$ by $$(s',r')$$.

At the beginning of the algorithm, we initialise $$s = 0$$ and $$r = -\infty$$,
because it is impossible to rob the previous house when it does not exist.
An impossible plan should never win a maximum.

Here is an example run:

| after processing | last skipped $$s$$ | last robbed $$r$$ | best so far |
| ---------------- | ------------------ | ----------------- | ----------- |
| no houses        | $$0$$              | $$-\infty$$       | $$0$$       |
| $$2$$            | $$0$$              | $$2$$             | $$2$$       |
| $$2,7$$          | $$2$$              | $$7$$             | $$7$$       |
| $$2,7,9$$        | $$7$$              | $$11$$            | $$11$$      |
| $$2,7,9,3$$      | $$11$$             | $$10$$            | $$11$$      |
| $$2,7,9,3,1$$    | $$11$$             | $$12$$            | $$12$$      |

So far, nothing new: two numbers, one left-to-right pass. The rest of the card is
about repackaging this familiar update so that whole _blocks_ of houses can be
combined just as easily as single houses.

## The gain from one house

For one house worth $$v$$, write down every possible move from the old status to
the new status. The table entry is the loot gained at this house:

|                              | new status: skipped | new status: robbed |
| ---------------------------- | ------------------- | ------------------ |
| **previous status: skipped** | gain $$0$$          | gain $$v$$         |
| **previous status: robbed**  | gain $$0$$          | forbidden          |

Replace `forbidden` by $$-\infty$$, and the table is a matrix:

$$
T_v=
\begin{pmatrix}
0 & v\\
0 & -\infty
\end{pmatrix}.
$$

Rows describe the previous status; columns describe the new one. The matrix does not
contain the best totals so far. It contains only the _local gain_ for each allowed
move.

Suppose the old DP vector is $$(s,r)$$. To find the best value for each new
status, try both old statuses, add the corresponding gain, and keep the better
result:

$$
\begin{aligned}
s' &= \max(s+0,\ r+0)=\max(s,r),\\
r' &= \max(s+v,\ r+(-\infty))=s+v.
\end{aligned}
$$

That is exactly the DP update above. The matrix is just a compact way to
store its four possible moves.

## Where the tropical arithmetic enters

If we were to do an ordinary row-vector-times-matrix product
$$(s,r) T_v$$, the result is

$$
\begin{pmatrix}
s & r
\end{pmatrix}
\begin{pmatrix}
0 & v\\
0 & -\infty
\end{pmatrix}
= \begin{pmatrix}
s \cdot 0 + r \cdot 0 & s \cdot v + r \cdot -\infty
\end{pmatrix}
$$

This would be exactly what we want if the $$+$$ was replaced by $$\max$$, and
the $$\cdot$$ was replaced by addition!

This arithmetic — `max` playing the role of addition, and ordinary `+` playing
the role of multiplication — is called **max-plus** or **tropical arithmetic**.
Write its matrix product as $$\otimes$$. Then the two DP equations collapse to
one line:

$$
(s,r) \gets (s,r)\otimes T_v.
$$

Starting from the initial state $$(0,-\infty)$$, all the DP updates are
encoded in the tropical matrix product

$$
(0,-\infty)
\otimes T_2\otimes T_7\otimes T_9\otimes T_3\otimes T_1.
$$

Evaluating this product from left to right reproduces the six rows of the DP table
above. We have changed the notation, not the algorithm. The payoff comes next.

## A whole block becomes one matrix

Ordinary matrix multiplication is _associative_. This means
$$(AB)C=A(BC)$$: the factors must stay in the same order, but we can choose
which multiplication to do first. Tropical matrix multiplication is associative
as well. We may
therefore multiply the house matrices inside a block first:

$$
M=T_{v_\ell}\otimes T_{v_{\ell+1}}\otimes\cdots\otimes T_{v_{r-1}}.
$$

We will use $$0$$ and $$1$$ to label the first and second rows, respectively,
and the same for the columns. Thus $$0$$ represents skipped and $$1$$
represents robbed.
The $$2\times2$$ matrix $$M$$ is a summary of the block from $$\ell$$ to
$$\r-1$$. Its entry $$M[a][b]$$ means:

> the best loot earned _inside the block_, assuming the house immediately before
> the block has status $$a$$ and the block's last house has status $$b$$.

Take as an example the block $$[9,3,1]$$. Its summary is

$$
R=T_9 \otimes T_3 \otimes T_1
=
\begin{pmatrix}
9 & 10\\
3 & 1
\end{pmatrix}.
$$

We can understand all four entries without doing any matrix algebra:

- $$R[0][0]=9$$: the preceding house was skipped and this block must end skipped.
  Rob the $$9$$, then skip $$3$$ and $$1$$.
- $$R[0][1]=10$$: the preceding house was skipped and this block must end robbed.
  Rob $$9$$ and $$1$$.
- $$R[1][0]=3$$: the preceding house was robbed, so $$9$$ is unavailable; rob
  $$3$$ and end by skipping $$1$$.
- $$R[1][1]=1$$: again $$9$$ is unavailable, and ending robbed forces us to skip
  $$3$$ and rob $$1$$.

One house used four entries to list its legal moves. A whole block uses the same
four entries to list its best possible outcomes. The format has not changed, so a
block can be used wherever a single house could.

## Gluing two blocks at the seam

Now split the street:

$$
[2,7]\ \vert\ [9,3,1].
$$

The left block has summary

$$
L=T_2\otimes T_7
=
\begin{pmatrix}
2 & 7\\
0 & 7
\end{pmatrix},
$$

and the right block has the matrix $$R$$ above. To combine them, the two blocks
need to agree on exactly one fact: was the last house of the left block robbed?
Call that seam status $$c$$.

For fixed starting status $$a$$ and ending status $$b$$, try both possible seam
statuses, add the two blocks' loot, and take the better:

$$
(L\otimes R)[a][b]
=\max_{c\in\{0,1\}}\bigl(L[a][c]+R[c][b]\bigr).
$$

This is exactly tropical matrix multiplication.
The middle matrix index is not an algebraic trick; it is the status of the
house at the seam.

No house stands before the full street, so pretend there is an imaginary skipped
house there: start in row $$0$$. The two possible endings are

$$
\begin{aligned}
(L\otimes R)[0][0]
  &=\max(2+9,\ 7+3)=11,\\
(L\otimes R)[0][1]
  &=\max(2+10,\ 7+1)=12.
\end{aligned}
$$

Take the better ending: $$\max(11,12)=12$$. The winning second calculation uses
seam state $$c=0$$. On the left, rob $$2$$ and skip $$7$$; on the right, rob
$$9$$, skip $$3$$, and rob $$1$$. The two plans meet legally because the house at
the seam was skipped.

That is the entire idea: a matrix records what a segment can do for every possible
boundary status, and multiplication tries the possible status at the join.

## In Python

```python
NEG = float("-inf")

def matmul(A, B):                      # matrix product, tropical arithmetic
    return [[max(A[i][k] + B[k][j] for k in range(len(B)))
             for j in range(len(B[0]))] for i in range(len(A))]

def house(v):                          # one house, as a 2x2 matrix
    return [[0, v],                    # prev unrobbed: skip this one, or rob it
            [0, NEG]]                  # prev robbed:   skip, or... forbidden

def summary(values):
    M = [[0, NEG], [NEG, 0]]           # the empty street: identity matrix
    for v in values:
        M = matmul(M, house(v))
    return M

def rob(values):
    return max(summary(values)[0])     # row 0: no house stands before the first

left = summary([2, 7])
right = summary([9, 3, 1])
whole = summary([2, 7, 9, 3, 1])

assert left == [[2, 7], [0, 7]]
assert right == [[9, 10], [3, 1]]
assert whole == [[11, 12], [10, 10]]
assert whole == matmul(left, right)    # summarize pieces, then glue at the seam
print(rob([2, 7, 9, 3, 1]))            # 12
```

The identity matrix in `summary` is the empty street: it leaves the boundary
status unchanged and earns nothing. The last `assert` is the important one. We
summarized the pieces independently, multiplied their summaries, and recovered
the same matrix as the full left-to-right sweep.

## What to remember

The textbook DP solution has several nice properties: it makes a single pass
through the array performing the same update at each step. The
remarkable takeaway here is that that update can be represented as a
matrix-vector multiplication, so the whole
computation became a single tropical product:

$$
(0,-\infty)\otimes T_2\otimes T_7\otimes T_9\otimes T_3\otimes T_1.
$$

Tropical matrix multiplication is associative: the factors must stay in order,
but we may group them however we like. Different groupings allow different
algorithms.

- **Left to right** recovers the classical one-pass DP.
- **A balanced tree** — pair up adjacent matrices and multiply, then pair up the
  results — computes the product in $$O(\log n)$$ rounds, and the
  multiplications within a round are independent: an immediate parallel
  algorithm.
- **Any consecutive block** of houses can be multiplied first, and the result is
  a self-contained summary of that segment: one $$2\times2$$ matrix holding the
  best loot for every combination of boundary statuses, usable wherever a single
  house could stand. This will be useful to solve a dynamic version of house
  robber, where updates to the array are allowed.

And we never had to invent the summary or a clever rule for combining segments.
We only wrote down the ordinary DP's legal moves; associativity supplied the
rest for free.

The [next stop]({{ '/stories/tropical-tour/kadane/' | relative_url }}) repeats the
process for maximum subarray sum. Its state space has three states rather than
two, and its matrix entries turn out to be the textbook's famous four-field
summary: `best`, `beginning`, `ending`, and `total`. Later stops will keep
these matrices in a segment tree and raise them to enormous powers.
{% comment %} Link the segment tree mention when that stop is published. {% endcomment %}

{% include tropical-tour-nav.liquid %}

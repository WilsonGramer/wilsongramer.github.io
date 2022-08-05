---
layout: post
title: Computed values in Wipple
description: Let's say I wanted to create a random number generator in Wipple...
---

Let's say I wanted to create a random number generator in Wipple. It's easy to do with a function:

```wipple
random-between :: Number -> Number -> Number
random-between : start -> end -> ...
```

But what about a function returning a random number between 0 and 1, for convenience?

```wipple
random :: Number
random : random-between 0 1

a : random
b : random
```

Wait, this is just a regular value — there are no parameters, and it will only be evaluated once (`a = b`)! What we need is a way to have computed values (ie. "getters").

Some languages solve this problem by using a function that simply ignores its parameter:

```wipple
random :: . -> Number
random : _ -> random-between 0 1

a : random .
b : random .
```

Even though `a /= b` here, this just doesn't feel right to me. Instead, we can introduce a new construct that delays the evaluation of its input at runtime:

```wipple
random :: Do Number
random : do (random-between 0 1)

a : do! random
b : do! random

a = b -- False
```

`do` creates a `Do` value, and `do!` evaluates it! Because computed values are impure pretty much by design, the exclamation point in `do!` also serves as a reminder of this. By convention, other Wipple functions that are nondeterministic or modify visible state should also end in an exclamation point.

I don't know much about effects, but perhaps this idea can be extended to support them in the future.

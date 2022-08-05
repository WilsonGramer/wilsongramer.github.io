---
layout: post
title: Traits in Wipple are implemented!
description: After months of work, I've finally implemented the Wipple trait system! In this post, I want to explain how to use traits in Wipple programs.
---

After months of work, I've finally implemented the Wipple trait system! In this post, I want to explain how to use traits in Wipple programs.

In the same way that a type represents a relationship between unique values (`1 :: Number`, `2 :: Number`, `3 :: Number`, etc.), a trait represents a relationship between unique types. Let's say we have a function called `show` that displays its input on the screen. Ideally, we would be able to provide a value of any type to `show`, as long as the value is "showable". We can express this idea using `where`:

```wipple
show :: A where (Show A) => A -> ()
```

What is `Show`? That's our trait! Let's define it:

```wipple
Show : A => trait (A -> Text)
```

This piece of code means "for any type `A`, to `Show` an `A` means to implement a function that, given a value of type `A`, produces a `Text`".

Now let's do just that — implement the function for our various types!

```wipple
instance Show Text : it -- text is already text


Foo : type

instance Show Foo : just "foo"


Person : type {
    name :: Text
}

instance Show Person : { name } -> format "A person named _" name
```

And now we can call `show` with values of these types:

```wipple
show "Hello, world!" -- Hello, world!
show Foo -- foo
show (Person { name : "Bob" }) -- A person named Bob
```

All in all, I'm very proud of how this turned out! The Wipple typechecker has been one of the most complex pieces of software I've ever written, and I'm glad to be able to finally turn my attention to other parts of the language. Next up is pattern matching and templates/operators — I'll come back to higher-kinded types someday if they prove necessary. Until next time!

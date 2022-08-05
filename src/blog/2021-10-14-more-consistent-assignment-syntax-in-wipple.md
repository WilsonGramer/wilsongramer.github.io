---
layout: post
title: More consistent assignment syntax in Wipple
description: I've been trying to simplify and consolidate many different Wipple features. Last time was function syntax, this time is assignment syntax!
---

I've been trying to simplify and consolidate many different Wipple features. Last time was function syntax, this time is assignment syntax!

What is there to consolidate? Well, variable assignment (`a : b`) is actually fine and I plan to make no changes there. Instead, I am standardizing the syntax for various other declarations so that they all use the `:` operator!

## Variable assignment

First, just a recap on variable assignment, which introduces a new name into the current scope:

```wipple
x : 42

Person : data {
    name :: Text
    age :: Number
}

-- etc.
```

## Conversions

Formerly called "relations" and before that "conformances", I decided to rename this declaration yet again to describe what is actually going on. In Wipple, values can be converted between each other implicitly, simulating interfaces in other languages. For example, we can convert a `Person` value into a `Text` value used by `show`:

```wipple
(p :: Person) is Text : format "_ is _ years old" (p name) (p age)
```

Thanks to Wipple's new static type system, we can also express conversions on the type level, similar to Haskell's typeclasses:

```wipple
Person is Equal : p1 -> p2 -> p1 name = p2 name
Person is Order : p1 -> p2 -> p1 age < p2 age
```

## Type functions

Thanks to this streamlined syntax, conversions can now be parameterized using type functions. (I [wrote about this](/blog/2020-03-24-generic-extensions) a while ago!) This lets us define abstract relationships between two traits:

```wipple
Equal : for T -> trait (T -> T -> Boolean)

Ordering : enum Less-Than Greater-Than Equal
Order : for T -> trait (T -> T -> Ordering)

-- All orderable values are automatically equatable
for T (order : T is Order) -> T is Equal :
  a -> b -> when? (order a b) (Ordering Equal)
```

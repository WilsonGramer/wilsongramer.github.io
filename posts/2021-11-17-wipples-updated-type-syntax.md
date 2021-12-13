---
title: Wipple's updated type syntax
description: In my spree to streamline different parts of Wipple, I've decided to update the type syntax to be more flexible and consistent. Here's how it works!
---

In my spree to streamline different parts of Wipple, I've decided to update the type syntax to be more flexible and consistent. Here's how it works!

The first change is that all values can be used in type position now. The type of the value is used, sort of like an implicit `typeof` operator. For example:

```wipple
x : 42
f : n :: x -> n
```

Here, `n` has type `Number`. Note that this paves the way for constants as types (eg. `x :: 42`)!

The second change is that `data` and `enum` no longer return types! Instead, they return "forms" that expand to a value or type depending on where they are used. I already use the form pattern throughout the Wipple compiler, so this is an easy change to make. To the user, this means that `data` and `enum` effectively return "constructor" values that can be used in type position or value position.

```wipple
Integer : data ...

x : Integer 42 -- as a value
f : n :: Integer -> n -- as a type
```

The third change is that `for` now accepts a `where` clause that checks for the existence of traits:

```wipple
show :: for A where (Show A) -> A -> Text
```

This is much better than the previous `Show :: A -> _` syntax, and puts Wipple more in line with Haskell!

In addition, pattern syntax has been extended to support datatypes and traits:

```wipple
Single : data Number

Fields : data {
  foo :: Number
  bar :: Text
}

Trait : for A -> trait A -> A


Single n : Single 42

Fields { foo bar } : Fields {
  foo : 42
  bar : "hello"
}

Trait Number : n -> n
```

Notice that datatypes take their variables, while traits take their type parameters.

The final change is that `for` may only be applied once per expression (ie. it may not be nested), and that type parameters in traits must be filled explicitly as done above. This makes it easier to typecheck things, and shouldn't really even be noticeable.

Stay tuned for more updates!

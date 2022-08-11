---
layout: post
title: Derived instances in Wipple
description: One feature that a lot of languages have is the ability to automatically derive behavior for a structure or enumeration...
---

One feature that a lot of languages have is the ability to automatically derive behavior for a structure or enumeration. Haskell has `deriving`, Rust has the `derive` attribute, and Swift supports automatic conformances to protocols like `Equatable` and `Codable`. I'd like to add similar functionality to Wipple, and I think I've figured out how!

Instead of requiring a special attribute or new keyword, you simply declare an instance of the desired trait, without providing a value on the right-hand side. For example:

```wipple
Person : type {
    name :: Text
    age :: Number
}

instance Equal Person
```

How does Wipple know that the trait can be derived? My original goal was to support derived instances using something like Rust's procedural macros, but in practicality, almost all derived traits simply combine each of the members of the type in some way, like this:

```wipple
reduce :: State A => State -> A -> State
```

To tell Wipple that a trait can be derived, you use the `derivable` attribute like so:

```wipple
[derivable derive-equal True]
Equal : A => trait ((A , A) -> Boolean)
```

And then implement your derive function:

```wipple
derive-equal :: A where (Equal A) => Boolean -> (A , A) -> Boolean
derive-equal : equal? -> (left , right) -> equal? and (left = right)
```

The value the derived instance will then be generated as follows:

```wipple
instance Equal Person : (left , right) -> {
    state : True

    { name : left-name } : left
    { name : right-name } : right
    state : derive-equal state (left-name , right-name)

    { age : left-age } : left
    { age : right-age } : right
    state : derive-equal state (left-age , right-age)

    state
}
```

In general, here are the rules for derivable instances:

-   The trait must have one parameter (the implementing type) and its value must be a function accepting that type (or a homogenous tuple of that type) and returning the final state.
-   The first parameter to `derivable` must be the reducer function, and the second must be the initial state.
-   When deriving the trait on a structure type, each member is provided to the reducer function in sequence.
-   When deriving the trait on an enumeration type, the discriminant is provided to the reducer function first, followed by any associated values.
-   When deriving the trait on a unit type, the initial state is used unmodified.

In addition to `derivable`, Wipple will also offer the `structural` attribute for traits that should be derived in the reverse way — instead of reducing all members of the type into a single value, the trait is applied to all the members of the type:

```wipple
[structural]
Default : A => trait A

instance Default Person

-- Expands to:
instance Default Person : Person {
    name : Default
    age : Default
}
```

`structural` is only applied to instances on structure and unit types. Here are the rules:

-   The trait must have one parameter (the implementing type).
-   When deriving the trait on a structure type, each member is initialized to the relevant instance of the trait.
-   When deriving the trait on a unit type, the value of the instance is equivalent to an instance of the type. For example, `instance Default Foo` where `Foo : type` expands to `instance Default Foo : Foo`.

Note that the trait may expand to a value of any type. For example, you could have something like this:

```wipple
[structural]
Computed : A => trait (() -> A)

instance Computed Number : () -> 42
instance Computed Text : () -> "Hello"
instance Computed Boolean : () -> True

Foo : type {
    a :: () -> Number
    b :: () -> Text
    c :: () -> Boolean
}

instance Computed Foo
```

All in all, `derivable` and `structural` will greatly reduce boilerplate in Wipple, and I think using the existing `instance` syntax is the most natural way to do it. I'm looking forward to implementing these two attributes in the Wipple compiler!

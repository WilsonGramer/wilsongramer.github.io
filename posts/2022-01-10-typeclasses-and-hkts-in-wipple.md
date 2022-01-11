---
title: Typeclasses and higher-kinded types in Wipple
description: Typeclasses are a powerful construct used in functional programming languages like Haskell...
---

Typeclasses are a powerful construct used in functional programming languages like Haskell. Essentially, they allow you to overload functions so that they can operate on different types. Let's take a look at Wipple's `show` function:

```wipple
show :: Show A => A -> ()
```

This means that `show` accepts any value where `Show` is defined for the value's type. Well what is `Show`? It's a **trait**, Wipple's name for typeclasses. To create a trait, just provide a type definition:

```wipple
A => Show A :: A -> Text
```

> Note: This syntax is lightweight but ambiguous in some edge cases. If you want to add a type annotation on a value like `f x :: A`, you should wrap the value in parentheses: `(f x) :: A`.

In Wipple, a trait is a construct whose value depends on its type. We can provide multiple definitions for `Show` to define it for various types!

```wipple
Show Text : it
Show Number : n -> ...
Show Boolean : b -> if b "True" "False"
```

Another good example of traits in action is the `Equal` trait, which can be defined to support equality on types:

```wipple
A => Equal A :: A -> A -> Boolean

[operator 5] = : Equal  -- = :: Equal A => A -> A -> Boolean
```

Now let's take a look at the `|` (map) operator. What do you think its type is?

```wipple
[operator 7] | : functor -> f -> Functor f functor
```

First, what's a functor??? Without getting too technical, a functor is basically a container that supports the map operation on its contents. For example, we can use `|` with `List`s, `Maybe`s, and `Result`s:

```wipple
'(1 2 3) | increment = '(2 3 4)

Some 1 | increment = Some 2
None | increment = None

Success 1 | increment = Success 2
Error "oh no" | increment = Error "oh no"
```

So, the job of the `|` operator is to take a container holding some value(s) `A`, and apply a function `A -> B` to the value(s) so that we end up with the same container holding the new value(s) `B`. To express this in the type system, we need a new feature — higher-kinded types! It looks like this:

```wipple
(F _) => Functor F :: A => B => (A -> B) -> F A -> F B
```

Notice that instead of providing a type variable like `A`, we provide a "type function" `F` that takes an input `_`. We can then provide the input `A` to build a container `F A`, and so on. For example, we can define `Functor` for `Maybe A`, for any `A`:

```wipple
A => Functor (Maybe A) : f -> x? -> when x? {
    Some x -> Some (f x)
    None -> None
}
```

Thus, the type of `|` is:

```wipple
| :: Functor (F _) => A => B => F A -> (A -> B) -> F B
```

For now, only traits with a single parameter are supported. (This restriction is also present in vanilla Haskell because it causes ambiguity.) But that shouldn't prevent very many use cases!

### The new type function syntax

You may have noticed that I reworked the syntax for what used to be `for` functions. In the new syntax, you declare a single type variable with an optional set of traits for which the type is defined. This syntax is a little more concise while still making clear the difference between implicit and explicit type checking.

```wipple
A => ...  -- introduce type variable A
Show A => ...  -- introduce type variable A where Show A is defined
(Show Equal) A => ...  -- introduce type variable A where Show A and Equal A are defined
(F _) => ...  -- introduce higher-kinded type F
Functor (F _) => ... -- introduce higher-kinded type F where Functor (F _) is defined
```

### Conclusion

All in all, I'm really excited to start working on implementing this in the Wipple compiler. Once I have a working, type safe `|` operator, I can start work on pattern matching and then the standard library!

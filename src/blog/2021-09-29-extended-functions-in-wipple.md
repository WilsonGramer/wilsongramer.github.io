---
layout: post
title: Extended functions in Wipple
---

I can't believe it's been over a year since I started working on the Wipple interpreter! I'm still going after my original goal of learning how programming languages work, and as my understanding has increased, so have my ambitions. I want to build the "perfect" programming language that's both natural to learn and extremely powerful and flexible.

Over the past few months, I've been thinking about building a compiler for Wipple — this has a lot of advantages, including the ability to run Wipple code on embedded devices like robots (I plan to use Wipple on my robotics team this year), and full static analysis and typechecking. The Wipple interpreter manages a full graph between traits and relations at runtime, and traverses it on every evaluation. By doing this analysis before the program runs, Wipple code will run faster and be easier to reason about.

I've also been thinking about how to implement a better type system in a way that feels natural to Wipple, and after much experimentation, I've come up with a solution that utilizes function syntax in a streamlined way for many aspects of the language. Let's take a look!

## Functions and values

Let's build a simple Wipple program to start:

```wipple
a : 1
b : 2
sum : a + b
```

This code should be pretty easy to understand; we define `a` and `b` as numbers and take their `sum`. How does this happen? At runtime, `a + b` is computed (ie. an `ADD` instruction is sent to the CPU) and the result is stored. This kind of evaluation occurs implicitly — by simply writing the expression in code, addition is performed.

Now what about functions? Let's refactor the above example to use one:

```wipple
add : a -> b -> a + b
sum : add 1 2
```

Now, the addition is parameterized: it takes place on two unknown inputs. This makes our program more general and enables it to work for *any* `a` and `b`. We can call `add 1 2` like in the example, or `add 10 20`, or `add`  any other numbers.

Let's extend this concept to another part of the language!

## Functions and types

Wipple has always been a strongly-typed programming language — with a compiler, the only difference is that typechecking occurs before the program runs. Every value has a type, which we can express using `::`:

```wipple
42 :: Number
"hello" :: Text
2 + 2 = 4 :: Boolean
show "hello" :: .
```

Just like the *value* of an expression is determined implicitly, so is the *type* of an expression. Now let's write a more general example:

```wipple
two : x -> '(x x)
```

This function duplicates its input, returning a pair. If we call `two 42`, we get `(42 42)`; if we call `two "hi"`, we get `("hi" "hi")`, and so on. It's easy to determine the type of the result, but what's the type of the input? Just like a function's *value* depends on its input, so can we make a function's *type*. This idea is called "parametric polymorphism" (aka. generics), and we can use it to define *type functions*!

```wipple
Two : for A -> '(A A)
```

This definition looks very similar to our regular function definition, but to indicate that the input is a type and not a value, we add the `for` prefix. By convention, types are capitalized. Let's try calling our type function:

```wipple
Two Number
```

This is equivalent to writing `Number -> '(Number Number)`, just like `add 1 2` from the previous section is equivalent to writing `1 + 2`. Now let's try calling `two` with different inputs and see how its type changes:

```wipple
two :: Two

two 42 -- two :: Two Number
two "hi" -- two :: Two Text
```

Great! The compiler takes care of calling our type function based on the type of the input value. Of course, you could still add manual type annotations if you wish:

```wipple
(two :: Two Number) 42
(two :: Two Text) 42 -- error: expected Text, found Number
```

Let's extend this concept one more time.

## Functions and expressions

Wipple is inspired by Lisp, and while its syntax looks much different, fundamentally everything is still an expression. Just like Lisp, you can quote expressions to use them as values:

```wipple
(1 2 3) -- error: 1 is not a function
'(1 2 3) :: List Number
```

But unlike Lisp, the new compiled version of Wipple will use quasiquoting by default, and evaluate each item in a quoted list. That is, the following code is valid:

```wipple
a : 1
b : 2
c : 3

'(a b c) = '(1 2 3) -- True
```

This "filling-in" of inner expressions is shallow, so you can also evaluate complex expressions inside quotes:

```wipple
'((1 + 2) (10 + 20) (100 + 200)) = '(3 30 300) -- True
```

Notice a pattern? Just like evaluation and type inference, the filling-in of quoted expressions is implicit — it occurs automatically whenever you use a `'`. In the Wipple interpreter, parameterized filling is possible with a special template syntax. In the new, compiled Wipple, we can use a *fill function*!

```wipple
rev : fill a b -> '(b a)
```

Calling a fill function doesn't immediately result in evaluation; instead, the unevaluated expressions are passed in as input, and then the filled-in expression is evaluated in place of the call. For example, the following code is valid:

```wipple
assign : fill name value -> '(name : value)

assign num 42
num = 42 -- True
```

## Conclusion

I'm really proud of this extended function syntax. In the future, I hope to extend it even more to support things like [context](https://dotty.epfl.ch/docs/reference/contextual/using-clauses.html) and other cool features! I've been working less on programming lately and more on adapting Wipple's design to better support static analysis, but I hope to start making some real progress again very soon. Be sure to check out the [Wipple Playground](https://playground.wipple.gramer.dev) in the meantime — eventually I plan to migrate it over to [Replit](https://replit.com) and take advantage of their recently-added custom language support!

Thanks for reading, and I look forward to sharing more updates soon.
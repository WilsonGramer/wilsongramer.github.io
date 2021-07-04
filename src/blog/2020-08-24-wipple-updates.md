---
layout: post
title: Wipple updates
---

I haven't pushed to the [wipplelang/wipple](https://github.com/wipplelang/wipple) repository lately, but I am experimenting around with some new ideas privately. I've been working on some quality-of-life improvements to Wipple — check them out!

1. Statements are now separated with a newline instead of a semicolon. Statement breaks will occur when all preceding statement items are parsed (ie. no open groups) and a newline is encountered:

    ```wipple
    foo -- one statement
    bar -- another statement

    (foo
      bar
      baz
    ) -- one statement
    ```

    The last statement in a block is still the one returned, and empty blocks still evaluate to the empty list.

2. Statements are now just lists — there is no distinct type. The semantics for lists are altered so a single-item list is evaluated as if that item was not in a list:

    ```wipple
    (foo bar) -- call 'foo' with 'bar'
    (foo bar baz) -- call 'foo' with 'bar', and the result with 'baz'
    (foo) -- evaluate 'foo'
    () -- return as-is
    ```

3. Lists with operators are now parsed so they consume all values on both sides until an operator of a higher precedence is reached. This removes the need for explicit lists in many places:

    ```
    bob : person (| age 42 |)
    ```

    In previous versions of Wipple extra parentheses would be required:

    ```wipple
    bob : (person (| age 42 |))
    ```

    Note that if the operator's function evaluates the parameter before returning, and the left-hand- and/or right-hand-side of the operator contains only one value, the single value will be used congruent to the changes in list evaluation above.

4. If an operator is evaluated on its own, the function the operator wraps is returned instead of the operator itself (which is unusable alone):

    ```wipple
    > +
    function -- the 'add' function
    ```

    In previous versions of Wipple:

    ```wipple
    > +
    operator -- the '+' operator
    ```

5. Added `pairlist`, a primitive that groups pairs of values. Pair lists are almost always used with another function, like `struct` or keyed functions. The syntax is `(| a b c d |)`, which will create a pair list with two pairs, `'a b` and `'c d` (ie. the first item in the pair is left unevaluated and the second item is evaluated).

    For example, pair lists are used by `struct`s to associate values with property names:

    ```wipple
    person : struct (|
       name           "Bob"
       age            42
       favorite-color 'blue
    |)
    ```

    In order to evaluate the first pair item as well, you can pass the pair list to the `dynamic` package's `eval-pairlist-keys!`:

    ```wipple
    > a : 1
    ()

    > b : 2
    ()

    > c : 3
    ()

    > d : 4
    ()

    > (| a b c d |)
    pairlist

    > list (| a b c d |) -- need to convert to list to view in wipple
    ((a 1) (c 4))

    > use dynamic
    ()

    > (| a b c d |) |> eval-pairlist-keys! |> list
    ((1 2) (3 4))
    ```

6. Dot syntax has been removed at the parser level; it is now an operator:

    ```
    foo . bar -- access the 'bar' property on the value of 'foo'
    ```

    Because dot syntax was the only thing requiring the `Property` trait from being built-in, this trait is now implemented in the `property` package (which the `struct` package uses as a dependency). The `Property` trait looks like this:

    ```wipple
    Property : trait (name -> value ->
      (Data (|
         name name
         value value
      |))
    )
    ```

    And the `.` operator is defined like this:

    ```wipple
    dot-precedence : 100

    . : operator (|
       precedence    dot-precedence
       associativity left
       call          (base => 'prop => ...)
    |)
    ```

    Note that the `.` operator evaluates the left-hand side for each call. This will probably lead to unexpected behavior if you try chaining `.` calls:

    ```wipple
    a : struct (|
      b '(c d)
    |)

    -- expected: c
    -- actual: error (c is not defined)
    a . b . 0

    -- this is because (c d) is evaluated again after being returned.
    -- above is evaluated like this:
    (a . b) . 0
    (c d) . 0
    error: c is not defined
        in (c d) (file.wpl:12:2)
        ...
    ```

    What you probably want to do is use the `..` operator, which accepts a list of paths to be applied one after the other:

    ```wipple
    > a .. b 0
    c
    ```

    And if you want to do this dynamically, you can use the `dynamic` package's `resolve-path!` function:

    ```wipple
    > use dynamic
    ()

    > path-segment-1 : 'b
    ()

    > path-segment-2 : 1 - 1
    ()

    > resolve-path! a [path-segment-1 path-segment-2]
    c
    ```

7. `...` has been added to the standard library and serves as a placeholder so that incomplete examples can still run. It evaluates to itself:

    ```wipple
    ... : '...
    ```

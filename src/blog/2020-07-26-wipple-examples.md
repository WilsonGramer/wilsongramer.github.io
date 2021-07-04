---
layout: post
title: Some examples of Wipple code
blurb: I’ve been working on my programming language Wipple recently and it’s starting to come together. Here are some code examples.
---

I've been working on my programming language [Wipple](https://github.com/wipplelang/wipple) recently and it's starting to come together. Here are some code examples!

This first one is from `enum.wpl`, which enables the creation of enumerations with associated values and pattern matching:

```wipple
use (import "list");
use (import "uuid");

-- Create an enumeration with the provided cases and associated values.
--
-- Parameters:
--   - `cases`: A list of case names and associated values, in the form
--     `(<case name 1> <associated values 1> <case name 2> <associated values 2> ...)`.
--
-- Returns a structure whose members are functions that correspond to each case;
-- that is, the member name is the case name and the function parameters are the
-- associated values.
--
-- You can use the `match` function to choose a value based on the selected case.
--
-- Example:
--
--     Result = Enum (
--         ok (value)
--         error (error)
--     );
--
--     ok-result = (Result.ok 42);
--
--     -- `format` returns a function that is called with the associated value.
--     write-line! (ok-result |> (match [
--         Result.ok (format "Success! _")
--         Result.error (format "Failure: _")
--     ]))
--
--     -- Displayed: "Success! 42"
Enum = 'cases ->
    cases
        |> (chunk 2)
        |> (each (case -> {
               case-name = case @ 0;
               associated-value-names = case @ 1;

               case-id = uuid!;

               -- Create a function uniquely associating the provided value with
               -- the case
               associated-value-fn = (fn-from-parameter-list associated-values-names);

               -- Add this function to a struct entry with the case name
               [case-name associated-value-fn]
           }))
        |> Struct;


-- TODO
match = cases -> value -> ...;


Package (Enum match)
```

(I haven't quite finished `match` yet — I'll update this post soon!)

Here's the example from the documentation rendered out:

```wipple
Result = Enum (
    ok (value)
    error (error)
);

ok-result = (Result.ok 42);

-- `format` returns a function that is called with the associated value.
write-line! (ok-result |> (match [
    Result.ok (format "Success! _")
    Result.error (format "Failure: _")
]))

-- Displayed: "Success! 42"
```

And here's how that `fn-from-parameter-list` function would be implemented:

```wipple
use (import "list");

-- Convert a list of parameter names and a return value into a curried function.
--
-- Example:
--
--     add3 = (fn-from-parameter-list '(a b c) (a + b + c));
--
--     -- add3 is equivalent to a -> b -> c -> a + b + c
--     add3 1 2 3 -- 6
fn-from-parameter-list = parameters -> return-value ->
    parameters
        |> reverse
        |> (combine return-value (result -> parameter -> ['Fn parameter result]));
```

More examples coming soon!

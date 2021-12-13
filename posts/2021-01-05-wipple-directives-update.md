---
title: New Directives Design in Wipple
---

Wipple has evolved a lot since my last post! I plan to publish a full writeup of all updates to the language, but for now, I've added a new construct called a directive.

Directives are special constructs that apply to the statement level and operate in three modes:

-   Stack mode (stack is reset at end of statement)

    ```wipple
    [stack push key value] -- Push a key-value pair to the stack, overwriting if the key already exists
    [stack pop key] -- Pop the key-value pair from the stack
    [stack get key] -- Get the key-value pair from the stack
    [stack has key] -- Check if the key exists in the stack
    ```

-   Environment mode

    ```wipple
    [env set key value] -- Set the key-value pair on the environment
    [env get key] -- Get the key-value pair from the environment
    [env has key] -- Check if the key exists in the environment
    [env del key] -- Remove the key-value pair from the environment if it exists
    [env export key replace/merge/error] -- Set the export mode for a key: 'replace' replaces the value, 'merge' uses the Merge trait, 'error' crashes the program
    ```

-   Global mode

    ```wipple
    [global set key value] -- Set the key-value pair globally
    [global get key] -- Get the key-value pair globally
    [global has key] -- Check if the key exists globally
    [global del key] -- Remove the key-value pair globally if it exists
    ```

You can create an env/global-level alias for pushing a value to the stack using the following syntax:

```wipple
[env/global alias foo] -- push a value to the stack, accessible as [foo <value>]
```

For example, you can create a convenient syntax for adding documentation to a variable (inspired by Rust):

```wipple
[env alias doc] ()

-- equivalent to [stack push doc "..."]
[doc "The ratio of a circle's circumference to its diameter"]
pi : 3.14
```

The early design of directives also managed assignment (implementing `:`). To define a variable in the current environment, use the macro `:`, which is implemented as:

```wipple
do {
    foo : 42
    foo -- 42
}

foo -- error
```

To define a variable globally, use `global:` (you should rarely need to do this):

```wipple
do {
    foo global: 42
    foo -- 42
}

foo -- 42
```

Similarly, you can use `::=` for environment-level conformances and `global::=` for global conformances.

More updates coming soon!

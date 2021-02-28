---
title: Wipple's Module System
date: February 28, 2021
---

I've been working on Wipple quite a lot recently, and I'm proud to say that it's now [available for download](https://wipple.gramer.dev)! Currently it only supports running single files though, so it's time to come up with a module system.

## What are modules?

In Wipple, a module is simply a captured environment (a collection of values that are passed down throughout the program). Any variables, conformances, etc. that are declared within a macro are captured and made available to others in one of two ways:

- Modules conform to `Call`, so accessing variables can be done by calling the module with the variable name, eg. `my-module foo`
- The `use` function merges the module's environment with the current one, eg. `use my-module`

## Declaring modules

Blocks are now declared using square brackets (`[` and `]`), and modules are declared using curly braces (`{` and `}`). The last statement is the result of a block, and a module (ie. an environment) is the result of a module block. For example, the module `person` can be declared and used like this:

```wipple
-- Declare the module 'person'
person : {
    name : "Wilson"
    favorite-color : "orange"
}

-- Access variables within 'person'
person name -- "Wilson"
person favorite-color -- "orange"

-- Bring all variables from 'person' into the current environment
use person
name -- "Wilson"
favorite-color -- "orange"
```

As you can see, modules in Wipple work like objects in other languages without the need for additional syntax! Of course, `use`-ing a module also merges in any other values part of the module's environment, including conformances.

## Scoping

Before modules, Wipple didn't really have a concept of scoping like other languages — the environment was simply copied into closures, `do` constructs and anything else that captured it. With modules, though, we need a way of tracking which values were created inside the immediate environment and which were created in a parent environment (you can access values from parent environments in a module block, but they are not exported). As such, the environment is now defined like so:

```rust
type EnvironmentValues = HashMap<EnvironmentKey, Box<dyn Any>>;

struct Environment {
    values: EnvironmentValues,
    parent: Option<Rc<RefCell<Environment>>>,
}
```

Resolving a variable, for example, would search the immediate environment first, and then any parents. Setting a variable is always done in the immediate environment and parents remain unchanged. You can use a reference (discussed later on in this article) to modify values in parent environments.

Modules would thus be defined like this, since they only capture their immediate environment:

```rust
struct Module {
    values: EnvironmentValues,
}
```

Environment keys also need to be able to describe how their value should be merged into other environments via `use`. We can do that like so:

```rust
struct UseFn(Rc<dyn Fn(&T, &T) -> T>);

impl UseFn {
    fn new(...) -> Self { ... }
  
    fn take_parent() -> Self {
        UseFn::new(|parent, _| parent.clone())
    }

    fn take_new() -> Self {
        UseFn::new(|_, new| new.clone())
    }
}

// First parameter is parent value, second parameter is new value
struct EnvironmentKey<T> {
    id: Uuid,
    r#use: UseFn<T>,
    // What to do when the key is not in the parent environment
    insert: bool,
}
```

From there, we can define `use` like this:

```rust
impl Environment {
    fn use(&mut self, new: &Environment) {
        for (key, new_value) in new.values {
            match self.values.get_mut(key) {
                Some(parent_value) => {
                    let used_value = key.r#use(parent_value, new_value);
                    *parent_value = used_value;
                }
                None => {
                    if key.insert {
                        self.values.insert(key, new_value);
                    }
                }
            }
        }
    }
}
```

These examples aren't fully complete and accurate, but you get the idea.

> NOTE: Because merging together operator precedences from different environments is very complex and may result in a different ordering than intended, all operator precedences must be declared globally (see below). In other words, the environment key for operator precedences has a `use` function of `take_parent`.

## Why are modules useful?

Modules allow you to split up your project into multiple files and make a distinction between private and public values, allowing your code to be more organized. Modules are also the primary way of passing "objects" (collections of variables) around and can be used for configurations with named, potentially optional values.

## Usage in Wipple code

In Wipple code, you can declare modules in two ways:

- With module blocks, as shown above
- With the `module` function, which loads another Wipple file as a module

The `module` function resolves paths as follows:

- If the path is relative, search relative to the current file; otherwise, search relative to the project root
- If the path points to a file, append the `.wpl` extension and load the file as a module
- If the path points to a folder, load the `module.wpl` file inside the folder. If this file does not exist, create an implicit module that `use`s all files/folders in the folder in alphabetical order
  - This should help prevent the boilerplate in languages where you need to explicitly export all files from the folder!

Modules are cached based on absolute path. In the future, support will be added for force-reloading modules. Currently modules cannot be mutually recursive (causes a stack overflow), but in the future this will be handled more gracefully.

You can `use` other files like this:

```wipple
-- Loads and uses "foo.wpl" relative to the project root
use (module "foo")
```

For convenience, the `use` function also accepts a text value:

```wipple
use "foo" -- equivalent to the above
```

## Loading interpreter plugins

Interpreter plugins can be loaded using the `load-plugin!` function. Paths are interpreted in the same way as `module`, but you pass a path to the folder containing the plugin, and the correct `.wplplugin` file is selected for the current platform. For example, on macOS, writing `load-plugin! "my-plugin"` would search for a `my-plugin/x86_64-apple-darwin.wplplugin` file relative to the project root.

## The global environment

Files are loaded inside a blank environment whose parent is the global environment. The global environment can be modified by passing a module to `global!`:

```wipple
global! {
    -- foo will be accessible to all files
    foo : 42
}
```

Modules passed to `global!` are `use`d in the global environment. Remember, though, that files (like all modules) won't be able to modify `foo` without also using `global!` — trying to set it with `:` will just create a new `foo` in the file's environment.

## References

If you need to modify something in a parent environment, you can do this:

```wipple
x : 1

use {
    x : 2
}

x -- 2
```

But with this approach, it's not possible to modify values in an environment that isn't a parent. In order to modify values part of any arbitrary environment (including values passed into functions), you can use a reference:

```wipple
x : reference 1

{
    x <- 2
}

x -- 2
```

The `<-` operator updates the reference with a new value. References conform to `Computed`, so referring to a reference by name evaluates to the stored value. You can use the `@` function to suppress the evaluation of `Computed` values, thus returning the reference itself:

```wipple
increment! : x -> [
    x <- x + 1
]

x : reference 1
increment! (@ x)
x -- 2
```

By convention, names referring to closures that mutate references or modify anything outside their own captured environment should have a `!` at the end.

References are stored as `Rc<RefCell<Value>>` values in Rust. In the future, support for weak references will be added to prevent reference cycles.



Thanks for reading! If you want to check out Wipple's implementation, you can visit https://github.com/wipplelang and browse the repositories. To download Wipple, visit https://wipple.gramer.dev.

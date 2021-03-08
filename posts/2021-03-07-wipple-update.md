---
title: Wipple Weekly Update
date: March 7, 2021
---

I worked a lot on Wipple over the past week — here's what's new!

## Changed block syntax

To make room for modules, blocks now use square brackets (`[]`) instead of curly braces:

```wipple
three : [
   1
   2
   3
]
```

## Modules

[Modules](https://gramer.dev/blog/2021-02-28-wipple-module-system) encapsulate their environment, allowing you to declare variables in a particular scope. Modules are declared using module blocks (which take the `{}` syntax from regular blocks):

```wipple
module : {
    variable : "Hello"
}
```

`variable` won't be accessible outside of the module. If you want to access a variable inside a module, you can call the module as a function, passing the desired name as input:

```wipple
module variable -- "Hello"
```

Alternatively, you can `use` a module to bring all of its variables (as well as any other items in the captured environment, like conformances) into the current environment:

```wipple
use module
variable -- "Hello"
```

## Project management

Project management is now implemented, so you can split code across multiple files. To create a project, add a `project.wpl` file in the root folder containing a `main` variable:

```wipple
-- project.wpl

main : "main"
```

The provided string represents the path to the main file of the project, relative to `project.wpl`.

```wipple
-- main.wpl

show "Hello, world!"
```

Just run `wipple run` in your terminal to run the project:

```sh
$ wipple run
Hello, world!
```

You can also `import` and `use` other files anywhere in your project. For example, you could use the code in `hello.wpl` from `main.wpl`:

```wipple
-- hello.wpl

hello : "Hello, world!"

-- main.wpl

use "hello" -- or "./hello"

show hello
```

Currently `project.wpl` only supports `main`, but support for dependencies and other configuration options will be implemented soon.

## Removed binary operators

Variadic operators can do everything binary operators can, and binary operators were causing some problems in the parser (eg. `2 + 2 + 2` would be evaluated to `4`). Therefore, binary operators have been removed entirely.

## Codebase organization

The [Wipple codebase](https://github.com/wipplelang/wipple) has been reorganized, merging everything into one repository for easier debugging and maintenance. Builds of the interpreter are also now released automatically, and some tests of language semantics have been added.

---

This week, I'll be focusing less on the core language and more on porting our [robotics team's Botball library](https://github.com/tyngsboroughrobotics) to Wipple. Check back here next week for another update!

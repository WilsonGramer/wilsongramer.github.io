---
title: A simple introduction to Wipple
---

As we know, computers are designed to process information — number crunching, handling people's names and phone numbers, showing websites, and more. The problem is that computers are really just machines that can't operate without human guidance. Our job as programmers is to tell the computer what to do, and the way we do that is by writing code. Wipple is a "programming language": similar to languages like English, Wipple is a way to convey meaning, but instead you're having a conversation with the computer!

## Variables

Computers work by taking some input, and using the program they're given to process that input into some output. A program needs a way to refer to the input, and in Wipple we do this by using **names**. Think of names like labels on boxes — they're a way to identify whatever is inside. A mystery box isn't very useful! Names can be one word, like `number` or `color` or `x`, or multiple words separated by a dash, like `favorite-color` or `lorem-ipsum`. When a name refers to a piece of information, it's called a **variable**.

Let's write a program to keep track of a bank account's balance. We can refer to the balance with a name like `balance`! Let's try writing some code in the [playground](https://playground.wipple.gramer.dev/?code=show!%20balance):

```wipple
show! balance
```

You'll see we get an error. How come? The problem is that we haven't told the computer what `balance` actually refers to — it's like having a stray label not attached to any box. In order to make `balance` refer to something, say $75, we can use a colon (`:`, pronounced "is"):

```wipple
balance : 75
```

The above code reads as "balance is 75". Now try running both lines of code at once; on the right you should see:

```
balance ==> 75
```

Now the computer knows that `balance` refers to 75!

(If you still got an error running the code, make sure that `balance : 75` is placed _before_ `show! balance`. If you place it after, it's like trying to read a label before it's attached to a box — you're doing things in the wrong order.)

## Functions

So we have a way to refer to input. But how do we actually _do_ anything with it? In Wipple, we can describe how to transform input into output using what's called a **function**. If you remember from math, the function `f(x) = x + 3` takes some input `x` and multiplies it by 3. Wipple functions are similar — all you have to do is use an arrow (`=>`, pronounced "becomes"):

```wipple
input => output
```

The above code reads as "input becomes output". Whatever is on the left is the input, and whatever is on the right is the output. For example, we can describe adding 3 to a number like so:

```wipple
number => number + 3
```

Here we run into the "mystery box" problem again, though — we have a function but no way to use it! To fix this we can give our function a name:

```wipple
add-three : number => number + 3
```

The above code reads as "add-three is when some number becomes the number plus 3". Or more concisely, "add-three is a function that adds 3 to its input".

In order to use the function, we write `add-three` and then the desired input:

```wipple
add-three 2
```

If you `show!` that in the playground (`show! (add-three 2)`), you get 5!

```
(add-three 2) ==> 5
```

Going back to the bank account example, we can use a function to describe how to deposit money into our account:

```
deposit : amount => balance + amount
```

Finally, let's deposit $50 into our account!

```
show! (deposit 50)
```

```
(deposit 50) ==> 125
```

We can update our balance by updating `balance` to the result of `deposit 50`:

```wipple
balance : deposit 50
```

You can repeat this line of code multiple times to keep adding money!

If you want, you can also define a `withdraw` function and use it in the same way:

```wipple
withdraw : amount => balance - amount
```

Congratulations, now you know how to write basic programs in Wipple! [Here's the full playground](https://playground.wipple.gramer.dev/?code=balance%20%3A%2075%0A%0Adeposit%20%3A%20dollars%20%3D%3E%20balance%20%2B%20dollars%0A%0Abalance%20%3A%20deposit%2050%0Ashow!%20balance%0A%0Awithdraw%20%3A%20dollars%20%3D%3E%20balance%20-%20dollars%0A%0Abalance%20%3A%20withdraw%2010%0Ashow!%20balance) for you to experiment with.

More Wipple guides are coming soon... stay tuned! You can check out the Wipple project [on GitHub](https://github.com/wipplelang/wipple) if you're interested.

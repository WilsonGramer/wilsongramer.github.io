---
title: Binding Optionals in SwiftUI
date: August 9, 2020
---

I’ve been working a lot with SwiftUI lately, and one issue I keep running into is dealing with binding to an `Optional` state value. So I wrote these simple little `Binding` extensions (they should be self-explanatory) — I hope you find them useful!

```swift
import SwiftUI

extension Binding {
    init(forceUnwrapping optional: Binding<Value?>) {
        self.init(
            get: { optional.wrappedValue! },
            set: { optional.wrappedValue = $0 }
        )
    }

    init(unwrapping optional: Binding<Value?>, default: Value) {
        self.init(
            get: { optional.wrappedValue ?? `default` },
            set: { optional.wrappedValue = $0 }
        )
    }
}
```

Let me know what you think, or if there's a better way to be going about this!

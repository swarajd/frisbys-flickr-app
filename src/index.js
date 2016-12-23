import compose from "ramda/src/compose"
import prop from "ramda/src/prop"
import { hellaUsed } from "./utils/uses"

console.log(hellaUsed())

const a = x => x + 1
const b = x => x + 2

const c = compose(a, b)
console.log(c(4))

let d = {
    e: 6
}

let f = prop('e', d)
console.log(f)
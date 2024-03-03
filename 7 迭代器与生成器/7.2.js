// function* generatorFn() {
//     yield 1
//     console.log(yield 2) 
//     return 3
// }
// let generatorObject = generatorFn()
// console.log(generatorObject.next())
// console.log(generatorObject.next())
// console.log(generatorObject.next(4))


// function* generatorFn() {
//     console.log(yield* [1, 2, 3], 111);
// }
// for (const val of generatorFn()) {
//     console.log(val);
// }

// function* innerFn() {
//     console.log(yield* [1, 2, 3], 111);
//     return 4
// }

// function* outerFn() {
//     console.log(yield* innerFn(), 222);
// }

// for (const val of outerFn()) {
//     console.log(val);
// }

const obj = {
    * [Symbol.iterator]() {
        yield *[1, 2, 3]
    }
}
for (const val of obj) {
    console.log(val);
}

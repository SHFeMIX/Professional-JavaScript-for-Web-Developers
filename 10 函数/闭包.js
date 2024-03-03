const obj = {
    test: () => {
        console.log(this)
    },
}

obj.test()

function outer() {
    return () => {
        console.log(this)
    }
}

obj.test2 = outer
obj.test2()()
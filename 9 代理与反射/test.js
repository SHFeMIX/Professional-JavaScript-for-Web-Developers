const a = {
    num: 1,
    get value() {
        return this.num
    }
}

const b = {
    num: 2,
}

Object.setPrototypeOf(b, a)
console.log(b.value) // 2

///
const proxy = new Proxy(a, {
    get(target, key) {
        return target[key]
    }
})

Object.setPrototypeOf(b, proxy)
console.log(b.value) // 1

///
const proxy2 = new Proxy(a, {
    get(target, key, receiver) {
        return Reflect.get(target, key, receiver)
    }
})

Object.setPrototypeOf(b, proxy2)
console.log(b.value) // 2

///
console.log(Reflect.get(a, 'value')) // 1
console.log(Reflect.get(a, 'value', b)) // 2



///////////// 另一种原因的解释
const c = {
    num: 3,
    get value() {
        return this.num
    }
}

const proxy3 = new Proxy(c, {
    get(target, key, receiver) {
        // return Reflect.get(target, key)
        return Reflect.get(target, key, receiver)
    }
})

// effect(() => {
//     console.log(proxy3.value)
// })

// 此时，副作用函数依赖于 proxy3.value，而 proxy3.value 其实又依赖于 proxy.num，所以我们希望当 proxy3.num 发生变化时，副作用函数能够重新执行
// 然而，访问proxy3.value时，通过51行访问到c.value, 执行访问器函数时this指向c而不是proxy3，所以这个副作用函数没有访问到proxy3.num，也就无法被收集到proxy3.num的依赖中

// 通过给Reflect.get传入receiver参数，可以改变访问器的this指向，使它访问proxy3.num，这样副作用函数就能被收集到proxy3.num的依赖中了

// 一句话总结：receiver可以改变访问器的this指向
// 不用receiver： proxy3.value =》 c.value =》 c.num
// 用receiver： proxy3.value  =》 c.value.call(proxy) => proxy3.num =》 c.num
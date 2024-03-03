// const success = new Promise((resolve, reject) => {
//     resolve('success')
// })
// success.then(result => {
//     console.log(result)
// }).then(() => console.log('success'), () =>  console.log('failure'))



// const success2 = new Promise((resolve, reject) => {
//     resolve('success')
// }).then(result => {
//     console.log(result)
//     throw new Error('error')
// }).then(() => console.log('success'), () =>  console.log('failure'))



// const failure = new Promise((resolve, reject) => {
//     reject('failure')
// }).then(() => console.log('success'), 
//         () => console.log('failure')
// ).then(() => console.log('success'), () =>  console.log('failure'))


// const failure = new Promise((resolve, reject) => {
//     reject('failure')
// }).then(() => console.log('success'),
//     () => {
//         console.log('failure')
//         throw new Error('error')
//     }
// ).then(() => console.log('success'), () => console.log('failure'))

function then(resolve, reject) {
    const func = this.state === 'fulfilled' ? resolve : reject

    return new Promise((resolve, reject) => {
        try {
            const result = func(this.value)
            if (result instanceof Promise) {
                result.then(resolve, reject)
            } else {
                resolve(result)
            }
        } catch (error) {
            reject(error)
        }
    })
}
// css变量有作用域的概念，只能在声明它的元素及其子元素中使用，不能跨元素使用

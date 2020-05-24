// const interval = setInterval(() => console.log('Hello World!'), 1000); // return Object
// interval.unref();
// setTimeout(() => console.log('timeout'), 3000);

// function foo() {
//     const result = 1;
//     return result;
// }

// function foo1() {
//     let result;
//     setTimeout(() => {
//         result = 2;
//     }, 1000);
//     return result;
// }

// callback
// function foo1(callback) {
//     let result;
//     setTimeout(() => {
//         result = 2;
//         callback(result);
//     }, 1000);
// }
//
// foo1((result) => {
//     console.log(result);
// });

// Promise
// pending
// fulfilled / rejected

function foo2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = {
                name: 'John',
                age: 30,
            };
            resolve(result);
            // reject('Error!');
        }, 2000);
    });
}

// foo2().then((userData) => {
//     console.log('Resolve', userData);
// }, (error) => {
//     console.log('Reject', error);
// });

// foo2().then((userData) => {
//     console.log('Resolve', userData);
// }).catch((error) => {
//     console.log('Reject', error);
// });

async function fetchResult() {
    console.log(1);
    const user = await foo2();
    console.log(user);
    console.log(2);
}
fetchResult();

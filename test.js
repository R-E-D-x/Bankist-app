// let callCount = 0;

// function memoize(fn) {
//     const map = new Map();
//     return function (...args) {
//         let ar = JSON.stringify([...args]);;
//         let arRev = JSON.stringify([...args].reverse());
//         if (map.has(ar)) {
//             console.log('ar: ' + map.get(ar))
//             return map.get(ar)

//         } else if (map.has(arRev)) {

//             console.log('arRev: ' + map.get(arRev))
//             return map.get(arRev)
//         }

//         let output = fn(...args)
//         map.set(ar, output);

//         return output
//     }
// }

// const memoizedFn = memoize(function (a, b) {
//     callCount += 1;
//     return a + b;
// })

// memoizedFn(1, 3)
// console.log(callCount)
// memoizedFn(3, 1)
// memoizedFn(10, 10)
// console.log(callCount)
let newMap = '';
newMap = [1, 2, 3, 4, 5, 6].map((value, key) => `${value}`)
console.log(newMap)
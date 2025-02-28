const data1 = [5, 2, 4, 1, 15, 8, 3];
const data2 = [16, 6, 10, 5, 6, 1, 4];

function calcAverage(data) {
    return data.reduce((acc, cur) => acc + cur, 0) / data.length;
}
let average = calcAverage(data1.concat(data2))
console.log(average);
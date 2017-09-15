

let obj1 = {1:1, 2:2};
let obj2 = {3:3, 4:4};

let obj3 = Object.assign({}, obj1, obj2);


console.log(obj1, obj2, obj3);
obj3[3] = 'aaa';
console.log(obj1, obj2, obj3);

console.log('jerry');

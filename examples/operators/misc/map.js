const Rx = require('rxjs')

//emit (1,2,3,4,5)
const source = Rx.Observable.from([1, 2, 3, 4, 5])
//add 10 to each value
const example = source.map(val => val + 10)
//output: 11,12,13,14,15
const subscribe = example.subscribe(val => console.log(val))


//emit ({name: 'Joe', age: 30}, {name: 'Frank', age: 20},{name: 'Ryan', age: 50})
const source2 = Rx.Observable.from([{ name: 'Joe', age: 30 }, { name: 'Frank', age: 20 }, { name: 'Ryan', age: 50 }])
//grab each persons name
const example2 = source.map(person => person.name)
//output: "Joe","Frank","Ryan"
const subscribe2 = example.subscribe(val => console.log(val))
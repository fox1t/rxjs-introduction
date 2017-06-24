const Rx = require('rxjs')

console.clear()

//emit array as a sequence of values
const arraySource = Rx.Observable.from([1, 2, 3, 4, 5])
arraySource.subscribe(val => console.log(val))

//emit result of promise
const promiseSource = Rx.Observable.from(new Promise(resolve => resolve('Hello World!')))
promiseSource.subscribe(val => console.log(val))

//works on js collections
const map = new Map()
map.set(1, 'Hi')
map.set(2, 'Bye')

const mapSource = Rx.Observable.from(map)
mapSource.subscribe(val => console.log(val))

const source = Rx.Observable.from('Hello World')
source.subscribe(val => console.log(val))
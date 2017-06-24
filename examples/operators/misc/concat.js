const Rx = require('rxjs')

//emits 1,2,3
const sourceOne = Rx.Observable.of(1, 2, 3)
//emits 4,5,6
const sourceTwo = Rx.Observable.of(4, 5, 6)
//emit values from sourceOne, when complete, subscribe to sourceTwo
const example = sourceOne.concat(sourceTwo)
//output: 1,2,3,4,5,6
const subscribe = example.subscribe(val => console.log('Example: Basic concat:', val))


const foo = Rx.Observable.interval(500).take(4)
const prefix = Rx.Observable.of('a')

const bar = prefix.concat(foo)

bar.subscribe(
  function (x) { console.log('next ' + x) },
  function (err) { console.log('error ' + err) },
  function () { console.log('done') },
)

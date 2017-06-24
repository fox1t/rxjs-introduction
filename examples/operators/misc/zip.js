const Rx = require('rxjs')

//emit every 1s
const interval = Rx.Observable.interval(1000)
//when one observable completes no more values will be emitted
const example = Rx.Observable
  .zip(
  interval,
  interval.take(2)
  )
//output: [0,0]...[1,1]
const subscribe = example.subscribe(val => console.log(val))
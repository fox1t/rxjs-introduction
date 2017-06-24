const Rx = require('rxjs')

//emit every 2.5 seconds
const first = Rx.Observable.interval(2500)
//emit every 1 second
const second = Rx.Observable.interval(1000)
//used as instance method
const merged$ = first.merge(second)
//output: 0,1,0,2....
const subscribe = merged$.subscribe(val => console.log(val))


const foo = Rx.Observable.interval(500).take(4)
const bar = Rx.Observable.interval(300).take(5)

const merged = Rx.Observable.merge(foo, bar)

merged.subscribe(
  function (x) { console.log('next ' + x) },
  function (err) { console.log('error ' + err) },
  function () { console.log('done') },
)

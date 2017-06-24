const Rx = require('rxjs')

const foo$ = Rx.Observable.interval(500).take(5)

const result = foo$.throttleTime(1000)

result.subscribe(
  function (x) { console.log('next ' + x) },
  function (err) { console.log('error ' + err) },
  function () { console.log('done') },
)


const source = Rx.Observable.interval(1000)

const example$ = source.throttle(val => Rx.Observable.interval(2000))

example$.subscribe(val => console.log(val))
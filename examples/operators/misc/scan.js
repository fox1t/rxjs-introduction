const Rx = require('rxjs')

const foo = Rx.Observable.of('h', 'e', 'l', 'l', 'o')
const bar = Rx.Observable.interval(600).take(5)

const combined = foo
  .zip(bar, (x, y) => x)
  .scan((acc, x) => acc + x, '')

combined.subscribe(
  function (x) { console.log('next ' + x) },
  function (err) { console.log('error ' + err) },
  function () { console.log('done') },
)

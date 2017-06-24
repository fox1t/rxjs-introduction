const Rx = require('rxjs')

const first$ = Rx.Observable.of('h', 'e', 'l', 'l', 'o')
  .zip(Rx.Observable.interval(600).take(5), (x, y) => x)

const second$ = Rx.Observable.interval(900).take(3)

const result = first$.buffer(second$)

result.subscribe(
  function (x) { console.log('next ' + x) },
  function (err) { console.log('error ' + err) },
  function () { console.log('done') },
)

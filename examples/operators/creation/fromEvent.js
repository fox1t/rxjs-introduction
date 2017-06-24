const Rx = require('rxjs')

console.clear()

const foo$ = Rx.Observable.fromEvent(document, 'click')

foo$.subscribe(function (x) {
  console.log('next ' + x)
}, function (err) {
  console.log('error ' + err)
}, function () {
  console.log('done')
})
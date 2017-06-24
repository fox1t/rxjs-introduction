const Rx = require('rxjs')

const shared = Rx.Observable.interval(1000)
  .do(x => console.log('source ' + x))
  .share()

// share = publish().refCount()
// publish = multicast + Subject

const observerA = {
  next: function (x) { console.log('A next ' + x) },
  error: function (err) { console.log('A error ' + err) },
  complete: function () { console.log('A done') },
}

const subA = shared.subscribe(observerA)

const observerB = {
  next: function (x) { console.log('B next ' + x) },
  error: function (err) { console.log('B error ' + err) },
  complete: function () { console.log('B done') },
}

let subB
setTimeout(function () {
  subB = shared.subscribe(observerB)
}, 2000)

setTimeout(function () {
  subA.unsubscribe()
  console.log('unsubscribed A')
}, 5000)

setTimeout(function () {
  subB.unsubscribe()
  console.log('unsubscribed B')
}, 7000)


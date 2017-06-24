const Rx = require('rxjs')

const click$ = new Rx.Subject()

document.addEventListener('click', ev => { click$.next(ev) })

click$.subscribe(ev => { console.log(ev) })

// vs

const click2$ = Rx.Observable.create(
  function subscribe(observer) {
    const listener = function (ev) {
      observer.next(ev)
    }

    document.addEventListener('click', listener)

    return function unsubscribe() {
      document.removeEventListener('click', listener)
    }
  }
)

const subscription = click$.subscribe(function (ev) {
  console.log(ev.clientX)
})

setTimeout(function () {
  subscription.unsubscribe()
}, 4000)
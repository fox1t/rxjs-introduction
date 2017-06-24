const Rx = require('rxjs')

function interval() {
  setInterval(() => console.log('..'), 1000)
}

interval()

setTimeout(() => {
  interval()
}, 2000)

const interval$ = Rx.Observable.interval(1000)
const subject = new Rx.Subject()
interval$.subscribe(subject)
subject.subscribe(val => console.log(`First observer ${val}`))


setTimeout(() => {
  subject.subscribe(val => console.log(`Second observer ${val}`))
}, 2000)
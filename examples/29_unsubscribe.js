const { Observable } = require('rxjs')

const randomNumber$ = Observable.create((observer) => {
  const id = setInterval(() => {
    observer.next(Math.random())
  }, 500)
  return () => clearInterval(id)
})

const sub = randomNumber$.subscribe({
  next(x) { console.log(x) },
  error(e) { console.error(e) },
  complete() { console.log('done') }
})

setTimeout(() => {
  sub.unsubscribe()
}, 2000)

// 0.10430196667680214
// 0.4141351814554881
// 0.5761438321958294
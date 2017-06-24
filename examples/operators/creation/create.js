const Rx = require('rxjs')

console.clear()

// basic
const foo$ = Rx.Observable.create(function subscribe(observer) { // same as with new
  const id = setInterval(function () {
    observer.next('hi')
  }, 1000)
  return function unsubscribe() {
    clearInterval(id)
  }
})

const subscription = foo$.subscribe({
  next: x => { console.log('next ' + x) },
  error: err => { console.log('error ' + err) },
  complete: () => { console.log('done') },
})

setTimeout(function () {
  subscription.unsubscribe()
}, 4500)

// emits heòp world on subscription

const hello = Rx.Observable.create(function (observer) {
  observer.next('Hello')
  observer.next('World')
})

//output: 'Hello'...'World'
hello.subscribe(val => console.log(val))

// even
const evenNumbers = Rx.Observable.create(function (observer) {
  let value = 0
  const interval = setInterval(() => {
    if (value % 2 === 0) {
      observer.next(value)
    }
    value++
  }, 1000)

  return () => clearInterval(interval)
})
//output: 0...2...4...6...8
const subscribe2 = evenNumbers.subscribe(val => console.log(val))
//unsubscribe after 10 seconds
setTimeout(() => {
  subscribe2.unsubscribe()
}, 10000)
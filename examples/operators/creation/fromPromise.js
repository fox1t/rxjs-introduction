const Rx = require('rxjs')

console.clear()

const fromPromise$ = Rx.Observable.fromPromise(fetch('https://jsonplaceholder.typicode.com/posts/1'))

fromPromise$.subscribe({
  next: x => { console.log( x) },
  error: err => { console.log('error ' + err) },
  complete: () => { console.log('done') },
})
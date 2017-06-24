const { Observable } = require('rxjs')

const createWithFunction = Observable.create(obs => [1, 2, 3, 4].forEach(x => {obs.next(x)}))
const ofOrInterval = Observable.defer(() => {
  if (Math.random() > 0.5) {
    return Observable.of(1, 2, 3)
  } else {
    return Observable.interval(1000)
  }
})
const arrayObservable = Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9])
// const eventObservable = Observable.fromEvent(document, 'click')
const promiseObservable = Observable.fromPromise(Promise.resolve('ciao'))
const emptyObservable = Observable.empty() // never and throw
const intervalObservable = Observable.interval()
const createFromArgs = Observable.of("vai", "gino", "facciamolo", "dai", "cazzo")
const rangeObservable = Observable.range(0, 10)
const timerObservable = Observable.timer("initial delay", "period")

promiseObservable
  .subscribe( data => {
    console.log(data)
  })

// ofOrInterval.subscribe(x => console.log(x))

// eventObservable
//   .subscribe(e => { console.log(`${e.clientX}, ${e.clientY}`); })

// createWithFunction
//   .subscribe({
//     next: x => console.log(x),
//     error: err => console.log(err),
//     complete: () => console.log('done'),
//   })

// createFromArgs
//   .subscribe( x => {console.log(x)})

// arrayObservable
//   .map(x => x *2)
//   // .mapTo(2)
//   .subscribe(val => console.log(val))

// emptyObservable
//   .subscribe( {
//     complete: x => {
//       console.log('empty completed', x) // x is undefined
//     }
//   })
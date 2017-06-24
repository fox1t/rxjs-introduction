const { Observable } = require('rxjs')

console.clear()

const obs$ = Observable.interval(1000)

obs$.subscribe({
  next: x => { console.log('next ' + x) },
  error: err => { console.log('error ' + err) },
  complete: () => { console.log('done') },
})
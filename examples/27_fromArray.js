const { Observable } = require('rxjs')

const array$ = Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9])
array$
  .map(x => x * 2)
  .do(x => { console.log(`After map: ${x}`) })
  .filter(x => x > 6)
  .subscribe(
    x => { console.log(`Next: ${x}`) },
    err => { console.log(`Err: ${err}`) },
    () => { console.log(`Complete`) }
    )

// First: 8
// First: 10
// First: 12
// First: 14
// First: 16
// First: 18
// Second: 8
// Second: 10
// Second: 12
// Second: 14
// Second: 16
// Second: 18

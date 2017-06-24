const { Observable } = require('rxjs')

const array$ = Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9])
  .map(x => x * 2)
  .filter(x => x > 6)

array$
  .subscribe(x => console.log(`First: ${x}`))
array$
  .subscribe(x => console.log(`Second: ${x}`))

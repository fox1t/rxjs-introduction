const Rx = require('rxjs')

const foo$ = Rx.Observable.interval(1000)

const bar = foo$.filter(x => x % 2 === 0)

bar.subscribe(
  function (x) { console.log('next ' + x) },
  function (err) { console.log('error ' + err) },
  function () { console.log('done') },
)

const source = Rx.Observable.from([{ name: 'Joe', age: 31 }, { name: 'Bob', age: 25 }])
const example = source.filter(person => person.age >= 30)

example.subscribe(val => console.log(`Over 30: ${val.name}`))
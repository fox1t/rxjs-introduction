const Rx = require('rxjs')
const foo = Rx.Observable.interval(100).take(5)

const result = foo.debounce(() =>
  Rx.Observable.interval(1000).take(1)
)

result.subscribe(
  function (x) { console.log('next ' + x) },
  function (err) { console.log('error ' + err) },
  function () { console.log('done') },
)


const input = document.getElementById('example')

const example2 = Rx.Observable
  .fromEvent(input, 'keyup')
  .map(i => i.currentTarget.value)

const debouncedInput = example2.debounceTime(500)


debouncedInput.subscribe(val => {
  console.log(`Debounced Input: ${val}`)
})
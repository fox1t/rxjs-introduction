const { Observable } = require('rxjs')

const doubled = [];

const doubleMap = numbers => {
  for (let i = 0; i < numbers.length; i++) {
    doubled.push(numbers[i] * 2);
  }
  return doubled;
};

console.log(doubleMap([2, 3, 4])); // [4, 6, 8]


// const array$ = Observable.from([1, 2, 3, 4])
// const array2$ = Observable.from([5, 6, 7, 8, 9])
// array$
//   .merge(array2$)
//   .subscribe(x => console.log(`First subscription: ${x}`))
// First: 1
// First: 2
// First: 3
// First: 4
// First: 5
// First: 6
// First: 7
// First: 8
// First: 9

// const example$ = Observable.create(observer => observer.next(1))
// const observer = {
//   next: next => {
//     console.log(`Observer next called: ${next}`)
//   },
//   error: err => {
//     console.log(err)
//   },
//   complete: () => {
//     console.log('done')
//   }
// }
// example$.subscribe(observer) // comincia l'esecuzione

// const numberStream = Observable.of(1, 2, 3, 4, 5, 6, 7, 8);
// numberStream.subscribe({
//   next(x) { console.log(x); },
//   error(e) { console.error(e); },
//   complete() { console.log('done'); }
// });
// => 1
// => 2
// => 3
// => 4
// => 5
// => 6
// => 7
// => 8
// => done


// const array$ = Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9])
// array$
//   .map(x => x * 2)
//   .filter(x => x > 6)
//   .subscribe(x => console.log(x))

// 8
// 10
// 12
// 14
// 16
// 18


// const array$ = Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9])
//   .map(x => x * 2)
//   .filter(x => x > 6)
// array$
//   .subscribe(x => console.log(`First subscription: ${x}`))
// array$
//   .subscribe(x => console.log(`Second subscription: ${x}`))


// const array$ = Observable.from([1, 2, 3, 4])
// const array2$ = Observable.from([5, 6, 7, 8])
// array$
//   .merge(array2$)
//   .subscribe(x => console.log(`${x}`))

// let obs = Observable
//   .interval(1000)
//   .publish();
// obs.connect();

// setTimeout(() => {
//   obs.subscribe(v => console.log("1st:" + v));
//   setTimeout(
//     () => obs.subscribe(v => console.log("2nd:" + v)), 1000);

// }, 2000);


// const array$ = Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9])
// const [evens, odds] = array$.partition(val => val % 2 === 0)

// odds
//   .reduce((acc, curr) => [...acc, curr], [])
//   .subscribe(val => console.log(val))

// evens
//   .reduce((acc, curr) => [...acc, curr], [])
//   .subscribe(val => console.log(val))


// const subscribe = Observable.merge(
//   evens
//     .map(val => `Even: ${val}`),
//   odds
//     .map(val => `Odd: ${val}`)
// ).subscribe(val => console.log(val));


// const array$ = Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9])
//   .groupBy(val => val % 2 === 0)

// const subscribe = array$.mergeMap(group => group.reduce((acc, curr) => [...acc, curr], []))
// .subscribe(val => console.log(val));
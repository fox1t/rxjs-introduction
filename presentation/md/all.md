
class: center, middle

# titolo talk

logo rx

contatti

---

# Slide di presentazione 
## nome

* cosa faccio
* chi sono
* varie

---

# Agenda

1. Introduction
2. Deep-dive
3. ...

---

# Che cos'è RxJS

ReactiveX è una libreria che serve per comporre programmi asincorno e event-based, usando una sequenza "osservabile" di valori. Il fatto che sia una sequenza ci permette di manipolare i dati che vi sono racchiusi come se fossero array, cioè strutture dati a cui siamo abituati.

???

Notes for the _first_ slide!

---

# Definizione di reactive Programming

  Programming with asynchronous observables data streams

André Staltz, Reactive programming introduction

---

# Sito di ReactiveX

http.//reactive.io

* specifiche reactive
* implementazioni in moltissimi linguaggi
* a noi interessa RXJS

---

# Uno stream è composto da:

* Observable
* Operatori
* Subscription

---

# Observable

Un Obeservable(o stream) può essere complesso da capire all'inizio.

Principali caratteristiche:
* è un __oggetto__(javascript) che possiede dei metodi(chiamati __operatori__) e delle proprietà
* per facilitare la comprensione si può pensarlo come a un emettitore di eventi o valori in un certo periodo di tempo
* si basa su flussi(_stream_), sugli operatori per modificarli e gli observer che li ascoltano

???

---

# HOT VS COLD 

I cold observables cominciano l'esecuzione dopo che viene invocato il metodo subscribe. Al contrario gli hot
observable producono i loro valori anche prima che ci sia una subscription attiva in ascolto, per esempio i click del mouse.
COLD
```
let obs = Rx.Observable.create(observer => observer.next(1));

*obs.subscribe(v => console.log("1st subscriber: " + v));
obs.subscribe(v => console.log("2nd subscriber: " + v));
```

???

Notes for the _first_ slide!

---

# Che cos'è il FRP(functional reactive programming)

---

# Esempio di stream

```js
const array$ = Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9])
array$
  .map(x => x *2)
  .filter(x => x > 6)
  .subscribe(x => console.log(x))
```
### Punti a favore:
* Immutabilità
* API già conosciuta per le collection
* Testabilità

---

# Più di una subscription
```js
const array$ = Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9])
  .map(x => x *2)
  .filter(x => x > 6)
array$
  .subscribe(x => console.log(`First subscription: ${x}`))
array$
  .subscribe(x => console.log(`Second subscription: ${x}`))
```
A un solo stream si possono "attaccare" più subscription.

---

# Gli stream si possono comporre
```js
const array$ = Observable.from([1, 2, 3, 4])
const array2$ = Observable.from([ 5, 6, 7, 8, 9])
array$
  .merge(array2$)
  .subscribe(x => console.log(`First subscription: ${x}`))
```

---

# Gli stream si possono anche spezzare
```js
const array$ = Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9])
const [evens, odds] = array$.partition(val => val % 2 === 0)

const subscribe = Observable.merge(
  evens
    .map(val => `Even: ${val}`),
  odds
    .map(val => `Odd: ${val}`)
  ).subscribe(val => console.log(val));
```

---

class: center, middle

# Reactive Functional  Programming con RxJS

.center[
<img src="img/Rx_Logo_S.png" style="width: 100px"/>
]

---

# Chi sono?

<div style="margin-top: 100px">
.left-column.center[
## Maksim Sinik
]

.right-column[
- Fullstack developer
- Software e Cloud Architect
- DevOps lover
- Functional Programming enthusiast
]
</div>

.center[
<img src="img/twitter.png" style="width: 100px"/>
#### [@maksimsinik](http://twitter.com/maksimsinik)
]

---
<div style="margin-top: 100px">
.left-column[# Agenda]
.right-column[
1. Introduzione alla FRP
2. Che cos'è RxJS?
3. Composizione ed esecuzione di uno stream
4. Marble Diagrams
5. Obsevable Operators
6. Subjects
7. Higher Order Observables
]
</div>

---

class: center, middle

# 1. Che cos'è la FRP?

--

### **Functional** Programming + **Reactive** Programming

---

# Functional Reactive Programming

### FRP è un __paradigma di programmazione__ che permette di gestire un __flusso di dati asincrono__, servendosi dei capisaldi della __programmazione funzionale__ (ad esempio dei metodi `map, reduce, filter`). La FRP è molto usata nella programmazione di _interfacce grafiche_, in robotica e in musica e ha come scopo quello di rendere più semplice la modelazione degli __eventi che succedono nel tempo__.

---

class: center, middle

# Callback

### "Una __funzione__, o un "blocco di codice" che viene passata come __parametro__ ad un'altra funzione"

--

## __async__ vs __sync__

???

* Parla in modo generico di cosa sono le callback.
  * esempio con Array.prototype.forEach <- callback sincrona
  * esempio con promise e fa vedere che ci sono 2 callback, una per l'errore e una per il successo
  * esempio finale con gli straeam di nodejs che hanno 3 callback: next, error, done

---

# Imperative vs Declarative (1)

.half-column.center[
## Imperativo
Paradigma di programmazione secondo cui un programma viene inteso come un __insieme di istruzioni__, ciascuna delle quali può essere pensata come un "_ordine_" che viene impartito alla macchina virtuale del linguaggio di programmazione utilizzato. 
]

.half-column.center[
## Dichiarativo
Paradigma di programmazione che si focalizza sulla __descrizione__ delle proprietà della soluzione desiderata (__il cosa__), lasciando indeterminato l'algoritmo da usare per trovare la soluzione (__il come__).
]


---

# Imperative vs Declarative (2)

### Imperativo
```js
const doubled = []

const doubleMap = numbers => {
  for (let i = 0 i < numbers.length i++) {
    doubled.push(numbers[i] * 2)
  }
  return doubled
}

console.log(doubleMap([2, 3, 4])) // [4, 6, 8]
```

--

### Dichiarativo (Funzionale)
```js
const doubleMap = numbers => numbers.map(n => n * 2)

console.log(doubleMap([2, 3, 4])) // [4, 6, 8]

```

---

# Functional Programming
--

* ### è un paradigma di pogrammazione __dichiarativo__

--

* ### il programma è l'__esecuzione__ di una serie __di funzioni__

--

* ### usa tipi di dato che __non sono mutabili__

--

* ### __non cambia il valore di variabili__ definite fuori dallo scope in esecuzione (_funzioni pure_)

--

* ### Ogni chiamata succesiva a __una stessa funzione__, con gli stessi argomenti, __produce lo stesso output__

???

torniamo indietro per l'occhio poco attento


---

class: middle

# Array methods(1)

```js
const source = ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13']

const result = source
  .map(x => parseInt(x)) // applica la funzione parseInt a ogni elemento
  //.filter(x => !isNaN(x))
  //.reduce((x, y) => x + y)

console.log(result)

// logs: [1, 1, NaN, 2, 3, 5, NaN, 8, 13]

```

---

class: middle

# Array methods(2)

```js
const source = ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13']

const result = source
  .map(x => parseInt(x))
  .filter(x => !isNaN(x)) // filtra solo quelli che sono numeri
  //.reduce((x, y) => x + y)

console.log(result)

// logs: [1, 1, 2, 3, 5, 8, 13]

```

---

class: middle

# Array methods(3)

```js
const source = ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13']

const result = source
  .map(x => parseInt(x))
  .filter(x => !isNaN(x))
  .reduce((x, y) => x + y) // addiziona tutti gli elementi

console.log(result)

// logs: 33

```

---

class: center, middle

# 2. Che cos'è RxJS?

--

### ReactiveX è una **libreria** per comporre _programmi asincorni ed "event-based"_, usando una sequenza "**osservabile**" di **valori**.

???

Il fatto che sia una sequenza ci permette di manipolare i dati che vi sono racchiusi come se fossero array, cioè strutture dati a cui siamo abituati.

---

class: middle

# Reactive Programming

.center[### "Programming with __asynchronous observables data streams__"]

.right[_André Staltz_]

???

Uno __stream__ è una __sequenza__ di eventi __ordinati__ nel tempo.

---

# ReactiveX

### http://reactivex.io/

* ### specifiche reactive
* ### implementazioni nei principiali linguaggi ( > 15) e piattaforme
* ### noi ci occuperemo di __RxJS__

---

class: center, middle

# 3. Composizione ed esecuzione di uno stream

---

class: middle

# Uno _stream_ è composto da:

* `Observable`
* `Operators`
* `Subscription`

--

### Uno stream si basa, quindi, su **flussi di dati** emessi, sugli **operatori** per modificarli e gli **observer** che li ascoltano.

---

# Observable

--

* __oggetto__ (javascript) che possiede dei metodi (chiamati __operatori__) e delle proprietà

--

* emettitore di eventi o valori in un certo lasso di tempo

--

* creato a partire da strutture "simili" (isomorfe)

--

```
const numberStream = Observable.of(1, 2, 3, 4, 5, 6, 7, 8)
numberStream.subscribe({
  next(x) { console.log(x) },
  error(e) { console.error(e) },
  complete() { console.log('done') }
})
// => 1
// => 2
// => 3
// => 4
// => 5
// => 6
// => 7
// => 8
// => done
```

???

esempi della creazione da zero di obeservable

domanda chi sa cos'è un isomorfismo: esempio con .fromPromise() e .toPromise() o .from(Array) e .toArray()
isomorfismo: corrispondenza biunivoca fra due insiemi.

array, promise

---

# Operators

### - sono __ metodi__ che si applicano a uno stream
### - possono essere __concatenati__ se è necessario applicare più di un operatore
### - ogni __operatore modifica__ lo stream dei valori emmessi dall'operatore che lo precede
### - ogni operatore produce un __nuovo Observable__ (stream)

???

nota su **modifica**: non modifica il valore ma ne emmette uno nuovo a cui viene applicata la trasformazione/filtro/ecc...

esempio con un observable "spezzato"

---
# Operators(2)

### API prende spunto dai metodi degli array

```
const array$ = Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9])
array$
  .map(x => x * 2)
  .filter(x => x > 6)
  .subscribe(x => console.log(x))

// 8
// 10
// 12
// 14
// 16
// 18
```

---

# Observer (o subscriber)

* ### Possiede **tre metodi**: prossimo elemento, errore, fine dello stream

```js
const example$ = Observable.create(observer => observer.next(1))
const observer = {
* next: next => {
    console.log(next)
  },
* error: err => {
    console.log(err)
  },
* complete: () => {
    console.log('done')
  }
}
example$.subscribe(observer)
```

* ### E' un **Oggetto javascript** passato come argomento a `.subscribe()`

???

sinonimo di Subscriber

---

# Esecuzione di uno stream

* ### Comicncia solo quando **invochiamo** il methodo `.subscribe(observer)`

--

* ### Vengono eseguiti in **sequenza** ordinata tutti gli operatori

--

* ### Ogni operatore torna un **nuovo Observable**

--
  * ### Eccetto `.subscribe()`!

???

esempio togliendo e mettendo il subscribe

---

class: middle

# Unsubscribe

```js
const randomNumber$ = Observable.create((observer) => {
  const id = setInterval(() => {
    observer.next(Math.random())
  }, 500)
* return () => clearInterval(id)
})

const sub = randomNumber$.subscribe({
  next(x) { console.log(x) },
  error(e) { console.error(e) },
  complete() { console.log('done') }
})

setTimeout(() => {
* sub.unsubscribe()
}, 2000)

// 0.10430196667680214
// 0.4141351814554881
// 0.5761438321958294
```

---

class: middle

# Più di una subscription

```js
const array$ = Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9])
  .map(x => x * 2)
  .filter(x => x > 6)

array$
* .subscribe(x => console.log(`First: ${x}`))
array$
* .subscribe(x => console.log(`Second: ${x}`))

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
```

---

class: middle

# Gli stream si possono comporre

```js
const array$ = Observable.from([1, 2, 3, 4])

const array2$ = Observable.from([ 5, 6, 7, 8, 9])

array$
* .merge(array2$)
  .subscribe(x => console.log(`First: ${x}`))

// First: 1
// First: 2
// First: 3
// First: 4
// First: 5
// First: 6
// First: 7
// First: 8
// First: 9
```

---

class: middle

# Gli stream si possono anche spezzare

```js
const array$ = Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9])

*const [evens, odds] = array$.partition(val => val % 2 === 0)

const subscribe = Observable.merge(
  evens
    .map(val => `Even: ${val}`),
  odds
    .map(val => `Odd: ${val}`)
  ).subscribe(val => console.log(val))
```

---

class: middle

.center[
# HOT VS COLD 
]

* ### __COLD__: Observable che cominciano l'esecuzione dopo che viene invocato il metodo subscribe
* ### __HOT__: Observable che producono i valori anche prima che ci sia una subscription attiva in ascolto

???

hot -> per esempio i click del mouse

Uso del metodo publish crea un istanza di ConnectableObservable. Abbiamo la necessità di chiamare esplicitamente connect per cominciare a fare il broadcasting di valori.

---

# Cold


### A ogni `.subscribe()` corrisponde una nuova esecuzione.

--

```js
const obs = Observable.create(observer => {
  observer.next(1)
  setTimeout(() => {
    observer.next(2)
    setTimeout(() => {
      observer.complete()
    }, 1000)
  }, 1000)
})

*obs.subscribe(
  v => console.log("1st subscriber: " + v),
  err => console.log("1st subscriber error: " + err),
  () => console.log("1st subscriber complete ")
)
setTimeout(() => {
* obs.subscribe(
    v => console.log("2nd subscriber: " + v),
    err => console.log("2nd subscriber error: " + err),
    () => console.log("2nd subscriber complete ")
  )
}, 2000)
```

???

35_cold.js

---

# Hot

### L' esecuzione è condivisa tra tutti gli observer.

```js
const obs = Observable
  .interval(1000)
* .publish()

*obs.connect() // avvia l'esecuzione, è come chiamare .subscribe su un cold

setTimeout(() => {
  obs.subscribe(v => console.log("1:" + v))
  setTimeout(
    () => obs.subscribe(v => console.log("2:" + v)), 1000)
}, 2000)

// 1:1
// 1:2
// 2:2
// 1:3
// 2:3
// 1:4
// 2:4
// ...
```

---

class: center, middle

# 4. Marble Diagram

---

# Marble Diagram

--

### I marble diagram sono il modo che abbiamo di **rappresentare in modo visivo** gli stream reattivi di dati (asincroni).

--

### In un marble diagram, **l'asse X rappresenta il tempo**. 

--

### **L' asse Y invece rappresenta i diversi observable** che interagiscono tra di loro, anche tramite operatori.

---

# Marble diagrams (ASCII form)

--

* ### Il **tempo** è rappresentato da: ------

--

* ### I **valori** sono rappresentati da: [0-9] oppure [a-z]

--

* ### Il **completamento** è rappresentato da: |

--

* ### L'eccezione è rappresentata da: X

---

class: middle

# Marble Diagram di map

```
first:  ---0---1---2---3-|

operator:  map( x => x * 2)

second: ---0---2---4---6-|
```

* ### _First_ è lo stream in **input**
* ### _Second_ è lo stream in **output**
* ### _Operator_ indica il **metodo applicato**

---

class: center, middle

# 5. Obsevable Operators

---

# Catergorie di Operatori

* Creation
* Transformation
* Filtering
* Combination
* Multicasting
* Error Handling
* Utility
* Conditional and Boolean
* Mathematical and Aggregate

_**9 categorie** diverse e più di **120 operatori** totali_

???

Nota bene: anche gli operatori costruiscono nuovi obseravable

---
class: center, middle

# 120?????

<!--![flower cat](http://officetan.com/wp-content/uploads/2015/06/Screen-shot-2015-06-26-at-7.51.07-AM-710x360.png)-->
![flower cat](https://i.giphy.com/media/5e6Y1YvmNSgi4/giphy.webp)

???

Io stesso non li ho usati tutti. Ce ne sono di famosi e di meno famosi

---

class: middle, center

# Creation Operators

---

# create

#### `create(subscribe: (observer) => subscription): Observable<T>`

--

* ### Crea un Observable dalla funzione subscribe, passata come parametro.

--

* ### Alias del costruttore 

???

mostra il codice

---

# from

#### `from(ish: ObservableLike<T>): Observable<T>`

--

* ### Facade per creare Observable

--
  * Array

--

  * array-like object

--

  * Promise

--

  * iterabli

--

  * Observable

---

# fromPromise e fromEvent

--

* ### Crea un observable a partire da una Promise.

#### `fromPromise(promise: Promise): Observable`

--

* ### Crea un observable a partire da un evento.

#### `fromEvent(target: EventTargetLike, eventName: string): Observable`

---

# interval

#### `interval(period: number): Observable`

--

### Crea un Observable che emmette valori ogni 'period' (ms)

---

# of

#### `of(...values): Observable`

--

### Crea un Observable i cui valori sono i suoi argomenti e completa immediatamente.

???

* __empty__: Crea un observable che non emmette valori e che emmette subito complete
* __never__: Observable che non emmette mai valori
* __timer__: Comincia ad emettere valori dopo un certo periodo di tempo e continua ad emetterli con lo stesso intervallo
* __defer__: Ritarda la creazione del Observable alla prima subscribtion, creandone uno nuovo per ogni subscribe 
* __throw__: Emmette immediatamente un errore
* __range__: Creates an Observable that emits a sequence of numbers within a specified range.
can call obs.next, obs.error, obs.complete ---

---

class: middle, center

# Operators

---

# _Operatori Famosi_

```js

  //Combination
  .concat
  .concatAll
  .merge
  .mergeAll
  .zip

  // Transformation
  .scan
  .buffer
  .map/.mapTo
  .groupBy
  .mergeMap
  .switchMap

  // Filtering
  .filter
  .first/.last
  .take
  .skip
  .throttle
```

---

# concat

#### `concat(observables: ...*): Observable`

### Al **completamento** del primo observable, viene **concatenato il secondo**, al quale viene passato lo stesso subscribe.

```
first   --0--1--2--3|

second (a|)

          first.concat(second)

result  a-0--1--2--3|
```

---

# merge

#### `merge(input: Observable): Observable`

### Unisce più Observable in un unico Observable.

```
first:  ----0----1----2----(3|)

second: --0--1--2--3--(4|)

            first.merge(second)

result: --0-01--21-3--(24)-(3|)
```

---

# zip

#### `zip(observables: *): Observable`

### Zip sottoscrive tutti gli observable che gli vengono passati come argomenti. Appena viene emesso un valore da ognuno di loro, zip **emette un array contentente i valori** emessi dagli singoli observable.

```
first:  ----0----1----2----(3|)

second: --0--1--2--3--(4|)

            Observable.zip(first, second)
            
result: ----00---11---22----33|
```

---

# switch

#### `switch(): Observable`

### Fa in modo che il subscribe sia fatto solo sul Observable emesso come ultimo.

```
first:  -0--1--2-..

second: ---------1-2-3-4-5

            switch()
            
result: ---------1-2-3-4-5
```

---

# map (mapTo)

#### `map(project: Function, thisArg: any): Observable`

### Applica la funzione a ogni valore emesso dall'Observable.

```
first:  ---0---1---2---3-|

operator:  map( x => x * 2)

second: ---0---2---4---6-|
```

---

# filter

#### `filter(select: Function, thisArg: any): Observable`

### Emette solo i valori che passano la condizione.

```
first:  --0--1--2--3--4--5--6--7-

          filter(x => x % 2 === 0)

result: --0-----2-----4-----6----
```

---

# Altri operatori di filtering

--

### `take(count: number): Observable`

--

### `first(predicate: function, sel: function)`

--

### `skip(the: Number): Observable`

--

### `last(predicate: function): Observable`

???
tutti questi operatori alla fine completano

---

# debounce

#### `debounce(durationSelector: function): Observable`

### Scarta i valori che sono stati emessi in un tempo minore rispetto a quello specificato. 

```
--0--1--2--3--4|

  debounceTime(1000) // simile a debounce

-------------------------4|
```

---

# throttle

#### `throttle(duration: function(value): Observable | Promise): Observable`

### Emette valori solo quando è passata la durata specificata.

```
--0--1--2--3--4|

  throttleTime(1000)

--0-----2-----4|
```

???

debounceTime(1000) // waits for silence, then emits
throttleTime(1000) // first emits, then causes silence

---

# scan

#### `scan(accumulator: function, seed: any): Observable`

### Riduce i valori emessi nel tempo fino a che non viene emesso il complete.

```
-----h-----e-----l-----l-----o|

  scan((acc, x) => acc+x, '')

-----h-----(he)--(hel)-(hell)(hello|)
```

---

# buffer

#### `buffer(closingNotifier: Observable): Observable`

### Aggrega i valori emesssi finchè l'observable passato come argomento non emette. Emette un array.

```
-----h-----e-----l-----l-----o|

        bufferCount(2)

-----------he----------ll----o|
```

---

# do

#### `do(nextOrObserver: function, error: function, complete: function): Observable`

### Esegue le funzioni passate come argomenti senza modificare in alcun modo l'observable in ingresso.

```
---0---1---2---3--...

  do(x => console.log(x))

---0---1---2---3--...
```

???

Ottimo per i side effect, come il logging.

---

# share

#### `share(): Observable`

### Condivide l'Observable sorgente con più subscriber.

--

### è uguale a `publish().refCount()`

--

### E' un multicast operator.

---

class: middle

.center[
# 6. Subjects
]

---

# Subject

* ### E' un observable: possiede tutti gli operatori
* ### E' un observer: quando viene usato come subscription emette i valori che gli vengono passati nel next
* ### Può usare il multicast: se passato nel subscribe viene aggiunto alla lista di observer
* ### Quando è completo, in errore o non più subscribed  non può più essere usato
* ### Può passare valori a se stesso chiamando la sua funzione next 

---

# Subject vs Observable

### La differenza più grande tra Subject e Observable è che il Subject ha uno stato interno: salva la lista degli observers.

--

```js
const tick$ = Observable.interval(1000);
const subject = new Subject();

subject.subscribe(observer1);
subject.subscribe(observer2);

tick$.subscribe(subject);
```

--

### In questo esempio vediamo che tick$ viene multicastato in due observer distinti. Questo è l'uso primario che ha il Subject in Rx.

---

class: middle, center

# Il **Subject** è, quindi, un **proxy/bridge**.

---

# BehaviorSubject (the current value)

* ### Rappresenta valori che cambiano nel tempo
* ### Ogni BehaviorSubject ha un valore iniziale oppure l'ultimo valore emesso

--

### Nei **Service** di Angular si usa spesso il behavior subject per la gestione dei dati. Infatti, il servizio spesso si inzializza prima del component e il behavior subject ci garantisce che ci sarà un valore inziiale che poi verrà aggiornato appena ce ne sarà disponbile uno più recente.

---

class: middle

.center[
# 7. Higher Order Observables
]

---

# Higher Order Observables

???

Ci capita a volte che gli operatori che usiamo tornino un observable di observable. In questo caso ce ne facciamo poco, dal momento che per avere i valori dell'observable dovremmo usare un subscribe su ciascuno di loro. Fare un subscribe in un subscribe considerato una badpractice perché facilmente ci si dimentica

--

```js
const numObservable = Rx.Observable.interval(1000).take(4)

const higherOrderObservable = numObservable
  .map(x => Rx.Observable.of(1,2))

higherOrderObservable
  .subscribe(obs =>s
*   obs.subscribe(x => console.log(x))
  )

```

--

```js
const clickObservable = Rx.Observable
  .fromEvent(document, 'click')

const clockObservable = clickObservable
  .map(click => Rx.Observable.interval(1000))

clockObservable
  .subscribe(clock =>
*   clock.subscribe(x => console.log(x))
  )
```

???


dobbiamo fare un subscribe dentro a un subscribe e inoltre dovremmo tenerci tracia di ogni subscription fatta per poter fare unsubscribe successivamente, se vogliamo **evitare leak**

---

# Flattening operators

* ### Si applicano ad **Observable di Observable**
* ### Tornano i **valori** dell'Observable interno, rispettandone il tipo

--

```
in:     Observable<Observable<number>>
method:       flatten()
out:    Observable<number>
```

???

Sono operatori che vengono applicati ad Observable di Observable con un tipo e tornano solo un observable con i valori dello stesso tipo.

---

# Esempio con switch

```javascript
const clickObservable = Rx.Observable
  .fromEvent(document, 'click')

const clockObservable = clickObservable
  .map(click => Rx.Observable.interval(1000))
* .switch() 

// a: --------+--------+------------------------
//            \        \
//            -0-1-2-3 -0-1-2-3-4-5-6
         
//          switch(a, b)
         
// b: ---------0-1-2-3--0-1-2-3-4-5-6

clockObservable
  .subscribe(x => console.log(x))
```

???

Lo switch in questo caso fa il flattening

---

# Esempio con mergeAll

```javascript
const clickObservable = Rx.Observable
  .fromEvent(document, 'click')

const clockObservable = clickObservable
  .map(click => Rx.Observable.interval(1000))
* .mergeAll(3)

// --------+--------+------------------------
//         \        \
//          -0-1-2-3 -0-1-2-3-4-5-6
         
//          mergeAll
         
// ----------0-1-2-3-405162738495...

clockObservable
  .subscribe(x => console.log(x))
```

???

Il mergeAll, al contrario di switch, lascia tutte le subscription fino a quel momento e ne aggiunge altre per ogni nuovo valore del observable in ingresso. Come argomento prende il numero massimo di observable contemporanei in esecuzione.

---
# Esempio con concatAll

```js
const clickObservable = Rx.Observable
  .fromEvent(document, 'click')

const clockObservable = clickObservable
  .map(click => Rx.Observable.interval(1000).take(5))
* .concatAll() // megeAll(1)

// --------+--------------+-+----
//         \        
//          -0-1-2-3-4|
         
//          concatAll
         
// ----------0-1-2-3-4-----0-1-2-3-4--0-1-2-3-4

clockObservable
  .subscribe(x => console.log(x))
```

???

__Concatall__ è come mergeAll(1), tiene la memoria dell'ultimo observable aggiunto se sta già emittando uno, e in caso una volta che è completo avvia con il prossimo.

---
# Operatori composti

### `.map()` + `.concatAll()` = `.concatMap()`

--

### `.map()` + `.mergeAll()` = `.mergeMap()` // (`flatMap`)

--

### `.map()` + `.switch()` = `.switchMap()`


???

Dal momento che spesso ci troviamo ad eseguire il map per elaborare il nostro stream, che può tornare un higher order observable, ci sono degli shortcut che ci permettono di usare un solo operatore invece di concatenarne due

---

# switchMap

```javascript
const clickObservable = Rx.Observable
  .fromEvent(document, 'click')

function performRequest() {
  return fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(res => res.json())
}

// Observable<Event> ---> Observable<Response>
const responseObservable = clickObservable
* .switchMap(click => performRequest())

// switchMap = map ... + ... switch

responseObservable
  .subscribe(x => console.log(x.email))
```

???

 
__SwitchMap__ esegue contemporaneamente sia il .map che lo .switch, quindi ci riporta da un higherorder a uno di firstorder mappando nel contempo. **1 request, con la precedente "cancellata"**

 Occhio attento ha notato che switchMap è capce di convertire da sola promise in valori(grazie all'isomorifsmo promise->observable)

---
# mergeMap

```javascript
const clickObservable = Rx.Observable
  .fromEvent(document, 'click')

function performRequest() {
  return fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(res => res.json())
}

const emailObservable = clickObservable
* .mergeMap(click => performRequest(), 
           (click, res) => res.email,
           3)

// mergeMap = map ... + ... mergeAll

emailObservable
  .subscribe(email => console.log(email))
```

???

__MergeMap__ concurrent request ha anche l'alias .flatMap

---
# concatMap

```javascript
const clickObservable = Rx.Observable
  .fromEvent(document, 'click')

function performRequest() {
  return fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(res => res.json())
}

const emailObservable = clickObservable
* .concatMap(click => performRequest(), 
             (click, res) => res.email)

// concatMap = map ... + ... concatAll

emailObservable
  .subscribe(email => console.log(email))
```

???

serial request

---

# Esempio di typeahead

```js
const obs1 = Observable.fromEvent(input, 'keyup')
	.map(e => e.target.value)
	.filter(value => value.length > 2)
	.distinctUntilChanged()
	.debounceTime(500)
	.mergeMap(word => this.http.get('...')) // Angular 2 http observable
	.retry(2)
	.subscribe(res => console.log(res))
```

???

distinctUntilChanged controlla con === quindi nel caso di oggetti devono puntare allo stesso reference

<!-----

# Risorse
.center[
### [RxMarbles](http://rxmarbles.com/) 
### [Egghead.io](http://egghead.io/) 
### [Learnrxjs](https://www.learnrxjs.io/) 
]-->

---
class: center, middle

# Grazie!

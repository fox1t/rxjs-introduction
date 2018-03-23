
class: center, middle

# Reactive Functional Programming

.center[
<img src="img/Rx_Logo_S.png" style="width: 100px"/>
]

---

# Who am I?

<div style="margin-top: 100px">
.left-column.center[
## Maksim Šinik
]

.right-column[
- Software Architect
- Functional Programming enthusiast
- DevOps and Cloud lover
- Fullstack developer
]
</div>

.center[
.left-column[<img src="img/twitter.png" style="width: 100px; margin-top: 50px"/>
#### [@maksimsinik](http://twitter.com/maksimsinik)]
.right-column[<img src="img/linkedin.png" style="width: 100px; margin-top: 50px"/>
#### [maksimsinik](https://www.linkedin.com/in/maksimsinik)]
]

---
<div style="margin-top: 100px">
.left-column[# <span style="color: #EC0C8E">Agenda</span>]
.right-column[
1. Functional Reactive Programming
2. RxJS
3. Composizione ed esecuzione di uno stream
4. Marble Diagrams
5. Obsevable Operators
6. Subjects
7. Higher Order Observables
]
</div>

---

class: center, middle

## <span style="color: #EC0C8E">**Functional** </span> Programming + <span style="color: #EC0C8E">**Reactive**</span> Programming

---

# <span style="color: #EC0C8E">Functional Reactive</span> Programming

* ### FRP è un __paradigma di programmazione__ che permette di gestire un __flusso di dati asincrono__ 
* ### molto usata nella programmazione di __interfacce grafiche__, in robotica e in musica
* ### ha come scopo quello di rendere più semplice la modellazione degli __eventi che si succedono nel tempo__.

???

* servendosi dei capisaldi della __programmazione funzionale__ (ad esempio dei metodi `map, reduce, filter`)
* imutabilità, higher order functions, strutture monadiche

---

class: center

# Callback

### "Una <span style="color: #EC0C8E">__funzione__</span> che viene passata come <span style="color: #EC0C8E">__parametro__</span> ad un' altra funzione, dalla quale verrà eseguita."

--

.half-column.half-column-with-margin-right[
  ###<span style="color: #EC0C8E">__sync__</span>

.code-align-left[
```js
const hi = (who) =>
  { console.log('hi ' + who) }

const hiAll = (salute) =>
  salute('all!')

console.log(hiAll(hi)) // hi all!
```
]
]

--

.half-column.half-column-with-margin-left[
  ###<span style="color: #EC0C8E">__async__</span>

.code-align-left[
```js
const hi = (who) => 
  { console.log('hi ' + who) }

const hiAll = (salute) => 
  { setTimeout(salute, 2000, 'all!') }

hiAll(hi) // hi all! after 2000 ms
```
]
]

???

* o un "blocco di codice"
* higher order function <--
* Parla in modo generico di cosa sono le callback.
  * esempio con Array.prototype.forEach <- callback sincrona
  * esempio con promise e fa vedere che ci sono 2 callback, una per l'errore e una per il successo, esempio di quasi monade
  * esempio finale con gli straeam di nodejs che hanno 3 callback: next, error, done

---
class: center

# __Imperative__ vs __Declarative__

.half-column.center[
## <span style="color: #EC0C8E">Imperativo</span>
_Paradigma di programmazione_ nel quale un programma viene inteso come un <span style="color: #EC0C8E">__insieme di istruzioni__</span>, ciascuna delle quali può essere pensata come un "__ordine__" che viene impartito (__"il come"__).  
]

.half-column.center[
## <span style="color: #EC0C8E">Dichiarativo</span>
_Paradigma di programmazione_ che si focalizza sulla <span style="color: #EC0C8E">__descrizione__</span> delle proprietà della soluzione desiderata (__il cosa__), lasciando __indeterminato__ l'algoritmo da usare per trovare la soluzione (__il come__).
]


---
class: center

## <span style="color: #EC0C8E">__Imperativo__</span>
.code-align-left[
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
]

--

## <span style="color: #EC0C8E">__Dichiarativo__</span> (_Funzionale_)
.code-align-left[
```js
const doubleMap = numbers => numbers.map(n => n * 2)

console.log(doubleMap([2, 3, 4])) // [4, 6, 8]

```
]

???
* perché dichiarativo e funzionale sono quasi sinonimi

---

# <span style="color: #EC0C8E">__Functional__</span> Programming
--

* ### è un paradigma di pogrammazione <span style="color: #EC0C8E">__dichiarativo__</span>

--

* ### il programma è l'__esecuzione__ di una serie __di <span style="color: #EC0C8E">funzioni__</span>

--

* ### usa tipi di dati <span style="color: #EC0C8E">__non mutabili__</span>

--

* ### <span style="color: #EC0C8E">__non muta il valore di variabili__</span> definite fuori dallo scope in esecuzione (_funzioni pure_)

--

* ### Ogni chiamata successiva a <span style="color: #EC0C8E">__una stessa funzione__</span>, con gli stessi argomenti, <span style="color: #EC0C8E">__produce lo stesso output__</span>

???

* torniamo indietro per l'occhio poco attento
* parliamo di scope delle funzioni


---

class: middle

# <span style="color: #EC0C8E">Array methods</span>: map

* ### <span style="color: #EC0C8E">Preserva</span> la __struttura dati__
* ### <span style="color: #EC0C8E">Preserva</span> la __cardinalità__

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

# <span style="color: #EC0C8E">Array methods</span>: filter

* ### <span style="color: #EC0C8E">Preserva</span> la __struttura dati__
* ### <span style="color: #EC0C8E">Non garantisce</span> la preservazione della __cardinalità__

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

# <span style="color: #EC0C8E">Array methods</span>: reduce

* ### <span style="color: #EC0C8E">Non garantisce</span> la preservazione della __struttura dati__
* ### <span style="color: #EC0C8E">Non garantisce</span> la preservazione della __cardinalità__

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

# <span style="color: #EC0C8E">__RxJS__</span>

---
class: center, middle
# <span style="color: #EC0C8E">__ReactiveX__</span>

### __ReactiveX__ è una <span style="color: #EC0C8E">__libreria__</span> per comporre _programmi asincroni ed "event-based"_, usando una <span style="color: #EC0C8E">sequenza "**osservabile**" di **valori**</span>.

???
* parallelismo con gli array
* il fatto che sia una sequenza ci permette di manipolare i dati che vi sono racchiusi come se fossero array, cioè strutture dati a cui siamo abituati.

---

class: middle

# <span style="color: #EC0C8E">Reactive</span> Programming

.center[### "Programming with __asynchronous observables data streams__."]

.right[_André Staltz_]

---
class: center, middle

# <span style="color: #EC0C8E">__Stream__</span>

### Uno __stream__ è una <span style="color: #EC0C8E">__sequenza__</span> di <span style="color: #EC0C8E">eventi __ordinati__</span> nel tempo.

---

# <span style="color: #EC0C8E">ReactiveX</span>

### http://reactivex.io/

* ### specifiche reactive
* ### implementazioni nei principali linguaggi ( __> 15__) e piattaforme
* ### noi ci occuperemo di <span style="color: #EC0C8E">__RxJS__</span>

---

class: center, middle

# Composizione ed esecuzione di uno <span style="color: #EC0C8E">stream</span>

---
# <span style="color: #EC0C8E">Composizione</span>

.half-column[### Uno _stream_ è <span style="color: #EC0C8E">composto</span> da:

* ### Observable
* ### Operators
* ### Subscription
]

--

.half-column[

### Uno _stream_ <span style="color: #EC0C8E">si basa</span> su: 
* ### <span style="color: #EC0C8E">**flussi di dati**</span> emessi
* ### <span style="color: #EC0C8E">**operatori**</span> per modificarli
* ### gli <span style="color: #EC0C8E">**observer**</span> che li ascoltano.
]

---

# Observable

--

* <span style="color: #EC0C8E">__oggetto__</span> (JavaScript) che possiede dei <span style="color: #EC0C8E">__metodi__</span> (chiamati <span style="color: #EC0C8E">__operatori__</span>) e delle proprietà

--

* <span style="color: #EC0C8E">__emettitore di__</span> eventi o <span style="color: #EC0C8E">__valori__</span> in un certo lasso di tempo

--

* creato a partire da <span style="color: #EC0C8E">__strutture dati "simili"__</span> (isomorfe)

--

```js
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

* ### sono <span style="color: #EC0C8E">__ metodi__</span> che si applicano a uno stream

--

* ### possono essere <span style="color: #EC0C8E">__concatenati__</span> se è necessario applicare più di un operatore allo stesso stream

--

* ### ogni <span style="color: #EC0C8E">__operatore altera__</span> lo stream dei valori emmessi dall'operatore che lo precede

--

* ### ogni operatore produce un <span style="color: #EC0C8E">__nuovo Observable__</span>

???

nota su **altera**: non modifica il valore ma ne emmette uno nuovo a cui viene applicata la trasformazione/filtro/ecc...

esempio con un observable "spezzato"

---
# Operators <span style="color: #EC0C8E">API</span>

## API prende spunto dai <span style="color: #EC0C8E">metodi degli array</span>

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

# Observer (o <span style="color: #EC0C8E">subscriber</span>)

* ### <span style="color: #EC0C8E">**Oggetto javascript**</span> passato come argomento a _.subscribe()_

* ### Possiede <span style="color: #EC0C8E">**tre metodi**</span> che permettono di gestire i tre casi possibili: prossimo elemento, errore, fine dello stream


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


???

* observer è sinonimo di Subscriber

---

# <span style="color: #EC0C8E">__Esecuzione__</span> di uno stream

* ### Comincia solo quando <span style="color: #EC0C8E">**invochiamo**</span> il metodo _.subscribe(observer)_
* ### Vengono eseguiti in <span style="color: #EC0C8E">**sequenza** ordinata</span> tutti gli operatori
* ### Ogni metodo (step di esecuzione) torna un <span style="color: #EC0C8E">**nuovo Observable**</span>

--
  * ### <span style="color: #EC0C8E">Eccetto</span> `.subscribe()`!

???

* lazy computation
* differenza con le promise che invece sono eager
* esempio togliendo e mettendo il subscribe

---

# __Unsubscribe__

### Il metodo _.subscribe_() torna un <span style="color: #EC0C8E">reference alla subscription</span>.

--

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

???

* E'importante notare come sia assolutamente necessario tenere traccia di questo reference, nel caso si voglia smettere di ascoltare lo stream e quindi permettere al GC di liberare memoria
* Se ci sono troppi unsubscribe in giro per il codice è sintomo che si sta usando rxjs "in modo imperativo"

---

# __<span style="color: #EC0C8E">Più</span> subscription__

### Uno stesso observable _(stream)_ può avere <span style="color: #EC0C8E">"infiniti" subscribe</span>.

--

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

# __<span style="color: #EC0C8E">Composizione</span> di stream__

### Esistono operatori che <span style="color: #EC0C8E">"agiscono"</span> su più Observable contemporaneamente.

--

```js
const array$ = Observable.from([1, 2, 3, 4])

const array2$ = Observable.from([ 5, 6, 7, 8, 9])

array$
* .merge(array2$)
  .subscribe(x => console.log(`Merged: ${x}`))

// Merged: 1
// Merged: 2
// Merged: 3
// Merged: 4
// Merged: 5
// Merged: 6
// Merged: 7
// Merged: 8
// Merged: 9
```

---

# __<span style="color: #EC0C8E">Divisione</span> di stream__

### Altri permettono di <span style="color: #EC0C8E">"spezzare"</span> un Observable in diversi altri.

--

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
# <span style="color: #EC0C8E">__COLD__</span> vs <span style="color: #EC0C8E">__HOT__</span>
]

.half-column[
  * ### __COLD__: Observable che <span style="color: #EC0C8E">cominciano l'esecuzione dopo</span> che viene invocato il metodo subscribe
  ]

.half-column[
  * ### __HOT__: Observable che <span style="color: #EC0C8E">producono i valori anche prima che ci sia una subscription</span> attiva in ascolto
  ]

???

hot -> per esempio i click del mouse

Uso del metodo publish crea un istanza di ConnectableObservable. Abbiamo la necessità di chiamare esplicitamente connect per cominciare a fare il broadcasting di valori.

---

# __Cold__


### A ogni `.subscribe()` corrisponde una <span style="color: #EC0C8E">__nuova esecuzione__</span>.

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

# __Hot__

### L' esecuzione è <span style="color: #EC0C8E">__condivisa__</span> tra tutti gli observer.

--

```js
const obs = Observable
  .interval(1000)
* .publish() // ConnectableObservable

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

???

* publish torna un ConnectableObservable
* publish = multicast + Subject
* connect() ConnectableObservable subscribes to the source which starts emitting values
* share = publish().refCount()

---

class: center, middle

# __<span style="color: #EC0C8E">Marble</span> Diagram__

---
class: center, middle

# __<span style="color: #EC0C8E">Marble</span> Diagram__

### Sono il modo che abbiamo di **rappresentare in <span style="color: #EC0C8E">modo visuale</span>** gli stream reattivi di dati (asincroni).

--

### In un marble diagram, **<span style="color: #EC0C8E">l'asse X rappresenta il tempo</span>**.

--

### **L' asse <span style="color: #EC0C8E">Y rappresenta uno o più Observable</span>**, che interagiscono tra di loro tramite operatori.

---

# __Rappresentazione <span style="color: #EC0C8E">ASCII</span>__

--

* ### Il <span style="color: #EC0C8E">**tempo**</span> è rappresentato da: __------__

--

* ### I <span style="color: #EC0C8E">**valori**</span> sono rappresentati da: __[0-9] oppure [a-z]__

--

* ### Il <span style="color: #EC0C8E">**completamento**</span> di uno _stream_ è rappresentato da: __|__

--

* ### L'<span style="color: #EC0C8E">__eccezione__</span> è rappresentata da: __X__

---

# ACII Marble Diagram di <span style="color: #EC0C8E">_.map()_</span>

```bash
first:  ---0---1---2---3-|

operator:  map( x => x * 2)

second: ---0---2---4---6-|
```

--

* ### _First_ è lo stream in <span style="color: #EC0C8E">**input**</span>
* ### _Second_ è lo stream in <span style="color: #EC0C8E">**output**</span>
* ### _Operator_ indica il <span style="color: #EC0C8E">**metodo applicato**</span>

---

class: center, middle

# __Obsevable <span style="color: #EC0C8E">Operators</span>__

---

# __<span style="color: #EC0C8E">Catergorie</span> di Operatori__ 

* __Creation__
* __Transformation__
* __Filtering__
* __Combination__
* __Multicasting__
* __Error Handling__
* __Utility__
* __Conditional and Boolean__
* __Mathematical and Aggregate__

--

.center[
  ### _**<span style="color: #EC0C8E">9 categorie</span>** diverse e più di **<span style="color: #EC0C8E">120 operatori</span>** totali_
]

???

* Nota bene: anche gli operatori costruiscono nuovi obseravable

---
class: center, middle

# __<span style="color: #EC0C8E">120</span> operatori?????__

<!--![flower cat](http://officetan.com/wp-content/uploads/2015/06/Screen-shot-2015-06-26-at-7.51.07-AM-710x360.png)-->
![italian spiderman](https://media.giphy.com/media/6JIPmEt4KVaJq/giphy.gif)

???

Io stesso non li ho usati tutti. Ce ne sono di famosi e di meno famosi

---

class: middle, center

# __<span style="color: #EC0C8E">Creation</span> Operators__

---

# __`.`<span style="color: #EC0C8E">`create`</span>`()`__

#### `create(subscribe: (observer) => subscription): Observable<T>`

--

* ### Crea un Observable dalla <span style="color: #EC0C8E">funzione subscribe</span>, passata come parametro.

--

* ### Alias del <span style="color: #EC0C8E">costruttore</span> 

???

mostra il codice

---

# __`.`<span style="color: #EC0C8E">`from`</span>`()`__

#### `from(ish: ObservableLike<T>): Observable<T>`

--

### <span style="color: #EC0C8E">Facade</span> per creare Observable

--
  * Array

--

  * array-like object

--

  * Promise

--

  * Iterabili

--

  * Observable

---

# __`.`<span style="color: #EC0C8E">`fromPromise`</span>`()`__

#### `fromPromise(promise: Promise): Observable`

### Crea un observable a partire da una <span style="color: #EC0C8E">Promise</span>.

--
# __`.`<span style="color: #EC0C8E">`fromEvent`</span>`()`__

#### `fromEvent(target: EventTargetLike, eventName: string): Observable`

### Crea un observable a partire da un <span style="color: #EC0C8E">evento</span>.

---

# __`.`<span style="color: #EC0C8E">`interval`</span>`()`__

#### `interval(period: number): Observable`

--

### Crea un Observable che <span style="color: #EC0C8E">emmette valori ogni 'period'</span> (ms)

---

# __`.`<span style="color: #EC0C8E">`of`</span>`()`__

#### `of(...values): Observable`

--

### Crea un Observable i cui valori sono gli <span style="color: #EC0C8E">argomenti</span> passati e <span style="color: #EC0C8E">completa immediatamente</span>.

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

# __<span style="color: #EC0C8E">More</span> Operators__

---

# __Operatori <span style="color: #EC0C8E">Famosi</span>__

--

.center.left-column.column-30[
  ### Combination

  .concat()

  .concatAll()

  .merge()

  .mergeAll()

  .zip()
]

--

.center.left-column.column-30[
  ### Transformation
  .scan()

  .buffer()
  
  .map()

  .mapTo()

  .groupBy()

  .mergeMap()

  .switchMap()
]

--

.center.left-column.column-30[
  ### Filtering
  .filter()

  .first()

  .last()

  .take()

  .skip()

  .throttle()
]

---

# __`.`<span style="color: #EC0C8E">`concat`</span>`()`__

#### `concat(observables: ...*): Observable`

### Dopo il <span style="color: #EC0C8E">__completamento__</span> del primo observable, viene <span style="color: #EC0C8E">**concatenato il secondo**</span>.

```bash
first  (a|)
second   --0--1--2--3|


          first.concat(second)

result  a-0--1--2--3|
```

---

# __`.`<span style="color: #EC0C8E">`merge`</span>`()`__

#### `merge(input: Observable): Observable`

### <span style="color: #EC0C8E">__Unisce__</span> insieme più Observable, accorpando i valori.

```bash
first:  ----0----1----2----(3|)

second: --0--1--2--3--(4|)

            first.merge(second)

result: --0-01--21-3--(24)-(3|)
```

---

# __`.`<span style="color: #EC0C8E">`zip`</span>`()`__

#### `zip(observables: *): Observable`

### "Ascolta" tutti gli observable che gli vengono passati come argomenti e Appena viene emesso un valore da <span style="color: #EC0C8E">__ognuno__</span> di loro, zip <span style="color: #EC0C8E">__emette come valore un array contenente i valori__</span> emessi dagli singoli observable.

```bash
first:  ----0----1----2----(3|)

second: --0--1--2--3--(4|)

            Observable.zip(first, second)
            
result: ----00---11---22----33|
```

---

# __`.`<span style="color: #EC0C8E">`switch`</span>`()`__

#### `switch(): Observable`

### Fa il subscribe solo sul Observable che emette come <span style="color: #EC0C8E">ultimo</span>.

```bash
first:  -0--1--2-..

second: ---------1-2-3-4-5

            switch()
            
result: ---------1-2-3-4-5
```

---

# __`.`<span style="color: #EC0C8E">`map`</span>`()`__

#### `map(project: Function, thisArg: any): Observable`

### Applica la funzione a <span style="color: #EC0C8E">ogni valore emesso</span> dall'Observable.

```
first:  ---0---1---2---3-|

operator:  map( x => x * 2)

second: ---0---2---4---6-|
```

???
se si vuole mappare a una costante basta usare mapTo

---

# __`.`<span style="color: #EC0C8E">`filter`</span>`()`__

#### `filter(select: Function, thisArg: any): Observable`

### Emette solo i valori che <span style="color: #EC0C8E">passano la condizione</span>.

```
first:  --0--1--2--3--4--5--6--7-

          filter(x => x % 2 === 0)

result: --0-----2-----4-----6----
```

???

# Altri operatori di filtering
### `take(count: number): Observable`
### `first(predicate: function, sel: function)`
### `skip(the: Number): Observable`
### `last(predicate: function): Observable`
* tutti questi operatori alla fine completano

---

# __`.`<span style="color: #EC0C8E">`debounce`</span>`()`__

#### `debounce(durationSelector: function): Observable`

### <span style="color: #EC0C8E">Scarta i valori</span> che sono stati emessi in un <span style="color: #EC0C8E">tempo minore</span> rispetto a quello specificato dal secondo Observable. 

```bash
--0--1--2--3--4|

-------|

  debounce

--------1------2------4|
```
???

debounceTime(1000) // waits for silence, then emits
throttleTime(1000) // first emits, then causes silence
esiste un operatore più utile nella magior parte dei casi: debounceTime

---

# __`.`<span style="color: #EC0C8E">`throttle`</span>`()`__

#### `throttle(duration: function(value): Observable | Promise): Observable`

### Emette valori con la <span style="color: #EC0C8E">frequenza</span> specificata dal secondo Observable.

```bash
--0--1--2--3--4|

-----|

  throttle

--0-----2-----4|
```

???

debounceTime(1000) // waits for silence, then emits
throttleTime(1000) // first emits, then causes silence

---

# __`.`<span style="color: #EC0C8E">`scan`</span>`()`__

#### `scan(accumulator: function, seed: any): Observable`

### <span style="color: #EC0C8E">Accumula ed emette i valori</span> emessi nel tempo, fino al "complete".

```bash
-----h-----e-----l-----l-----o|

  scan((acc, x) => acc+x, '')

-----h-----(he)--(hel)-(hell)(hello|)
```

???

può essere visto come un reduce che emette i valori intermedi
It's like reduce, but emits the current accumulation whenever the source emits a value.

---

# __`.`<span style="color: #EC0C8E">`buffer`</span>`()`__

#### `buffer(closingNotifier: Observable): Observable`

### <span style="color: #EC0C8E">Aggrega i valori emessi</span> finchè l'observable passato come argomento non emette. _Emette array_.

```bash
-----h-----e-----l-----l-----o|

-----------1-----------2-----3|

        buffer

-----------he----------ll----o|
```

???

esiste anche buffercount(3, 2) che accumula il numero di valori specificato come argomento

---

# __`.`<span style="color: #EC0C8E">`do`</span>`()`__

#### `do(nextOrObserver: function, error: function, complete: function): Observable`

### Esegue le funzioni passate come argomenti <span style="color: #EC0C8E">senza modificare</span> l'Observable in ingresso. _Operatore di debugging_.

```bash
---0---1---2---3--...

  do(x => console.log(x))

---0---1---2---3--...
```

???

Ottimo per i side effect, come il logging.

---

# __`.`<span style="color: #EC0C8E">`share`</span>`()`__

#### `share(): Observable`

### Condivide l'Observable sorgente con più subscriber.

--

### è un <span style="color: #EC0C8E">alias</span> per 

`.multicast(() => new Subject()).refCount()`

--

### <span style="color: #EC0C8E">non è uguale</span> a

`.publish().refCount()`

--

### E' un <span style="color: #EC0C8E">multicast operator</span>.

???

This behaves similarly to .publish().refCount(), with a behavior difference when the source observable emits complete. .publish().refCount() will not resubscribe to the original source, however .share() will resubscribe to the original source. 
Observable.of("test").publish().refCount() will not re-emit "test" on new subscriptions, Observable.of("test").share() will re-emit "test" to new subscriptions.

---
# __`.`<span style="color: #EC0C8E">`pipe`</span>`()`__

--

* ### Introdotto in <span style="color: #EC0C8E">__RxJS 5.5__</span>

--

* ### Ci permette di usare gli operatori come fossero <span style="color: #EC0C8E">__funzioni pure__</span>: _lettable operators_

--

* ### Ci permette di scrivere <span style="color: #EC0C8E">__custom operators__</span>

* ### Ci permette di <span style="color: #EC0C8E">riusare</span> funzioni su diversi stream

---

# __Senza `.`<span style="color: #EC0C8E">`pipe`</span>`()`__

```
const source$ = Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9]);

source$
  .filter(x => x % 2)
  .map(x => x * 2)
  .scan((acc, next) => acc + next, 0)
  .startWith(0)
  .subscribe(console.log)
```

---
# __Con `.`<span style="color: #EC0C8E">`pipe`</span>`()`__

```
const { Observable } = require('rxjs/Rx')
const { filter, map, reduce } = require('rxjs/operators')
const { pipe } = require('rxjs/Rx')

const filterOutEvens = filter(x => x % 2)
const doubleBy = x => map(value => value * x)
const sum = reduce((acc, next) => acc + next, 0)
const source$ = Observable.range(0, 10)

source$
  .pipe(
    filterOutEvens, 
    doubleBy(2), 
    sum)
  .subscribe(console.log) // 50
```
---
class: middle

.center[
# __Subjects__
]

---
class: middle

.center[
# __Subjects__
]

* ### E' un <span style="color: #EC0C8E">observable</span>: possiede tutti gli operatori.

--

* ### E' un <span style="color: #EC0C8E">observer</span>: quando viene usato come subscriber emette i valori che gli vengono passati nel next.

--

* ### Può essere soggetto di <span style="color: #EC0C8E">multicast</span>: se passato al subscribe viene aggiunto alla lista di observer.

--

* ### Quando è <span style="color: #EC0C8E">completo</span>, in <span style="color: #EC0C8E">errore</span> o non più subscribed <span style="color: #EC0C8E">non può più essere riutilizzato</span>.

--

* ### Può <span style="color: #EC0C8E">passare valori a se stesso</span> chiamando la sua funzione next.

---

.center[
  # <span style="color: #EC0C8E">__Subject__</span> vs <span style="color: #EC0C8E">__Observable__</span>
]

### La principale differenza, è che il Subject ha uno <span style="color: #EC0C8E">stato interno</span>: salva la lista degli observers.

--

```js
const tick$ = Observable.interval(1000);
const subject = new Subject();

subject.subscribe(observer1);
subject.subscribe(observer2);

tick$.subscribe(subject);
```

### In questo esempio vediamo che tick$ viene "_multicastato_" in due observer distinti. 

--

### Questo è <span style="color: #EC0C8E">l'uso primario che ha il Subject</span>.

---

class: middle, center

# Il <span style="color: #EC0C8E">**Subject**</span> è, quindi, un <span style="color: #EC0C8E">**proxy**</span>/<span style="color: #EC0C8E">**bridge**</span>.

---

# <span style="color: #EC0C8E">Behavior</span>Subject (the current value)

* ### Utile per rappresentare valori che __cambiano nel tempo__
* ### Ogni BehaviorSubject __ha sempre un valore__:

  * __quello iniziale__
  * __l'ultimo valore emesso__

--

### NOTA: Nei <span style="color: #EC0C8E">**Service** di Angular</span> si usa spesso il __BehaviorSubject__ per la gestione dei dati. Infatti, il servizio spesso si inzializza prima del component e il behavior subject ci garantisce che ci sarà un valore iniziale che poi verrà aggiornato appena ce ne sarà disponibile uno più recente, "_pescato_" dal server.

---

class: middle

.center[
# __<span style="color: #EC0C8E">Higher Order</span> Observables__
]

---

class: middle

.center[
# __<span style="color: #EC0C8E">Higher Order</span> Observables__
]

```js
const numObservable = Rx.Observable.interval(1000).take(4)

const higherOrderObservable = numObservable
  .map(x => Rx.Observable.of(1,2))

higherOrderObservable
  .subscribe(obs =>s
*   obs.subscribe(x => console.log(x))
  )

```

???

Ci capita a volte che gli operatori che usiamo tornino un observable di observable. In questo caso ce ne facciamo poco, dal momento che per avere i valori dell'observable dovremmo usare un subscribe su ciascuno di loro. Fare un subscribe in un subscribe considerato una badpractice perché facilmente ci si dimentica di fare gli unsubscribe.

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


dobbiamo fare un subscribe dentro a un subscribe e inoltre dovremmo tenerci tracia di ogni subscription fatta per poter fare unsubscribe successivamente, se vogliamo **evitare memory leak**

---
class: middle
.center[
  # __<span style="color: #EC0C8E">Flattening</span> operators__
]

* ### Si applicano ad "**Observable di Observable**"
* ### Tornano i **valori** dell'Observable interno, rispettandone il tipo

```bash
in:     Observable<Observable<number>>
method:       flatten()
out:    Observable<number>
```

???

Sono operatori che vengono applicati ad Observable di Observable con un tipo e tornano solo un observable con i valori dello stesso tipo.

---

# __`.`<span style="color: #EC0C8E">`switch`</span>`()`__

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

# __`.`<span style="color: #EC0C8E">`mergeAll`</span>`()`__

```javascript
const clickObservable = Rx.Observable
  .fromEvent(document, 'click')

const clockObservable = clickObservable
  .map(click => Rx.Observable.interval(1000))
* .mergeAll(2)

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
# __`.`<span style="color: #EC0C8E">`concatAll`</span>`()`__

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
class: middle

.center[
  # __Operatori <span style="color: #EC0C8E">composti</span>__
]

### `map()` + `concatAll()` = `concatMap()`

### `map()` + `mergeAll()` = `mergeMap()/flatMap()`

### `map()` + `switch()` = `switchMap()`


???

Dal momento che spesso ci troviamo ad eseguire il map per elaborare il nostro stream, che può tornare un higher order observable, ci sono degli shortcut che ci permettono di usare un solo operatore invece di concatenarne due

---

# __`.`<span style="color: #EC0C8E">`switchMap`</span>`()`__

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

 Occhio attento ha notato che switchMap è capce di convertire da sola la promise in valori(grazie all'isomorifsmo promise->observable)

---
# __`.`<span style="color: #EC0C8E">`mergeMap`</span>`()`__

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
# __`.`<span style="color: #EC0C8E">`concatMap`</span>`()`__

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
class: middle

# __Esempio di <span style="color: #EC0C8E">typeahead</span>__

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

---

# Risorse
.center[
### [ReactiveX](http://reactivex.io/rxjs/identifiers.html) 
### [RxMarbles](http://rxmarbles.com/) 
### [Egghead.io](http://egghead.io/) 
### [Learnrxjs](https://www.learnrxjs.io/) 
]

---

class: center, middle

# Grazie!

<!-- ---
class: middle

# 1. FilterService: CREATE A PROVIDER

```js
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
@Injectable()
export class FilterService {
  constructor(private http: Http) {}
  getAll(id: number) {
    return this.http.get('http://jsonplaceholder.typicode.com/users');
  }
}
``` -->

<!-- ---
class: middle

# 2. <my-component>: INJECT THE PROVIDER

```js
import { Component } from '@angular/core';
import { FilterService } from './services/filter.service';
@Component({
  selector: 'my-component',
  template: ` <results [data]="list"></results> `
})
export class MyComponent {
  list: any[];      // Array of users
  constructor(filterSrv: FilterService) {
    filterSrv.getAll()
      .subscribe(res => this.list = res)
  }
}
``` -->

<!-- ---
class: middle

# 3. <results> component: display data

```js
import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
@Component({
  selector: 'results',
  template: `
    <h2>{{text}}</h2>
    <pre>{{data | json}}</pre>
  `
})
export class ResultsComponent implements OnChanges {
  @Input() data: any[];
  @Input() text: string;
  ngOnChanges(changes: SimpleChanges) {
    console.log ('CHANGES on ResultsComponent', changes)
    // i.e.: http.get('/api/).subscribe(res => ...)
  }
}
``` -->

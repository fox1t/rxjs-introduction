function callback() {
  console.log('Callback called!')
}

console.log('before')

setTimeout(callback, 1000) // try also with 0

console.log('after')
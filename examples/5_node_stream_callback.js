// we don't know how many chunks we will have in the steam

const readable = getReadbleStream() // fake function

function nextDataCallback(chunk) {
  console.log(`data: ${chunk}`)
}

function errorCallback(err) {
  console.log(`error: ${err}`)
}

function doneCallback() {
  console.log(`Steam is done.`)
}

readable.on('data', nextDataCallback)
readable.on('error', errorCallback)
readable.on('end', doneCallback)
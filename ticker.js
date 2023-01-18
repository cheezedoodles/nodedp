import { EventEmitter } from "events"

const DivisionError = new Error("Timestamp divisible by 5.")

function ticker(number, callback) {
  const emitter = new EventEmitter()

  recursion(number, emitter, 0, callback)

  return emitter
}

function recursion(number, emitter, ticks, callback) {
  if (Date.now() % 5 === 0) {
    nextTick(() => emitter.emit("error", DivisionError))
    return callback(DivisionError, ticks)
  }
  
  if (number <= 0) {
    return callback(null, ticks)
  }

  nextTick(() => emitter.emit("tick"))

  setTimeout(() => {
    emitter.emit("tick")
    return recursion(number - 50, emitter, ticks + 1, callback)
  }, 50)
}

ticker(1000, (err, ticks) => {
  if (err) {
    console.error(err)
  }
  console.log(`Emitted ${ticks} ticks`)
})
  .on("tick", () => console.log("Tick"))
  .on("error", console.error)
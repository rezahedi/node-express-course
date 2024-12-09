const EventEmitter = require('events');
const fileLogEmitter = new EventEmitter();

fileLogEmitter.on("created", (msg, fileName, userName) => console.log(msg, fileName, userName));
fileLogEmitter.on("published", (msg, fileName, userName) => console.log(msg, fileName, userName));
fileLogEmitter.on("moved", (msg, fileName, userName) => console.log(msg, fileName, userName));
fileLogEmitter.on("removed", (msg, fileName, userName) => console.log(msg, fileName, userName));

// emit events simulation
fileLogEmitter.emit("created", "File created", "file.txt", "Reza");
fileLogEmitter.emit("published", "File published", "john-data.txt", "John");
fileLogEmitter.emit("moved", "File moved", "financial_records.txt", "Sarah");
fileLogEmitter.emit("removed", "File removed", "emit-test.js", "David");


const fakeWaitTimerForEvent = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}
const doWait = async () => {
  await fakeWaitTimerForEvent()
  fileLogEmitter.emit("published", "File published", "john-data.txt", "John");
  await fakeWaitTimerForEvent()
  fileLogEmitter.emit("created", "File created", "file.txt", "Reza");
  await fakeWaitTimerForEvent()
  fileLogEmitter.emit("removed", "File removed", "emit-test.js", "David");
}
doWait()
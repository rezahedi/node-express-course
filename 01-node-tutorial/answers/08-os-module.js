const os = require('os')
const SECONDS_IN_HOUR = 60 * 60

console.log("Hostname: ", os.hostname())
console.log("Machine: ", os.machine())
console.log("Platform: ", os.platform())
console.log("Username: ", os.userInfo().username)
console.log("Uptime: ", Math.round(400 / SECONDS_IN_HOUR), "hours")
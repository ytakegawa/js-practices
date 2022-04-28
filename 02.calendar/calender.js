let argv = require('minimist')(process.argv.slice(2))


const year = argv.y ? argv.y : new Date().getUTCFullYear()
const month = argv.m ? argv.m : new Date().getMonth()
const firstDay = new Date(year, month, 1)
const lastDay = new Date(year, month, 0)
console.log(`      ${year}.${month}`)
console.log("Su Mo Tu We Th Fr Sa")



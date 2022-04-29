let argv = require('minimist')(process.argv.slice(2))
const sprintf = require('sprintf-js').sprintf

const offsetTime = 9 * 60 * 60 * 1000 //自分のPCだと実際の日本時間より9時間分遅れているためオフセット値を使う
const nowDate = new Date().getTime() + offsetTime
const year = argv.y ? argv.y : new Date(nowDate).getFullYear()
const month = argv.m ? argv.m - 1 : new Date(nowDate).getMonth()
const inputDate = new Date(year, month).getTime() + offsetTime
const firstDay = new Date(inputDate).setDate(1)
const lastDay = new Date(new Date(year, month + 1, 0).getTime() + offsetTime)
const days = [...Array(lastDay.getDate())].map((_, i) => new Date(new Date(year, month, i + 1).getTime() + offsetTime))
const space = '   '
const firstWeekSpace = space.repeat(new Date(firstDay).getDay())

// ヘッダー表示
console.log(`      ${year}.${month + 1}`)
console.log("Su Mo Tu We Th Fr Sa")

// ボディ表示
days.forEach ((day, i) => {
  if (i === 0) process.stdout.write(firstWeekSpace)
  if (day.getDay() === 6) {
    process.stdout.write(sprintf("%2d\n", day.getDate()))
  }else{
    process.stdout.write(sprintf("%2d ", day.getDate()))
  }
})



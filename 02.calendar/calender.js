const argv = require('minimist')(process.argv.slice(2))
const sprintf = require('sprintf-js').sprintf

const offsetTime = 9 * 60 * 60 * 1000 //  自分のPCだと実際の日本時間より9時間分遅れているためオフセット値を使う
const year = argv.y || getJPDate().getFullYear()
const month = argv.m - 1 || getJPDate().getMonth()
const firstDay = getJPDate(year, month, 1)
const lastDay = getJPDate(year, month + 1, 0)
const days = [...Array(lastDay.getDate())].map((_, i) => getJPDate(year, month, i + 1))
const space = '   '
const firstWeekSpace = space.repeat(new Date(firstDay).getDay());

function getJPDate(year = 0, month = 0, day = 0) {
  let date
  if(year === 0 && month === 0 && day === 0){
    date = new Date(new Date().getTime() + offsetTime)
  }else{
    date = new Date(new Date(year, month, day).getTime() + offsetTime)
  }
  return date
}

// ヘッダー表示
console.log(`      ${year}.${month + 1}`)
console.log('Su Mo Tu We Th Fr Sa')

// ボディ表示
process.stdout.write(firstWeekSpace)
days.forEach((day, i) => {
  process.stdout.write(sprintf('%2d ', day.getDate()))
  if (day.getDay() === 6) {
    process.stdout.write(sprintf('\n'))
  }
})

const fs = require('fs')
const enquirer = require('enquirer')
const argv = require('minimist')(process.argv.slice(2))

class MemoAppExec {
  constructor () {
    this.memoFile = new MemoFile()
  }

  deleteData (deleteFlag) {
    this.memoFile.showBody(deleteFlag)
  }

  showTitle () {
    this.memoFile.showTitle()
  }

  showBody () {
    this.memoFile.showBody()
  }
}

class MemoFile {
  constructor () {
    this.memoFile = JSON.parse(fs.readFileSync('./memo_file.json', 'utf8'))
  }

  addData () {
    const memoData = new MemoData()
    this.memoFile.memos.push(memoData.build_format())
    MemoFile.saveData(this.memoFile.memos)
    console.log('メモデータが追加されました')
  }

  showTitle () {
    this.memoFile.memos.forEach(memo => {
      const splitBody = memo.body.split('\n')
      console.log(splitBody[0])
    })
  }

  showBody (deleteFlag = false) {
    const memos = this.memoFile.memos
    async function choiceMemo (memos, deleteFlag) {
      const questions = {
        type: 'select',
        name: 'memo',
        message: 'メモ選択',
        choices: choiceFormat(memos)
      }
      const answers = await enquirer.prompt(questions)
      const result = memos.find(memo => memo.id === answers.memo)
      if (deleteFlag === true) {
        const newMemos = memos.filter(memo => memo.id !== answers.memo)
        MemoFile.saveData(newMemos)
        console.log('メモの削除が完了しました')
      } else {
        console.log(result.body)
      }
    }

    function choiceFormat (memos) {
      const choices = []
      memos.forEach(memo => {
        const splitBody = memo.body.split('\n')
        const choice = { message: splitBody[0], value: memo.id }
        choices.push(choice)
      })
      return choices
    }
    choiceMemo(memos, deleteFlag)
  }

  static saveData (memoData) {
    const formatData = { memos: memoData }
    const newMemoFileJSON = JSON.stringify(formatData)
    fs.writeFileSync('./memo_file.json', newMemoFileJSON)
  }
}

class MemoData extends MemoFile {
  constructor () {
    super()
    this.inputData = fs.readFileSync('/dev/stdin', 'utf8').toString().split(' ')
  }

  build_format () {
    const id = this.memoFile.memos[0] ? (Math.max(...this.memoFile.memos.map((memo) => memo.id))) + 1 : 1
    const dataFormat = { id: id.toString(), body: this.inputData.join('\n').toString() }
    return dataFormat
  }
}

// アプリの実行
const memoApp = new MemoAppExec()
// memoApp.main()
// const main = () => {
if (argv.d) return memoApp.deleteData(argv.d)
if (argv.l) return memoApp.showTitle()
if (argv.r) return memoApp.showBody(argv.d)
memoApp.memoFile.addData()
// }


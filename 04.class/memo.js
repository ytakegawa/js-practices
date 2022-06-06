const fs = require('fs')
const enquirer = require('enquirer')
const argv = require('minimist')(process.argv.slice(2))

class MemoAppExec {
  constructor (argv) {
    this.argv = argv
  }

  main () {
    const memoFile = new MemoFile()
    if (this.argv.d) return memoFile.deleteData()
    if (this.argv.l) return memoFile.showTitle()
    if (this.argv.r) return memoFile.showBody()
    memoFile.addData()
  }
}

class MemoFile {
  constructor () {
    this.memosFile = JSON.parse(fs.readFileSync('./memo_file.json', 'utf8'))
    this.memos = this.memosFile.memos
  }

  addData () {
    const memo = new MemoData()
    this.memos.push(memo.build_format())
    MemoFile.saveData(this.memos)
    console.log('メモデータが追加されました')
  }

  showTitle () {
    this.memos.forEach(memo => {
      const splitBody = memo.body.split('\n')
      console.log(splitBody[0])
    })
  }

  showBody () {
    MemoFile.choicesMemo(this.memos).then(result => {
      const memo = this.memos.find(memo => memo.id === result.id)
      console.log(memo.body)
    })
  }

  deleteData () {
    MemoFile.choicesMemo(this.memos).then(result => {
      const newMemos = this.memos.filter(memo => memo.id !== result.id)
      MemoFile.saveData(newMemos)
      console.log('メモの削除が完了しました')
    })
  }

  static choicesMemo (memos) {
    async function choice (memos) {
      const questions = {
        type: 'select',
        name: 'memo',
        message: 'メモ選択',
        choices: choiceFormat(memos)
      }
      const answers = await enquirer.prompt(questions)
      const result = memos.find(memo => memo.id === answers.memo)
      return result
    }

    function choiceFormat (memos) {
      const format =
      memos.map((memo) => (
        { message: memo.body.split('\n')[0], value: memo.id }
      ))
      return format
    }
    return choice(memos)
  }

  static saveData (memos) {
    const formatData = { memos }
    const newMemosJSONFile = JSON.stringify(formatData)
    fs.writeFileSync('./memo_file.json', newMemosJSONFile)
  }
}

class MemoData extends MemoFile {
  constructor () {
    super()
    this.inputData = fs.readFileSync('/dev/stdin', 'utf8').toString().split(' ')
  }

  build_format () {
    const id = this.memos[0] ? (Math.max(...this.memos.map((memo) => memo.id))) + 1 : 1
    const dataFormat = { id: id.toString(), body: this.inputData.join('\n').toString() }
    return dataFormat
  }
}

// アプリの実行
const memoApp = new MemoAppExec(argv)
memoApp.main()

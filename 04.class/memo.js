const fs = require('fs')
const enquirer = require('enquirer')
const argv = require('minimist')(process.argv.slice(2))

class MemoAppExec {
  constructor () {
    this.memoFile = new MemoFile()
    this.memos = this.memoFile.memosData.memos
  }

  deleteData () {
    this.memoFile.deleteData(this.memos)
  }

  showTitle () {
    this.memoFile.showTitle()
  }

  showBody () {
    this.memoFile.showBody(this.memos)
  }
}

class MemoFile {
  constructor () {
    this.memosData = JSON.parse(fs.readFileSync('./memo_file.json', 'utf8'))
  }

  addData () {
    const memo = new MemoData()
    this.memosData.memos.push(memo.build_format())
    MemoFile.saveData(this.memosData.memos)
    console.log('メモデータが追加されました')
  }

  showTitle () {
    this.memosData.memos.forEach(memo => {
      const splitBody = memo.body.split('\n')
      console.log(splitBody[0])
    })
  }

  showBody (memos) {
    MemoFile.choicesMemo(memos).then(result => {
      const memo = memos.find(memo => memo.id === result.id)
      console.log(memo.body)
    })
  }

  deleteData (memos) {
    MemoFile.choicesMemo(memos).then(result => {
      const newMemos = memos.filter(memo => memo.id !== result.id)
      MemoFile.saveData(newMemos)
      console.log('メモの削除が完了しました')
    })
  }

  static choicesMemo (memos) {
    async function choice(memos) {
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
      const choices = []
      memos.forEach(memo => {
        const splitBody = memo.body.split('\n')
        const choice = { message: splitBody[0], value: memo.id }
        choices.push(choice)
      })
      return choices
    }
    return choice(memos)
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
    const id = this.memosData.memos[0] ? (Math.max(...this.memosData.memos.map((memo) => memo.id))) + 1 : 1
    const dataFormat = { id: id.toString(), body: this.inputData.join('\n').toString() }
    return dataFormat
  }
}

// アプリの実行
const memoApp = new MemoAppExec()
if (argv.d) return memoApp.deleteData()
if (argv.l) return memoApp.showTitle()
if (argv.r) return memoApp.showBody()
memoApp.memoFile.addData()



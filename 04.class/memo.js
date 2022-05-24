const fs = require("fs")
const enquirer = require('enquirer')
const argv = require('minimist')(process.argv.slice(2))
console.log(argv.l)



class MemoAppExec{
  constructor(d, l, r){
    this.d = d //argv.d = delete data option
    this.l = l //argv.l = show title option
    this.r = r //arvg.r = show body option
    this.memoFile = new MemoFile()
  }
  run(){
    if
  }

  showTiltle(){
    this.memoFile.showTiltle()
  }
}

// function exec(showTitle = false, showBody =false, deleteData =false){
//   console.log(showTitle, showBody, deleteData)

// }

class MemoFile {
  constructor(){
    this.memoFile = JSON.parse(fs.readFileSync('./memo_file.json', 'utf8'))
  }
  // static loadFile(){
  //   let readFile = JSON.parse(fs.readFileSync('./memo_file.json', 'utf8'))
  //   return readFile
  // }
  addData(){
    // let memoParams = new MemoParams()
    // let memoData = new MemoData(memoParams.generateId(), memoParams.generateBody())
    // this.memoFile.memos.push(memoData.build_format())
    // let formatData = {memos : this.memoFile.memos}
    // let newMemoFileJSON = JSON.stringify(formatData)
    const memoData = new MemoData()
    this.memoFile.memos.push(memoData.build_format())
    MemoFile.saveData(this.memoFile.memos)
    // const formatData = {memos : this.memoFile.memos}
    // const newMemoFileJSON = JSON.stringify(formatData)
    // fs.writeFileSync('./memo_file.json', newMemoFileJSON)
    console.log('メモデータが追加されました')
  }

  showTiltle(){
    this.memoFile.memos.forEach(memo => {
      const splitBody = memo.body.split('\n')
      console.log(splitBody[0])
    })
  }

  showBody(deleteFlag = false){
    const memos = this.memoFile.memos
    async function choiceMemo(memos, deleteFlag){
      const questions = {
        type: 'select',
        name: 'memo',
        message: 'メモ選択',
        choices: choiceFormat(memos)
      }
      const answers = await enquirer.prompt(questions)
      const result = memos.find(memo => memo.id === answers.memo)
      if (deleteFlag === true) {
        const newMemos = memos.filter(memo => memo.id !== answers.memo )
        MemoFile.saveData(newMemos)
        console.log('メモの削除が完了しました')
      } else {
        console.log(result.body)
      }
      }

    function choiceFormat(memos){
      let choices = []
      memos.forEach(memo => {
        const splitBody = memo.body.split('\n')
        const choice = { message: splitBody[0], value: memo.id}
        choices.push(choice)
      })
      return choices
    }
    choiceMemo(memos, deleteFlag)
  }

  static saveData(memoData){
    // console.log(memoData)
    const formatData = {memos : memoData}
    const newMemoFileJSON = JSON.stringify(formatData)
    fs.writeFileSync('./memo_file.json', newMemoFileJSON)
  }

}

class MemoData extends MemoFile{
  constructor(){
    super()
    // this.id = id
    // this.body = body
    this.inputData = fs.readFileSync("/dev/stdin", "utf8").toString().split(' ')
  }

  build_format(){
    const id = this.memoFile.memos[0] ? (Math.max(...this.memoFile.memos.map((memo) => memo.id))) + 1 : 1
    const dataFormat = {id: id.toString(), body: this.inputData.toString()}
    return dataFormat
  }

}

// class MemoParams {
//   constructor(){
//     this.inputData = fs.readFileSync("/dev/stdin", "utf8").toString().split(' ')
//     this.memoFile = JSON.parse(fs.readFileSync('./memo_file.json', 'utf8'))
//   }

//   generateId(){
//     return this.memoFile.memos[0] ? (Math.max(...this.memoFile.memos.map((memo) => memo.id))) + 1 : 1
//   }

//   generateBody(){
//     let bodyData = this.inputData.toString()
//     return bodyData
//   }
// }

// class MemoParams extends MemoFile {
//   constructor(){
//     super()
//     this.inputData = fs.readFileSync("/dev/stdin", "utf8").toString().split(' ')

//   }

//   generateId(){
//     return this.memoFile.memos[0] ? (Math.max(...this.memoFile.memos.map((memo) => memo.id))) + 1 : 1
//   }

//   generateBody(){
//     let bodyData = this.inputData.toString()
//     return bodyData
//   }
// }


// const memoParam = new MemoParams()
// console.log(memoParam.generateId())
// console.log(memoParam.generateBody())
// const memoData = new MemoData()
// console.log(memoData.build_format())
// console.log(memoData.genmemoFile())
// console.log(MemoData.generateId())

// const newMemo = new MemoFile()
// newMemo.addData()
// const deleteFlag = true
// newMemo.showBody(deleteFlag)
// newMemo.showTiltle()

exec(argv.l, argv.r, argv.d)

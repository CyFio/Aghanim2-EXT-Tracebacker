const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const fs = require('fs')
const path = require('path')
const moment = require('moment')

const app = new Koa()

const logfile_dir = 'tracebacks'

function logfile_formatname() {
  return moment().format("yyyy-MM-DD")  + '.txt'
}

function logfile_path(){
  return path.join(logfile_dir, logfile_formatname())
}

app.use(bodyParser())

app.use(async ctx => {
  ctx.body = '200 OK'
  // ctx.body = ctx.request.body
  // console.log(ctx.request.body.message) 
  if (!fs.existsSync(logfile_dir)){
    fs.mkdirSync(logfile_dir, { recursive: true })
  }
  var log_path = logfile_path()
  console.log('saving to ' + log_path)
  console.log(moment().format("yyyy-MM-DD hh:mm:ss"))
  message = 'log time: ' + (moment().format("yyyy-MM-DD hh:mm:ss")) + '\n' + ctx.request.body.message + '\n'
  fs.appendFile(log_path, message, function (err,data) {
    if (err) {
      return console.log(err)
    }
    console.log(data)
  });
});

app.listen(3000);

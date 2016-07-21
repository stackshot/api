'use strict'
const koa = require('koa')

const app = koa()

app.use(function* () {
  this.body = 'hi'
})

app.listen(6922, () => {
  console.log(`Listening at http://localhost:6922`)
})

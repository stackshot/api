import Koa from 'koa'

const app = new Koa()

app.use(ctx => {
  ctx.body = 'hi'
})

app.listen(6922, () => {
  console.log(`Listening at http://localhost:6922`)
})

'use strict'
require('dotenv').config()
const makeServer = require('./lib').default

const app = makeServer()

const port = process.env.PORT
app.listen(port, () => {
  console.log(`> Open http://localhost:${port}`)
})

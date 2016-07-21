'use strict'
const spawn = require('child_process').spawn

const watch = spawn('npm', ['run', 'watch:build'])
const nodemon = spawn('npm', ['run', 'nodemon'])

watch.stdout.on('data', (data) => {
  console.log(`[rollup] ${data}`)
})

watch.stderr.on('data', (data) => {
  console.log(`[rollup] ${data}`)
})

watch.on('close', (code) => {
  console.log(`[rollup] child process exited with code ${code}`)
})

nodemon.stdout.on('data', (data) => {
  console.log(`${data}`)
})

nodemon.stderr.on('data', (data) => {
  console.log(`${data}`)
})

nodemon.on('close', (code) => {
  console.log(`child process exited with code ${code}`)
})

import fs from 'fs'
import busboy from 'async-busboy'
import random from 'randomstring'
import mime from 'mime'
import qn from '../common/qn'

function uploadImageStream(file) {
  return new Promise((resolve, reject) => {
    const ext = mime.extension(file.mime)
    if (['png', 'jpg', 'jpeg', 'gif', 'webp'].indexOf(ext) === -1) {
      return reject(new Error('Unsupported image type'))
    }
    qn.upload(file, {key: `media/upload_images/${random.generate(10)}.${ext}`}, (err, res) => {
      if (err) {
        return reject(new Error(err))
      }
      resolve(res)
    })
  })
}

export async function uploadImage(ctx) {
  try {
    const {files} = await busboy(ctx.req)
    const res = await Promise.all(files.map(file => {
      return uploadImageStream(file)
    }))
    ctx.body = {
      images: res
    }
  } catch (e) {
    ctx.body = {
      error: e.message
    }
  }
}

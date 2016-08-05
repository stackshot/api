import qn from 'qn'

export default qn.create({
  accessKey: process.env.QINIU_AK,
  secretKey: process.env.QINIU_SK,
  bucket: process.env.QINIU_BUCKET,
  origin: process.env.QINIU_ORIGIN
})

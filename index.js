const express = require("express")
const app = express()
const router = express.Router()
require("dotenv").config()

const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3")
const config = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESSKEY,
    secretAccessKey: process.env.AWS_SECRETACCESS,
  },
}

router.get("/", async (req, res) => {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: process.env.S3_KEY,
    }
    const command = new GetObjectCommand(params)
    const fileName = "invoice.pdf"

    const client = new S3Client(config)
    const response = await client.send(command)
    res.status(200)
    res.setHeader("Content-disposition", 'inline; filename="' + fileName + '"')
    res.contentType("application/pdf")
    response.Body.pipe(res)
  } catch (err) {
    res.status(500)
    res.send("Something wrong")
  }
})

app.use("/", router)
app.listen(process.env.PORT, () =>
  console.log(`Listen on http://localhost:${process.env.PORT}`)
)

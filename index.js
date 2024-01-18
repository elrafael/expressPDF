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

const client = new S3Client(config)

router.get("/", async (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: process.env.S3_KEY,
  }
  const command = new GetObjectCommand(params)

  try {
    const response = await client.send(command)
    res.status(200)
    response.Body.pipe(res)
  } catch (err) {
    res.status(500)
    res.send("Something wrong")
  }
})

app.use("/", router)
app.listen(8080, () => console.log(`Listen on http://localhost:8080`))

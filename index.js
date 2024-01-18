const express = require("express")
const app = express()
const fs = require("fs")

const router = express.Router()

router.get("/", (req, res) => {
  const pdfFile = "./assets/calibration.pdf"
  if (fs.existsSync(pdfFile)) {
    res.contentType("application/pdf")
    fs.createReadStream(pdfFile).pipe(res)
  } else {
    res.status(500)
    console.log("File not found")
    res.send("File not found")
  }
})

app.use("/", router)
app.listen(8080, () => console.log(`Listen on http://localhost:8080`))

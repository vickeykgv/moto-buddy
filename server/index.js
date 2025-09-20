import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/logs', (req, res) => {
  console.log('received log', req.body)
  res.status(201).json({ ok: true })
})

app.listen(4000, () => {
  console.log('mock server listening on http://localhost:4000')
})

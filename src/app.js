import express from 'express'
import bodyParser from 'body-parser'

import greet from './routes/greet.js'

const app = express()
const port = 3000

app.use(bodyParser.json())

app.get('/', (_, res) => {
    console.log("Request received on /")
    res.send('Hello World!')
})

app.use(greet)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
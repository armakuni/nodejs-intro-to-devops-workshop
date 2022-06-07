import express from 'express'
import bodyParser from 'body-parser'

import greet from './routes/greet.js'
import home from './routes/home.js'

const app = express()

app.use(bodyParser.json())
app.use(greet)
app.use(home)


export default app
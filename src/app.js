import express from 'express'
import bodyParser from 'body-parser'


const app = express()
const port = 3000

app.use(bodyParser.json())

app.get('/', (_, res) => {
    console.log("Request received on /")
    res.send('Hello World!')
})

app.post("/greet", (req, res) => {
    console.log("Request received on /greet")
    let body = req.body
    let [valid, user_name] = validateBody(body)

    if (!valid) {
        console.error("Invalid body in request")
        res.status(400)
        res.json({ "error": "invalid body" })
        return
    }

    console.info(`Request received from ${user_name}`)
    res.status(200)
    res.json({ "msg": `Hello ${user_name}!` })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const validateBody = (body) => {
    if (!('name' in body)) {
        console.error("name missing from body")
        return [false, null]
    }

    if (!body.name) {
        console.error("name empty in body")
        return [false, null]
    }

    return [true, body.name]
}
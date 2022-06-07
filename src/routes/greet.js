import { Router } from 'express'

const router = Router()
const route = "/greet"

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

router.post(route, (req, res) => {
    console.log(`Request received on ${route}`)

    let body = req.body

    console.log('Validating body...')
    let [valid, user_name] = validateBody(body)
    if (!valid) {
        console.error("Invalid body in request")
        res.status(400)
        res.json({ "error": "invalid body" })
        return
    }

    console.info(`Valid request received from ${user_name}`)
    res.status(200)
    res.json({ "msg": `Hello ${user_name}!` })
})

export default router
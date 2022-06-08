import { Router } from 'express'

const router = Router()
const route = "/"


router.get(route, (_, res) => {
    console.log(`Request received on ${route}`)

    res.status(200)
    res.setHeader('content-type', 'text/plain')
    res.send(process.env.GREET_MESSAGE || 'Hello local world!')
})

export default router
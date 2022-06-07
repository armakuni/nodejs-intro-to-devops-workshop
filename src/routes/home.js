import { Router } from 'express'

const router = Router()
const route = "/"


router.get(route, (_, res) => {
    console.log(`Request received on ${route}`)
    res.send('Hello World!')
})

export default router
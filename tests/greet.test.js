import request from 'supertest'
import app from '../src/app/app.js'

describe('POST /greet', () => {
    it('returns a 200 and a greeting when called with a valid request', async () => {
        const res = await request(app)
            .post('/greet')
            .send({ name: 'Bob' })

        expect(res.status).toEqual(200)
        expect(res.headers['content-type']).toMatch('application/json')
        expect(res.body).toEqual({ msg: 'Hello Bob!' })
    })

    it('returns 400 error when name is missing from request body', async () => {
        const res = await request(app)
            .post('/greet')
            .send({ someKey: 'some value' })

        expect(res.status).toEqual(400)
        expect(res.headers['content-type']).toMatch('application/json')
        expect(res.body).toEqual({ error: 'invalid body' })
    })

    it('returns 400 error when name is empty in request body', async () => {
        const res = await request(app)
            .post('/greet')
            .send({ name: '' })

        expect(res.status).toEqual(400)
        expect(res.headers['content-type']).toMatch('application/json')
        expect(res.body).toEqual({ error: 'invalid body' })
    })
})
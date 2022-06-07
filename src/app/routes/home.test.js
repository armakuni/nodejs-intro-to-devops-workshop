import request from 'supertest'

import app from '../app.js'

describe('GET /', () => {
    it('returns a 200 hello world when called', async () => {
        const res = await request(app)
            .get('/')

        expect(res.status).toEqual(200)
        expect(res.headers['content-type']).toMatch('text/plain')
        expect(res.text).toEqual('Hello World!')
    })
})
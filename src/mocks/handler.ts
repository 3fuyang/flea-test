import { rest } from 'msw'

interface UpdatePostRequestBody {
  id: string
  password: string
}

export const handlers = [
  rest.post<UpdatePostRequestBody>('/api/userlogin', async (req, res, ctx) => {
    const { id, password } = req.body
    if (id === '1951001' && password === 'qwe12345') {
      const response = res(
        ctx.status(200),
        ctx.json(true)
      )
      return response
    } else {
      return res(
        ctx.status(200),
        ctx.json(false)
      )
    }
  }),

  rest.post<UpdatePostRequestBody>('/api/adminlogin', (req, res, ctx) => {
    const { id, password } = req.body
    if (id === '0001' && password === 'qwe12345') {
      return res(
        ctx.status(200),
        ctx.json(true)
      )
    } else {
      return res(
        ctx.status(200),
        ctx.json(false)
      )
    }    
  })
]
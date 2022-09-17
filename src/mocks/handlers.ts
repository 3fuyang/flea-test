import { rest } from 'msw'

// POST: /reportOrder body: {orderId: string, reason: string}
export const handlers = [
  rest.post(/reportOrder$/, (req, res, ctx) => {

    return res(
      ctx.status(200),
      ctx.json(true)
    )
  })
]
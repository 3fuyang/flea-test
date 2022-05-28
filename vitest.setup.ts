import { afterAll, afterEach, beforeAll } from "vitest"
import { setupServer } from 'msw/node'
import { handlers } from './src/mocks/handler' 

const server = setupServer(...handlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

afterAll(() => server.close())

afterEach(() => server.resetHandlers())
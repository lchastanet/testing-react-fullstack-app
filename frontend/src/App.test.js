import { rest } from "msw"
import { setupServer } from "msw/node"
import { render, screen, waitFor } from "@testing-library/react"
import App from "./App"

const studentsMock = [
  {
    id: 1,
    firstname: "tata",
    lastname: "tata",
    age: 45,
    remote: 0,
    campId: null,
  },
  {
    id: 2,
    firstname: "tutu",
    lastname: "toto",
    age: 29,
    remote: 1,
    campId: null,
  },
]

const server = setupServer(
  rest.get("http://localhost:8000/students", (req, res, ctx) => {
    return res(ctx.json(studentsMock))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test("Render App list", async () => {
  render(<App />)
  const element = screen.getByText(/Hello/i)
  expect(element).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText("Prénom : Tata")).toBeTruthy()
  })

  await waitFor(() => {
    expect(screen.getByText("Prénom : Tutu")).toBeTruthy()
  })
})

# Introduction to tests in a fullstack app

First we will create unit tests.

In the `utils` directory, create a `utils.test.js` file and add it inside :

```js
test("Capitalize a word", () => {
    const result = capitalize("toto")
    expect(result).toBe("Toto")
  })
```

Then run (in the frontend directory) :

```shell
$ npm run test
```

Congratulation you've juste created your first unit test using [jest](https://jestjs.io/fr/) !

Now, lets type the following command :

```shell
$ npm test -- --coverage
```

It seems we still have a lot of work to do...

Lets test our sum function.

Then we will use [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) to test our components.

Lets start with the most easy, the `StudentCard` component, we will test if it render correctly and create a Mock for the props:

```js
describe("Student Card", () => {
  test("Should render without crashing", async () => {
    render(<StudentCard student={studentMock} />)
    expect(
      screen.getAllByRole("heading", { level: 2, text: "Student" })
    ).toBeTruthy()
    const age = screen.getByText(/3/i)
    expect(age).toBeInTheDocument()
  })
})
```

Now we will test the `SwitchButton` component triggering the click event :

```js
test("Change theme", async () => {
  render(<SwitchButton />)
  const button = screen.getByRole("button")
  expect(button.textContent).toBe("🟢")
  fireEvent.click(button)
  expect(button.textContent).toBe("🔴")
})
```

And finally we need to test the `App` component, for this on we'll need to moke the API call.
So install the `Mock Service Worker` with the following command:

```shell
$ npm i msw
```

Then we will write our test :

```js
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
```

Now, our front application should be correctly covered. 

To be able to test the routes of our backend application, we will use [supertest](https://www.npmjs.com/package/supertest)

Then we will test our `student` endpoint with :

```js
const server = require("../index.js")
const db = require("../src/models/db")
const supertest = require("supertest")
const request = supertest(server)

afterEach(() => {
  server.close()
})

describe("Students Endpoints", () => {
  it("GET /students should show all students", async () => {
    const res = await request.get("/students")
    expect(res.status).toEqual(200)
    expect(res.type).toEqual(expect.stringContaining("json"))
    expect(typeof res.body).toBe(typeof [])
  })

  it("GET /students/:id should show one student", async () => {
    const res = await request.get("/students/2")
    expect(res.status).toEqual(200)
    expect(res.type).toEqual(expect.stringContaining("json"))
    expect(typeof res.body).toBe(typeof {})
    expect(res.body).toHaveProperty("firstname")
    expect(res.body).toHaveProperty("lastname")
    expect(res.body).toHaveProperty("age")
    expect(res.body).toHaveProperty("remote")
  })
})
```

You can now take a look on the coverage report with the command :

```shell
$ npm test -- --coverage
```

You could add more tests to complete the test covering of the backend application.

(Note that in this tutorial we've juste seen a little part of how to test an application, for exemple if you want to test insertions and deletions, you should do it in an test environnement, on a dedicate database)

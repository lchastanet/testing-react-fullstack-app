import StudentCard from "./StudentCard"
import { render, screen } from "@testing-library/react"

const studentMock = {
  firstname: "toto",
  lastname: "toto",
  age: 3,
  remote: true,
}

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

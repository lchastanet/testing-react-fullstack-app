import { render, screen, fireEvent } from "@testing-library/react"
import SwitchButton from "./SwitchButton"

test("Change theme", async () => {
  render(<SwitchButton />)
  const button = screen.getByRole("button")
  expect(button.textContent).toBe("🟢")
  fireEvent.click(button)
  expect(button.textContent).toBe("🔴")
})

import { capitalize, sum } from "./utils"

describe("The utility function", () => {
  test("Capitalize a word", () => {
    const result = capitalize("toto")
    expect(result).toBe("Toto")
  })

  test("Sum of two numbers", () => {
    const result = sum(2, 2)
    expect(result).toBe(4)
  })
})

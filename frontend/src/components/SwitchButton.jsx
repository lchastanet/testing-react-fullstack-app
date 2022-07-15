import { useState } from "react"

function SwitchButton() {
  const [switcher, setSwitcher] = useState(true)
  return (
    <button onClick={() => setSwitcher(!switcher)}>
      {switcher ? "🟢" : "🔴"}
    </button>
  )
}

export default SwitchButton

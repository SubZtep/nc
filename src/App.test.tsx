import React from "react"
import { render, screen } from "@testing-library/react"
import App from "./App"

test("renders heading", () => {
  render(<App />)
  expect(screen.getByText("Predict App")).toBeInTheDocument()
})

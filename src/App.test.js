import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn Jenkins link", async () => {
  await render(<App />);
  const linkElement = screen.getByText(/learn Jenkins/i);
  expect(linkElement).toBeInTheDocument();
});

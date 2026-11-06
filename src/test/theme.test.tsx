import { act, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { ThemeProvider, useTheme } from "@/components/site/ThemeProvider";

function ThemeControl() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>{theme}</button>;
}

describe("Theme preference", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });
  it("switches between light and dark and remembers the choice", async () => {
    render(<ThemeProvider><ThemeControl /></ThemeProvider>);
    act(() => screen.getByRole("button", { name: "light" }).click());
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("talentiser-theme")).toBe("dark");
    act(() => screen.getByRole("button", { name: "dark" }).click());
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("talentiser-theme")).toBe("light");
  });
  it("restores a previously selected dark mode", async () => {
    localStorage.setItem("talentiser-theme", "dark");
    render(<ThemeProvider><ThemeControl /></ThemeProvider>);
    await waitFor(() => expect(document.documentElement.classList.contains("dark")).toBe(true));
  });
});
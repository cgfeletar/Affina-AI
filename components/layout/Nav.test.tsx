import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Nav } from "./Nav";

describe("Nav", () => {
  it("renders the Affina AI wordmark linked to home", () => {
    render(<Nav />);
    const home = screen.getByRole("link", { name: /affina ai home/i });
    expect(home).toHaveAttribute("href", "/");
    expect(home).toHaveTextContent("Affina");
    expect(home).toHaveTextContent("AI");
  });

  it("renders the four primary navigation links with correct hrefs", () => {
    render(<Nav />);
    const expected = [
      { label: "What I build", href: "/what-i-build" },
      { label: "Industries", href: "/industries" },
      { label: "About", href: "/about" },
      { label: "Journal", href: "/journal" },
    ];
    for (const { label, href } of expected) {
      const links = screen.getAllByRole("link", { name: label });
      // Same link appears in desktop list and mobile drawer
      expect(links.length).toBeGreaterThanOrEqual(1);
      for (const link of links) {
        expect(link).toHaveAttribute("href", href);
      }
    }
  });

  it("renders the contact CTA", () => {
    render(<Nav />);
    const ctas = screen.getAllByRole("link", { name: /book a free consult/i });
    expect(ctas.length).toBeGreaterThanOrEqual(1);
    for (const cta of ctas) {
      expect(cta).toHaveAttribute("href", "/contact");
    }
  });

  it("starts with the mobile drawer closed", () => {
    render(<Nav />);
    const toggle = screen.getByRole("button", { name: /open navigation/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", "mobile-nav");
    const drawer = document.getElementById("mobile-nav");
    expect(drawer).toHaveAttribute("aria-hidden", "true");
  });

  it("opens the mobile drawer when the toggle is clicked", async () => {
    const user = userEvent.setup();
    render(<Nav />);
    const toggle = screen.getByRole("button", { name: /open navigation/i });
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAccessibleName(/close navigation/i);
    const drawer = document.getElementById("mobile-nav");
    expect(drawer).toHaveAttribute("aria-hidden", "false");
  });

  it("closes the drawer when Escape is pressed", async () => {
    const user = userEvent.setup();
    render(<Nav />);
    const toggle = screen.getByRole("button", { name: /open navigation/i });
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(window, { key: "Escape" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the drawer when a drawer link is clicked", async () => {
    const user = userEvent.setup();
    render(<Nav />);
    const toggle = screen.getByRole("button", { name: /open navigation/i });
    await user.click(toggle);
    const drawer = document.getElementById("mobile-nav");
    expect(drawer).not.toBeNull();
    const aboutInDrawer = within(drawer as HTMLElement).getByRole("link", {
      name: "About",
    });
    await user.click(aboutInDrawer);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("makes drawer links untabbable when the drawer is closed", () => {
    render(<Nav />);
    const drawer = document.getElementById("mobile-nav");
    expect(drawer).not.toBeNull();
    const drawerLinks = within(drawer as HTMLElement).getAllByRole("link", {
      hidden: true,
    });
    expect(drawerLinks.length).toBeGreaterThan(0);
    for (const link of drawerLinks) {
      expect(link).toHaveAttribute("tabindex", "-1");
    }
  });

  it("makes drawer links tabbable when the drawer is open", async () => {
    const user = userEvent.setup();
    render(<Nav />);
    await user.click(screen.getByRole("button", { name: /open navigation/i }));
    const drawer = document.getElementById("mobile-nav");
    const drawerLinks = within(drawer as HTMLElement).getAllByRole("link");
    for (const link of drawerLinks) {
      expect(link).toHaveAttribute("tabindex", "0");
    }
  });

  it("uses a primary nav landmark", () => {
    render(<Nav />);
    expect(screen.getByRole("navigation", { name: /primary/i })).toBeInTheDocument();
  });
});

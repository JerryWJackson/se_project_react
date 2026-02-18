import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ItemCard from "./ItemCard";

describe("ItemCard", () => {
  const mockItem = {
    _id: "1",
    name: "Test Item",
    imageUrl: "http://example.com/image.jpg",
    weather: "hot",
  };

  it("renders correctly", () => {
    render(<ItemCard item={mockItem} onSelectCard={vi.fn()} />);
    expect(screen.getByText("Test Item")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute("src", mockItem.imageUrl);
  });

  it("calls onSelectCard when clicked", () => {
    const handleSelectCard = vi.fn();
    render(<ItemCard item={mockItem} onSelectCard={handleSelectCard} />);
    
    const image = screen.getByRole("button");
    fireEvent.click(image);
    expect(handleSelectCard).toHaveBeenCalledWith(mockItem);
  });
});

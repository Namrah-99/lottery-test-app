import { render, screen, fireEvent } from "@testing-library/react";
import CosmicCard from "../components/CosmicCard";

describe("CosmicCard Component", () => {
  it("triggers an event on button click", () => {
    const handleClick = jest.fn();
    render(<CosmicCard onClick={handleClick} />);

    fireEvent.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

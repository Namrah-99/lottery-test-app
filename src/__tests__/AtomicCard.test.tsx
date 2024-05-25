import { render, screen } from "@testing-library/react";
import AtomicCard from "../components/AtomicCard";
import { useRouter } from "next/router";

// Mock the useRouter hook
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("AtomicCard Component", () => {
  it("renders AtomicCard component", () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    }));

    const data = {
      id: 1,
      title: "Test Lottery",
      description: "This is a test description for the lottery card.",
      endDate: "2024-12-31",
      prize: "$1000",
    };

    render(<AtomicCard data={data} />);

    expect(screen.getByText("Test Lottery")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test description for the lottery card.")
    ).toBeInTheDocument();
    expect(screen.getByText("$1000")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";

import { Title } from "./Title";

const text = "Hello World";

describe("Title", ()=>{
    it("should render title with children", ()=>{
        render(<Title>{text}</Title>);
        expect(screen.getByText(text)).toBeInTheDocument();
    });
    it("should render title with the correct tag", ()=>{
        const { container } = render(<Title level={2}>{text}</Title>);
        expect(container.querySelector("h2")).toBeInTheDocument();
    });
    it("should render title with the correct class", ()=>{
        render(<Title className="test1">{text}</Title>);

        const element = container.getByText(".test1");

        expect(element).toBeInTheDocument();
        expect(element).toHaveClass("test1");
        expect(element).toHaveClass("title");

    });
})
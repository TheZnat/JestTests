import { render, screen } from "@testing-library/react";
import { Text } from "./Text";
import style from './Text.module.css';

const text = "Hello Test";

describe("Text", ()=>{
    it('should render text with children', ()=>{
        render(<Text>{text}</Text>)

        expect(screen.getByText(text)).toBeInTheDocument();
    })
    it('should render text with class', ()=>{
      render(<Text className="test1">{text}</Text>)
        const element = screen.getByText(text);

        expect(element).toHaveTextContent(text);
        expect(element).toHaveClass("test1");
        expect(element).toHaveClass("text");
    });
    it('should render text with error class', ()=>{
        render(<Text isError>{text}</Text>)
        const element = screen.getByText(text);

        expect(element).toHaveTextContent(text);
        expect(element).toHaveClass(style.error);
        expect(element).toHaveClass("text");
    })
    it('should render text with success class', ()=>{
        render(<Text isSuccess>{text}</Text>)
        const element = screen.getByText(text);

        expect(element).toHaveClass(style.success); // Проверяем, что класс success применен
        expect(element).not.toHaveClass(style.error); // Проверяем, что класс error не применен
    })
})
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

const testPlaceholder = "Test Placeholder";

describe("Input", ()=>{
    it('should render input', ()=>{
        render(<Input placeholder={testPlaceholder}/>)

        expect(screen.getByPlaceholderText(testPlaceholder)).toBeInTheDocument();
    });
    it("should render input with the correct type", ()=>{
        render(<Input type="checkbox" placeholder={testPlaceholder}/>)

        expect(screen.getByRole("checkbox")).toBeInTheDocument();
    })
    it("should render input with the correct class", ()=>{
        const {container} = render(
        <Input 
        inputClassName="test1" 
        containerClassName="containerTest"
        placeholder={testPlaceholder}/>)

        const inputElement = container.querySelector("input"); // Выбираем сам input
        expect(inputElement).toHaveClass("test1"); // Проверяем класс на input
        
        const containerElement = container.querySelector(".formControl.containerTest");
        expect(containerElement).toBeInTheDocument(); // Проверяем контейнер
    });
    it("should render input with without a label", ()=>{
        render(<Input placeholder={testPlaceholder}/>)

        expect(screen.queryByTestId("input-label")).not.toBeInTheDocument();
    });
    it("should render input with a label", ()=>{
        const labelText = "I am a label";
        render(<Input label={labelText}/>)

        expect(screen.getByLabelText(labelText)).toBeInTheDocument();
    });
    it("should render input with the correct value", ()=>{
        render(<Input value="123" onChange={jest.fn()}/>)

        expect(screen.getByDisplayValue("123")).toBeInTheDocument();
    });
    it("should invoke onChange", async ()=>{
        const onChange = jest.fn();
        const { container } = render(<Input onChange={onChange} value="123" />);

        const inputElement = container.querySelector("input");
   
        await userEvent.type(inputElement, '45');

        expect(onChange).toHaveBeenCalledTimes(2);
    })
})
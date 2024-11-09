import { fireEvent, render, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { Form } from "./Form"


describe("From", ()=>{
    it("should render From with children", ()=>{
        const {container, getByTestId} = render(<Form><div data-testid="my-children"></div></Form>)

        expect(getByTestId("my-children")).toBeInTheDocument();
        expect(container.querySelector("form")).toBeInTheDocument();
    });
    it("should render Form on submit", ()=>{
        const onSubmit = jest.fn();
        const {container} = render(<Form onSubmit={onSubmit}/>);

        const myFrom = container.querySelector("form");
        fireEvent.submit(myFrom);
        expect(onSubmit).toBeCalledTimes(1);
    });
    it("should invoke onSuccess on submit", async()=>{
        const onSuccess = jest.fn();
        const {container} = render(<Form onSuccess={onSuccess} onSubmit={jest.fn()} />);
        const myFrom = container.querySelector("form");
        fireEvent.submit(myFrom);

        await waitFor(()=>{
            expect(onSuccess).toBeCalledTimes(1);
        })
    });

    it('should invoke Error on submit', async()=>{
        const onError = jest.fn();
        const {container} = render(<Form onError={onError} onSubmit={()=>Promise.reject()} />);
        const myFrom = container.querySelector("form");
        fireEvent.submit(myFrom);

        await waitFor(()=>{
            expect(onError).toBeCalledTimes(1);
        })

    })

})
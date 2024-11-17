import { render, screen, act, fireEvent  } from "@testing-library/react";
import App from "./App";

import * as waitMock from './helpers/wait';

const waitSpy = jest.spyOn(waitMock, 'wait');

describe("App", ()=>{
    it('should render App with form element and title', ()=>{
        const { container } = render(<App/>);

        expect(screen.getByTestId("app")).toBeInTheDocument();

        const userNameInput = screen.getByLabelText(/User name/);
        const passwordInput = screen.getByLabelText(/Password/);
        const submitButton = screen.getByRole('button',/Create user/);
        const title = container.querySelector('h1');

        expect(userNameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(title).toBeInTheDocument();
    });
    it("should render error message when form was sub,it with a weak password", async()=>{
        // рендорим App
        render(<App/>);
        // получаем инпуты и кнопку
        const userNameInput = screen.getByLabelText(/User name/);
        const passwordInput = screen.getByLabelText(/Password/);
        const submitButton = screen.getByRole('button', /Create user/);
        
        // Собираем информацию о полях формы
        const successMessage = screen.queryByText(/created with password .*/);
        const errorMessage = screen.queryByText(/Password must be at least 8 characters long/);
        // проверяем, что сообщения об ошибках нет
        expect(successMessage).not.toBeInTheDocument();
        expect(errorMessage).not.toBeInTheDocument();

        // вводим данные в поля формы с ошибкой 
        act(()=>{
            fireEvent.change(userNameInput,{target:{value:"John"}});
            fireEvent.change(passwordInput,{target:{value:"123"}});
            fireEvent.click(submitButton);
        })

        // отлавливаем ошибку
        const errorMessageAfterSubmit = await screen.findByText(/Password must be at least 8 characters long/);
        expect(errorMessageAfterSubmit).toBeInTheDocument();
    })
    it('should render success message after success submit', async()=>{
           // рендорим App
           render(<App/>);
           // получаем инпуты и кнопку
           const userNameInput = screen.getByLabelText(/User name/);
           const passwordInput = screen.getByLabelText(/Password/);
           const submitButton = screen.getByRole('button', /Create user/);
           
           // Собираем информацию о полях формы
           const successMessage = screen.queryByText(/created with password .*/);
           const errorMessage = screen.queryByText(/Password must be at least 8 characters long/);
           // проверяем, что сообщения об ошибках нет
           expect(successMessage).not.toBeInTheDocument();
           expect(errorMessage).not.toBeInTheDocument();
            // код для ожидания выполнения промиса в котом шпион (замокали последний этап отправки формы)
           const promise = Promise.resolve();
           waitSpy.mockImplementation(()=>promise);

             // вводим данные в поля формы с без ошибки
            act(()=>{
                fireEvent.change(userNameInput,{target:{value:"John"}});
                fireEvent.change(passwordInput,{target:{value:"Qwerty123!@"}});
                fireEvent.click(submitButton);
            })

            const successMessageAfterSubmit = await screen.findByText(/created with password .*/);
            expect(successMessageAfterSubmit).toBeInTheDocument();
    });
})
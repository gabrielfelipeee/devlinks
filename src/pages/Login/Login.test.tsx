import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { Login } from ".";
import * as useLoginService from "../../hooks/services/useLoginService";

const useLoginServiceMock = jest.spyOn(useLoginService, 'useLoginService');

const renderComponent = () => {
    const client = new QueryClient();
    render(
        <BrowserRouter>
            <QueryClientProvider client={client}>
                <Login />
            </QueryClientProvider>
        </BrowserRouter>
    )
};

describe("Login Page", () => {
    it("should display the loading component", async () => {
        useLoginServiceMock.mockReturnValue({
            errorLogin: {
                response: {
                    data: {
                        authenticated: false,
                        message: ""
                    }
                }
            },
            isErrorLogin: false,
            isLoadingLogin: true,
            login: jest.fn()
        });
        renderComponent();

        await waitFor(() => {
            expect(screen.getByTestId("loading")).toBeInTheDocument();
        });
    });

    it("should display error messages when the submit button is clicked with invalid input", async () => {
        useLoginServiceMock.mockReturnValue({
            errorLogin: {
                response: {
                    data: {
                        authenticated: false,
                        message: ""
                    }
                }
            },
            isErrorLogin: false,
            isLoadingLogin: false,
            login: jest.fn()
        });
        renderComponent();

        fireEvent.change(screen.getByPlaceholderText("email"), {
            target: { value: "invalidemail" }
        });
        fireEvent.change(screen.getByPlaceholderText("senha"), {
            target: { value: "123" }
        });
        fireEvent.click(screen.getByRole("button"));

        await waitFor(() => {
            expect(screen.getByText(/Formato de email inválido/i)).toBeInTheDocument();
            expect(screen.getByText(/A senha precisa ter pelo menos 8 caracteres/i)).toBeInTheDocument();
        });
    });

    it("should display an error modal when login fails", async () => {
        const errorMessage = "Falha ao tentar fazer login. Verifique suas credenciais e tente novamente!";
        useLoginServiceMock.mockReturnValue({
            login: jest.fn(),
            errorLogin: {
                response: {
                    data: {
                        authenticated: false,
                        message: errorMessage
                    }
                }
            },
            isErrorLogin: true,
            isLoadingLogin: false
        });
        renderComponent();

        fireEvent.change(screen.getByPlaceholderText("email"), {
            target: { value: "xxxxx@gmail.com" }
        });
        fireEvent.change(screen.getByPlaceholderText("senha"), {
            target: { value: "1234567*" }
        });
        fireEvent.click(screen.getByRole("button"));

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });

});

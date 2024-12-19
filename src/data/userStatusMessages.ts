import { IMessages } from "../interfaces";

type errors = "CREATE_SUCCESS" | "CREATE_ERROR" | "UPDATE_SUCCESS" | "UPDATE_ERROR" | "LOGIN_ERROR";

export const USER_STATUS_MESSAGES: Record<errors, IMessages> = {
    "CREATE_SUCCESS": {
        status: "success",
        message: "Usuário cadastrado com sucesso!"
    },
    "CREATE_ERROR": {
        status: "error",
        message: "Ocorreu um erro ao cadastrar o usuário. Por favor, tente novamente."
    },
    "UPDATE_SUCCESS": {
        status: "success",
        message: "Perfil atualizado com sucesso!"
    },
    "UPDATE_ERROR": {
        status: "error",
        message: "Ocorreu um erro ao atualizar seu perfil. Tente novamente mais tarde."
    },
    "LOGIN_ERROR": {
        status: "error",
        message: "Falha ao tentar fazer login. tente novamente!"
    }
};

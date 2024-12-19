import { IMessages } from "../interfaces";

type errors = "CREATE_SUCCESS" | "CREATE_ERROR" | "UPDATE_SUCCESS" | "UPDATE_ERROR";

export const LINK_STATUS_MESSAGES: Record<errors, IMessages> = {
    "CREATE_SUCCESS": {
        status: "success",
        message: "Link adicionado com sucesso!"
    },
    "CREATE_ERROR": {
        status: "error",
        message: "Erro ao adicionar Link. Por favor, tente novamente."
    },
    "UPDATE_SUCCESS": {
        status: "success",
        message: "Link atualizado com sucesso!"
    },
    "UPDATE_ERROR": {
        status: "error",
        message: "Erro ao atualizar Link. Por favor, tente novamente."
    }
};

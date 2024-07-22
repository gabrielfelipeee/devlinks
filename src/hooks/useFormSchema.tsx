import { z } from "zod";

const useFormSchema = () => {
    const baseFormSchema = z.object({
        email: z.string()
            .min(1, "Insira seu email")
            .email("Formato de email inválido")
            .toLowerCase(),
        password: z.string()
            .min(8, "A senha precisa ter pelo menos 8 caracteres")
            .refine(value => {
                const specialCharacterRegex = /[!@#$%^&*(),.?":;{}|<>]/;
                return specialCharacterRegex.test(value);
            }, { message: "A senha deve conter pelo menos um caractere especial" })
    });

    const registerFormSchema = baseFormSchema.extend({
        name: z.string()
            .min(1, "Insira seu nome")
            .transform(name => { // Primeira letra de cada nome em uppercase e o restante em lowercase
                return name.trim() // Tira os espaços do início e fim
                    .split(" ") // Divide a string em uma lista ordenada de substrings
                    .map(word => word[0].toLocaleUpperCase() // Primeira letra de cada string em uppercase
                        .concat(word.substring(1).toLocaleLowerCase())) // Concatena a primeira letra com o restante (restante em lowercase)
                    .join(" "); // junta a lista em uma string
            })
            .refine(value => {
                const numbers = "0123456789";
                return !numbers.split("")
                    .some(num => value.includes(num))
            }, { message: "Seu nome não pode ter números" }),
    });
    const loginFormSchema = baseFormSchema;

    const cardFormSchema = z.object({
        platform: z.string()
            .refine(field => field.length > 1, { message: "Selecione uma opção" }),
        link: z.string().url("Insira uma URL válida")
    });



    return {
        loginFormSchema,
        registerFormSchema,
        cardFormSchema
    }
};
export default useFormSchema;

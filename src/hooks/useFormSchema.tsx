import { z, ZodType } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm, UseFormReturn } from "react-hook-form";


// Esquemas de validação de formulários

export const baseFormSchema = z.object({
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



// Esquema (validação) do formulário de cadastro de usuário
export const registerFormSchema = baseFormSchema;



// Esquema (validação) do formulário de login
export const loginFormSchema = baseFormSchema.omit({
    name: true // Remove o campo de name
});



// Esquema (validação) do formulário de cadastro de links
export const cardFormSchema = z.object({
    platform: z.string().min(1, "Selecione uma opção"),
    link: z.string().url("Insira uma URL válida")
});



// Esquema (validação) do formulário de atualização do usuário
export const profileFormSchema = baseFormSchema
    .omit({
        password: true // Remove o campo password
    })
    .extend({
        avatar: z.string().url("Insira uma URL válida") // Adiciona o campo de avatar
    });



export function useCustomForm<T extends FieldValues>(schema: ZodType<T, any, any>): UseFormReturn<T> {
    return useForm<T>({
        resolver: zodResolver(schema),
    });
};

export type CardFormData = z.infer<typeof cardFormSchema>;
export type LoginFormData = z.infer<typeof loginFormSchema>;
export type RegisterFormData = z.infer<typeof registerFormSchema>;
export type ProfileFormData = z.infer<typeof profileFormSchema>;

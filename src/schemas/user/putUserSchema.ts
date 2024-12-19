import { z } from "zod";
import { baseSchema } from "./baseSchema";

export const putUserSchema = baseSchema
    .omit({
        password: true // Remove o campo password
    })
    .extend({
        avatar: z.string().url("Insira uma URL válida"),
        slug: z.string().min(1, "Insira seu slug").transform(slug => slug.toLocaleLowerCase())
    });

import { baseSchema } from "./baseSchema";

export const loginSchema = baseSchema.omit({
    name: true // Remove o campo de name
});

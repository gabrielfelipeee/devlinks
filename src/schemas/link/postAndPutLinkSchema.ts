import { z } from "zod";

// Esquema para post e put de link
export const postAndPutLinkSchema = z.object({
    platform: z.string().min(1, "Selecione uma opção"),
    link: z.string().url("Insira uma URL válida")
});

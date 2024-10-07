import * as z from 'zod';


export const loginFormSchema = z.object({
    email: z.string()
    .min(1, {message: "O endereço de e-mail é obrigatório"})
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|com\.br)$/, "Por favor, digite um endereço de e-mail válido"),
    password: z.string()
    .min(1, {message: "A senha é obrigatória"})
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, "A senha deve ter de 6 a 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais."),
})


export type LoginSchema = z.infer<typeof loginFormSchema>
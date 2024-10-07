import * as z from 'zod';


export const signUpFormSchema = z.object({
    username: z.string()
    .min(3,{message: "O nome de usuário é obrigatório"})
    .regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,30}$/, "O nome de usuário deve ter entre 3 e 30 caracteres"),
    email: z.string().
    min(1,{message: "O endereço de e-mail é obrigatório"})
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|com\.br)$/, "Por favor, digite um endereço de e-mail válido"),
    password: z.string()
    .min(1,{message: "A senha é obrigatória"})
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, "A senha deve ter entre 6 e 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais"),
    confirmPassword: z.string()
    .min(1,{message: "Confirmação de senha é obrigatória"})
})
.refine(({ password, confirmPassword}) => password === confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"]
})


export type SignUpSchema = z.infer<typeof signUpFormSchema>
import * as z from 'zod';
export const loginFormSchema = z.object({
    email: z.string().
    min(1,{message: "e-mail adress is required"})
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|com\.br)$/, "please type a valid e-mail adress"),
    password: z.string()
    .min(1,{message: "Password is required"})
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, "password must be 6-8 characters, including uppercase, lowercase, number and special characters"),
})
export type LoginSchema = z.infer<typeof loginFormSchema>

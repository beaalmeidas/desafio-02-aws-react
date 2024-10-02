import * as z from 'zod';
const signUpFormSchema = z.object({
    username: z.string()
    .min(3,{message: "Username is required"})
    .regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,30}$/, "Username must be 3-30 characters"),
    email: z.string().
    min(1,{message: "e-mail adress is required"})
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|com\.br)$/, "please type a valid e-mail adress"),
    password: z.string()
    .min(1,{message: "Password is required"})
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, "password must be 6-8 characters, including uppercase, lowercase, number and special characters"),
    confirmPassword: z.string()
    .min(1,{message: "Password confirmation is required"})
})
.refine(({ password, confirmPassword}) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
})
export type SignUpSchema = z.infer<typeof signUpFormSchema>
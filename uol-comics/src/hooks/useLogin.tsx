import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, loginFormSchema } from '../schemas/LoginSchema';
export const useLogin = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm <LoginSchema> ({
        resolver: zodResolver(loginFormSchema),
    })
    return {register, handleSubmit, errors}
}
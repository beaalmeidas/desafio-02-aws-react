import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema, signUpFormSchema } from '../schemas/SignUpSchema';
export const useForms = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm <SignUpSchema> ({
        resolver: zodResolver(signUpFormSchema),
    })
    return {register, handleSubmit, errors}
}
import { useForms } from "../../../hooks/useSignUp"
import { SignUpSchema } from "../../../schemas/SignUpSchema"
interface SignUpProps{
    onSubmit: (data: SignUpSchema) => void
}
const FormSignUp = ({onSubmit}: SignUpProps) => {
    const {register, handleSubmit, errors} = useForms()
    
return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="FormFiels">
        <input type="text" id="name" placeholder="Nome completo" {...register("username")} className="name-input"/>
            {errors.username && <p className="error">{errors.username.message}</p>}
            <input type="email"  id="email" placeholder="Email" {...register("email")} className="e-mail-input"/>
            {errors.email && <p className="error">{errors.email.message}</p>}
            <input type="password" id="password" placeholder="Senha" {...register("password")} className="password-input"/>
            {errors.password && <p className="error">{errors.password.message}</p>}
            <input type="password"  id="confimPassword" placeholder="Confirme a senha" {...register("confirmPassword")} className="confirm-input"/>
            {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit" className="card-button">Criar conta</button>
    </form>
)
}

export default FormSignUp

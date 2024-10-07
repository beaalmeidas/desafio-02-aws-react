import { useLogin} from "../../../hooks/useLogin"
import { LoginSchema } from "../../../schemas/LoginSchema"
import "./styles.css"
interface LoginProps { //dados via props
    onSubmit: (data: LoginSchema) => void
}
const FormLogin = ({onSubmit}: LoginProps) => {
    const {register, handleSubmit, errors} = useLogin()

return ( //form com validação do zod
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="form-fiels">
        <input type="email" id="email" placeholder="Email" className="e-mail-input" {...register("email")}/>
        {errors.email && <p className="error">{errors.email.message}</p>}
        <input type="password" id="password" placeholder="Senha" className="password-input" {...register("password")}/>
        {errors.password && <p className="error">{errors.password.message}</p>}
    </div>
    <button type="submit" className="card-button">Entrar</button>
</form>
)
}

export default FormLogin

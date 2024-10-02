import { useLogin} from "../../../hooks/useLogin"
import { LoginSchema } from "../../../schemas/LoginSchema"

const FormLogin = () => {
    const {register, handleSubmit, errors} = useLogin()
    const onSubmit = (data: LoginSchema) =>{
        localStorage.setItem('userData', JSON.stringify(data));
    }
return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="FormFiels">
    <input type="email" id="email" placeholder="Email" {...register("email")}/>
    {errors.email && <p className="error">{errors.email.message}</p>}
    <input type="password" id="password" placeholder="Senha" {...register("password")}/>
    {errors.password && <p className="error">{errors.password.message}</p>}
    </div>
    <button type="submit" className="submit-button">Criar conta</button>
    <p className="createAccountText">Já tem uma conta? <a href="#">Clique aqui!</a></p>
</form>
)
}

export default FormLogin

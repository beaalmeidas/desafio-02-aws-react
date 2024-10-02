import { useForms } from "../../../hooks/useSignUp"
import { SignUpSchema } from "../../../schemas/SignUpSchema"
const FormSignUp = () => {
    const {register, handleSubmit, errors} = useForms()
    const onSubmit = (data: SignUpSchema) =>{
        localStorage.setItem('userData', JSON.stringify(data));
    }
return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="FormFiels">
        <input type="text" id="name" placeholder="Nome completo" {...register("username")} />
        {errors.username && <p className="error">{errors.username.message}</p>}
        <input type="email"  id="email" placeholder="Email" {...register("email")}/>
        {errors.email && <p className="error">{errors.email.message}</p>}
        <input type="password" id="password" placeholder="Senha" {...register("password")}/>
        {errors.password && <p className="error">{errors.password.message}</p>}
        <input type="password"  id="confimPassword" placeholder="Confirme a senha" {...register("confirmPassword")}/>
        {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit" className="submit-button">Criar conta</button>
        <p className="createAccountText">Já tem uma conta? <a href="#">Clique aqui!</a></p>
    </form>
)
}

export default FormSignUp

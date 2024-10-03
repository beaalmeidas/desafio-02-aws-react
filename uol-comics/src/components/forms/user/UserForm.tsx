import { useState } from "react"
import FormLogin from "../login/formLogin"
import FormSignUp from "../signup/formSignUp"
import { SignUpSchema } from "../../../schemas/SignUpSchema"
import { LoginSchema } from "../../../schemas/LoginSchema"
import { useNavigate } from "react-router-dom"

const UserForm = () => {
    const [isUserLogged, setIsUserLogged] = useState(true)
    const pageNavegation = useNavigate()
    const handleUserLogin = (data: LoginSchema) => {
        localStorage.setItem("UserLogInInfo", JSON.stringify(data))
        pageNavegation("/")
    }
    const handleUserSignIn = (data: SignUpSchema) => {
        localStorage.setItem("userSignInInfo", JSON.stringify(data))
        pageNavegation("/")
    }
    return (
    <div>
        <h1>{isUserLogged ? "Escolha seu herói" : "Crie seu herói"}</h1>
        {isUserLogged ? (<FormLogin onSubmit={handleUserLogin}/>) : 
            (<FormSignUp onSubmit={handleUserSignIn} />)}
        <p>{isUserLogged ? "Ainda não tem uma conta?" : "já tem uma conta?"}
            <a href="#" onClick={() => setIsUserLogged(!isUserLogged)}>
                {isUserLogged? "Clique aqui!": "Clique aqui!"}
            </a>
        </p>
    </div>
    )
}
export default UserForm;
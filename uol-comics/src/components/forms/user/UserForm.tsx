import { useState } from "react"
import FormLogin from "../login/formLogin"
import FormSignUp from "../signup/formSignUp"
import { SignUpSchema } from "../../../schemas/SignUpSchema"
import { LoginSchema } from "../../../schemas/LoginSchema"
import { useNavigate } from "react-router-dom"
import "./styles.css"

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
    <div className="main-container">
        <div className="main-image">
            <img src="../../../../public/assets/images/spider-man.png" alt="spider-man" className="spider-man-image" />
        </div>
        <div>
        <div className="page-logo">
            <img src="../../../../public/assets/images/uol-comics-logo.png" alt="Uol comics logo" className="uol-comics-logo" />
        </div>
        <div className={`card ${isUserLogged ? 'login-card' : 'signup-card'}`}>
        <h1 className="card-title">{isUserLogged ? "Escolha seu herói" : "Crie seu herói"}</h1>
        {isUserLogged ? (<FormLogin onSubmit={handleUserLogin}/>) : 
            (<FormSignUp onSubmit={handleUserSignIn} />)}
        <p className="card-text">{isUserLogged ? "Ainda não tem uma conta?" : "já tem uma conta?"}
            <a className=" card-text card-link" href="#" onClick={() => setIsUserLogged(!isUserLogged)}>
                {isUserLogged? "Clique aqui!": "Clique aqui!"}
            </a>
        </p>
        </div>
        </div>
        </div>
    )
}
export default UserForm;
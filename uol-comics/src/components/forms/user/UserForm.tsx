import { useState } from "react"
import FormLogin from "../login/formLogin"
import FormSignUp from "../signup/formSignUp"
import { SignUpSchema } from "../../../schemas/SignUpSchema"
import { LoginSchema } from "../../../schemas/LoginSchema"
import { useNavigate } from "react-router-dom"
import "./styles.css"
//iniciando a alternancia entre cada form e seu schema
const UserForm = () => {
    const [isUserLogged, setIsUserLogged] = useState(true)
    const [loadingPage, setLoadingPage] = useState(false)
    const pageNavegation = useNavigate()
    const handleUserLogin = async (data: LoginSchema) => {
        setLoadingPage(true)
        try{
            await new Promise((res) => setTimeout(res,4000)) // 4s de resposta para ambos
            localStorage.setItem("UserLogInInfo", JSON.stringify(data)) 
            alert("Login finalizado com sucesso!") //resposta visual para usuário
            pageNavegation("/comics-list") 
        }finally{
            setLoadingPage(false)
    }
}
    const handleUserSignIn = async (data: SignUpSchema) => {
        setLoadingPage(true)
        try{
            await new Promise((res) => setTimeout(res,4000))
            localStorage.setItem("userSignInInfo", JSON.stringify(data))
            alert("Cadastro finalizado com sucesso!")
            pageNavegation("/comics-list")
        }finally{
            setLoadingPage(false)
        }
    }
    return (
        //renderizando condicionalmente cada fom
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
            {loadingPage && <p className="loading-text">{isUserLogged ? "Aguarde. Logando na sua conta...": "Aguarde. Criando conta..."}</p>} 
            {/* resposta visual para o usuário que o login/cadastro funciona */}
        <p className="card-text">{isUserLogged ? "Ainda não tem uma conta?" : "Já tem uma conta?"}
            <a className=" card-text card-link" href="#" onClick={() => setIsUserLogged(!isUserLogged)}>
                {isUserLogged? " Clique aqui!": " Clique aqui!"}
            </a>
        </p>
        </div>
        </div>
        </div>
    )
}
export default UserForm;
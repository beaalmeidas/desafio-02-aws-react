const FormSignUp = () => {
return (
    <form action="">
        <div className="FormFiels">
        <input type="text" name="name" id="name" placeholder="Nome completo" />
        <input type="email" name="email" id="email" placeholder="Email" />
        <input type="password" name="password" id="password" placeholder="Senha"/>
        <input type="password" name="confirmPassword" id="confimPassword" placeholder="Confirme a senha" />
        </div>
        <button type="submit" className="submit-button">Criar conta</button>
        <p className="createAccountText">Já tem uma conta? <a href="#">Clique aqui!</a></p>
    </form>
)
}

export default FormSignUp

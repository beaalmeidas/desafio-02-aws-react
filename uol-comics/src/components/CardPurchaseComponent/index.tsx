import { useState } from 'react'
import './style.css'
import axios from 'axios'
import { CepProps } from '../../types/cep'
import { innerBrazil } from '../../types/uf'
// import { FaExclamationCircle } from 'react-icons/fa';
// import { toast } from 'react-toastify'

const CardPurchaseComponent = () => 
{
    //const [ceps, setCeps] = useState<string[]>([])
    const [cepS, setCepS] = useState('')
    const [data, setData] = useState<CepProps | null>(null)
    const [isValidCep, setIsValidCep] = useState(false)
    const [adress, setAdress] = useState('')
    const [unity, setUnity] = useState('')
    const [extras, setExtras] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [hood, setHood] = useState('')
    const [choice ,setChoice] = useState('')

    const getCeps = async (cepString: string) =>
    {
        try
        {
            const response = await axios.get(`https://viacep.com.br/ws/${cepString}/json/`)
            if(response.status === 404)
            {
                toast.error('O CEP não foi encontrado, verifique-o e tento novamente.')
                //setError(true)
                setIsValidCep(false)
                return
            }
            if(cepString.length != 8)
            {
                toast.error('CEP inválido, por favor, digite apenas um '
                    + 'número de 8 dígitos. Sem o uso de caracteres especiais como -, @, #, !')
                setIsValidCep(false)
                return
            }
            console.log(response.data)
            setData(response.data)

            const 
            { 
                bairro, cep, complemento,
                localidade, logradouro,
                uf, unidade 
            } = response.data
            const cepData: CepProps = 
            {
                bairro, cep, complemento,
                localidade, logradouro,
                uf, unidade 
            }
            setCepS(cepData.cep)
            setIsValidCep(true)
        }
        catch (error)
        {
            toast.success('Não foi possível buscar as informações do seu CEP.\nMOTIVO:' + error)
        }
    }

    const handleSubmitCEP = (e) => {
        e.preventDefault()
        getCeps(cepS)
    }

    return (
        <div className='main'>
            <div><h1>Comprar</h1></div>
            <div className='formDiv'>
                <div>
                    <p>Endereço de entrega</p>
                    <p>Informe o endereço onde deseja receber seu pedido</p>
                </div>
                <form onSubmit={handleSubmitCEP}>
                    <div className='inputsCep'>
                        <FaExclamationCircle/>
                        <p className='smallAlert'>Para uma experiência mais fluida, preencha o CEP primeiro ;^)</p>
                        <input
                        onBlur={() => getCeps(cepS)}
                        value={cepS}
                        onChange={(e) => setCepS(e.target.value)} 
                        type="text"
                        required 
                        placeholder='CEP (apenas números)'/>
                        <button type='submit'>enviar</button>
                        <input
                        value={isValidCep && data ? data.logradouro : adress}
                        onChange={(e) => setAdress(e.target.value)}
                        type="text" 
                        required
                        placeholder='Endereço' />
                        <input
                        value={isValidCep && data ? data.unidade : unity}
                        type="text" 
                        onChange={(e) => setUnity(e.target.value)}
                        required
                        placeholder='Número do endereço' />
                        <input 
                        value={isValidCep && data ? data.complemento : extras}
                        type="text"
                        onChange={(e) => setExtras(e.target.value)}
                        required
                        placeholder='Complemento' />
                        <input 
                        value={isValidCep && data ? data.bairro : hood}
                        type="text"
                        onChange={(e) => setHood(e.target.value)}
                        required
                        placeholder='Bairro' />
                        <input 
                        value={isValidCep && data ? data.localidade : city}
                        type="text"
                        onChange={(e) => setCity(e.target.value)}
                        required
                        placeholder='Cidade' />
                        <select
                        onChange={(e) => setState(e.target.value)}
                        required
                        value={data?.uf && state}>
                        {
                            innerBrazil.map((uf) => 
                            (
                                <option key={uf.sigla} value={uf.sigla}>{uf.sigla}</option>
                            ))
                        }
                        </select>
                    </div>
                    
                    <div className='purchaseChoice'>
                        <div>
                            <p>Pagamento</p>
                            <p>O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
                        </div>
                        <div>
                            <input type='button' value='CARTÃO DE CRÉDITO' 
                            onClick={() => setChoice('CARTÃO DE CRÉDITO')}
                            className={choice === 'CARTÃO DE CRÉDITO' ? 'theOne' : 'npc'}/>
                            
                            <input type='button' value='CARTÃO DE DÉBITO' 
                            onClick={() => setChoice('CARTÃO DE DÉBITO')} 
                            className={choice === 'CARTÃO DE DÉBITO' ? 'theOne' : 'npc'}/>
                            
                            <input type='button' value='DINHEIRO' 
                            onClick={() => setChoice('DINHEIRO')}
                            className={choice === 'DINHEIRO' ? 'theOne' : 'npc'}/>
                        </div>
                    </div>
                    
                    <div className='finishPurchase'>
                        <div>
                            <p>Total de itens</p>
                            <p>R$0,00</p>
                        </div>
                        <div>
                            <p>Total de itens</p>
                            <p>R$0,00</p>
                        </div>
                        <div>
                            <p>Total</p>
                            <p>R$0,00</p>
                        </div>
                        <div>
                            <button type='submit'>Finalizar compra</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default CardPurchaseComponent

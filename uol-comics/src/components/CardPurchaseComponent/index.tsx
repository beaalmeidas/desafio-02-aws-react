import React,{ useState } from 'react'
import './style.css'
import axios from 'axios'
import { CepProps } from '../../types/cep'
import { innerBrazil } from '../../types/uf'
import { FaExclamationCircle } from 'react-icons/fa';
import { toast } from 'react-toastify'
import { makeItRandom } from '../../types/random'
import Header from "../header"

const CardPurchaseComponent: React.FC = () => 
{
    //const [ceps, setCeps] = useState<string[]>([])
    const [cepS, setCepS] = useState('')
    const [data, setData] = useState<CepProps | null>(null)
    const [isValidCep, setIsValidCep] = useState(false)
    const [adress, setAdress] = useState('')
    const [unity, setUnity] = useState('')
    const [extraInfo, setExtraInfo] = useState('')
    const [city, setCity] = useState('')
    const [ufs, setUfs] = useState('')
    const [hood, setHood] = useState('')
    const [choice ,setChoice] = useState('')
    const [dontChangeRandomNum, setDontChangeRandomNum] = useState(makeItRandom(3, 30))

    const getCeps = async (cepString: string) =>
    {
        //Agonia desnecessária desse TypeScript
        setDontChangeRandomNum(makeItRandom(3, 30))
        try
        {
            const response = await axios.get(`https://viacep.com.br/ws/${cepString}/json/`)
            if(response.status === 500)
            {
                toast.error('Alguém tropeçou em um dos cabos do nosso servidor, '
                    +'por favor tente realizar essa compra novamente mais tarde...')
            }

            if(response.status === 404)
            {
                toast.error('O CEP não foi encontrado, verifique-o e tento novamente.')
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

    const handleSubmitCEP = (e: React.FormEvent) => {

        e.preventDefault()

        let noInfoErrorMsg = `ATENÇÃO: os seguintes campos não foram preenchidos:`
        const emptyFields = 
        [
            { value: adress, label: 'Endereço' },
            { value: unity, label: 'Número do endereço' },
            { value: hood, label: 'Bairro' },
            { value: city, label: 'Cidade' },
            { value: ufs, label: 'Estado' },
        ].filter(field => field.value === '');

        if(emptyFields.length === 5)
        {
            toast.error('Preencha os campos do formulário!')
            return
        }
        else if(emptyFields.length > 0)
        {
            emptyFields.forEach((field) => 
            {
                    if(emptyFields.length === 1) 
                    { 
                        return toast.error(`ATENÇÃO:
                        o seguinte campo não foi preenchido: ${field.label}`)
                    }
                    else
                    {
                        noInfoErrorMsg += `\n- ${field.label}`
                        return toast.error(noInfoErrorMsg)
                    }
            })
            return
        }
            
        toast.success('Suas informações foram aceitas com sucesso!')
        getCeps(cepS)
    }

    // const finishThePurchase = () => {
    //     navegate('../FinishedPurComponent/index.tsx')
    // }

    return (
        <div className='main'>
            <Header showFilter={true}/>
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
                        placeholder='CEP (apenas números)'/>
                        <button type='submit'>enviar</button>
                        <input
                        value={isValidCep && data ? data.logradouro : adress}
                        onChange={(e) => setAdress(e.target.value)}
                        type="text" 
                        placeholder='Endereço' />
                        <input
                        value={isValidCep && data ? data.unidade : unity}
                        type="text" 
                        onChange={(e) => setUnity(e.target.value)}
                        placeholder='Número do endereço' />
                        <input 
                        value={isValidCep && data ? data.complemento : extraInfo}
                        type="text"
                        onChange={(e) => setExtraInfo(e.target.value)}
                        placeholder='Complemento' />
                        <input 
                        value={isValidCep && data ? data.bairro : hood}
                        type="text"
                        onChange={(e) => setHood(e.target.value)}
                        placeholder='Bairro' />
                        <input 
                        value={isValidCep && data ? data.localidade : city}
                        type="text"
                        onChange={(e) => setCity(e.target.value)}
                        placeholder='Cidade' />
                        <select
                        onChange={(e) => setUfs(e.target.value)}
                        value={data?.uf && ufs}>
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
                            <input id='btn1' type='button' value='CARTÃO DE CRÉDITO' 
                            onClick={() => setChoice('Cartão de Crédito')}
                            className={choice === 'Cartão de Crédito' ? 'theOne' : 'npc'}/>
                            
                            <input id='btn2' type='button' value='CARTÃO DE DÉBITO' 
                            onClick={() => setChoice('Cartão de Débito')} 
                            className={choice === 'Cartão de Débito' ? 'theOne' : 'npc'}/>
                            
                            <input id='btn3' type='button' value='DINHEIRO' 
                            onClick={() => setChoice('Dinheiro')}
                            className={choice === 'Dinheiro' ? 'theOne' : 'npc'}/>
                        </div>
                    </div>
                    
                    <div className='finishPurchase'>
                        <div>
                            <p>Total de itens</p>
                            <p>R$00,00</p>
                        </div>
                        <div>
                            <p>Entrega</p>
                            <p>R${dontChangeRandomNum}</p>
                        </div>
                        <div>
                            <p>Total</p>
                            <p>R$00,00</p>
                        </div>
                        <div>
                            <button type='submit' >Finalizar compra</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default CardPurchaseComponent

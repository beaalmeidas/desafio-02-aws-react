import React,{ useState, useRef } from 'react'
import './style.css'
import axios from 'axios'
import { CepProps } from '../../types/cep'
import { innerBrazil } from '../../types/uf'
import {    FaExclamationCircle, FaCreditCard, FaMoneyBill,
            FaUniversity, FaDollarSign, FaMapMarkerAlt      } from 'react-icons/fa'

import { toast } from 'react-toastify'
import { makeItRandom } from '../../types/random'
import Header from "../header"
import "react-toastify/dist/ReactToastify.minimal.css"
import { useNavigate } from 'react-router-dom'

export interface InfoToFinish extends CepProps {
    getExtraInfo: string
    getChoice : string
    getAdress: string
    getUnity: string
    getCity: string
    getHood: string
    getUfs: string

}

const CardPurchaseComponent: React.FC = () => 
{
    //const [ceps, setCeps] = useState<string[]>([])
    const [cepS, setCepS] = useState('')
    const [data, setData] = useState<CepProps | null>(null)
    //const [isValidCep, setIsValidCep] = useState(false)
    const [adress, setAdress] = useState('')
    const [unity, setUnity] = useState('')
    const [extraInfo, setExtraInfo] = useState('')
    const [city, setCity] = useState('')
    const [ufs, setUfs] = useState('')
    const [hood, setHood] = useState('')
    const [choice ,setChoice] = useState('')
    
    const dontChangeRandomNum = useRef(makeItRandom(3, 30, false)).current
    const navigate = useNavigate();

    const getCeps = async (cepString: string) =>
    {
        try
        {
            const response = await axios.get(`https://viacep.com.br/ws/${cepString}/json/`)
            
            if(response.status === 500)
            {
                toast.error('Alguém tropeçou em um dos cabos do nosso servidor, '
                    +'por favor tente realizar essa compra novamente mais tarde...')
            }
            // if(cepString.length !== 8)
            // {
            //     toast.error('CEP inválido, por favor, digite apenas um '
            //         + 'número de 8 dígitos. Sem o uso de caracteres especiais como -, @, #, !')
            //     setIsValidCep(false)
            //     return
            // }
            if(response.status === 404)
            {
                toast.error('O CEP não foi encontrado, verifique-o e tento novamente.')
                //setIsValidCep(false)
                return
            }

            console.log(response.data)
            setData(response.data)

            const { bairro, cep, complemento, localidade, logradouro, uf, unidade } = response.data;
            setData(response.data);
            
            setAdress(logradouro)
            setUnity(unidade)
            setExtraInfo(complemento)
            setCity(localidade)
            setUfs(uf)
            setChoice(choice)
            setHood(bairro)            
            setCepS(cep)
            //setIsValidCep(true)
            console.log(data)
        }
        catch (error)
        { toast.error('Não foi possível buscar as informações do seu CEP.\nMOTIVO: ' + error)}
    }

    const handleAutoFill = () => {
        if (cepS.length === 8) 
            { 
                getCeps(cepS) 
                return
            }
        toast.warn('Por favor, insira um CEP válido de 8 dígitos.')
        
    }

    const handleSubmitCEP = (e: React.FormEvent) => {

        e.preventDefault()

        let noInfoErrorMsg = `ATENÇÃO: os seguintes campos não foram preenchidos:`
        const emptyFields = 
        [
            { value: cepS, label: 'CEP'},
            { value: adress, label: 'Endereço' },
            { value: unity, label: 'Número do endereço' },
            { value: hood, label: 'Bairro' },
            { value: city, label: 'Cidade' },
            { value: choice, label: 'Método de pagamento' }
        ].filter(field => field.value === '');

        if(emptyFields.length === 6)
        {
            return toast.warn(
            <div className='warningForm'>
                <FaExclamationCircle className='warFormIcon'/>
                <p>Preencha os campos do formulário!</p>
            </div>,
            {
                icon: false,
            })
        }
        else if(emptyFields.length > 0)
        {
            emptyFields.forEach((field) => 
            {
                if(emptyFields.length === 1) 
                { 
                    toast.warn(
                    <div className='warningForm'>
                        <FaExclamationCircle className='warFormIcon'/>
                        <p>{`ATENÇÃO: o seguinte campo não foi preenchido: [${field.label}]`}</p>
                    </div>,
                    {
                        icon: false,
                        pauseOnHover: true   
                    })
                    return
                }
                else if(emptyFields.length > 1 && emptyFields.length < 6) 
                { 
                    noInfoErrorMsg += `\n-${field.label};` 
                }
            })

            if(emptyFields.length > 1)
            {
                toast.warn(
                    <div className='warningForm'>
                        <FaExclamationCircle className='warFormIcon'/>
                        <div>
                            {noInfoErrorMsg.split('\n').map((line) => 
                            (<p>{line}</p>))}
                        </div>
                    </div>,
                    {
                        icon: false,
                        pauseOnHover: true
                    } 
                )

            }
            return
        }

        const infoToFinish: InfoToFinish = {
            ...data!,
            getAdress: adress,
            getUnity: unity,
            getCity: city,
            getUfs: ufs,
            getExtraInfo: extraInfo,
            getHood: hood,
            getChoice: choice
        }

        toast.success('Suas informações foram aceitas com sucesso!')
        getCeps(cepS)
        navigate('/finished-pur-page', { state: infoToFinish })

    }

    return (
        <>

            <Header sendFilter={()=>{}} showFilter={false}/>
            <div className='main' style={{marginTop: '128px'}}>
                <div className='title'><h1>Comprar</h1></div>
                <div className='formDiv'>
                    <form onSubmit={handleSubmitCEP}>
                        <div className='formPart1'>
                            <div>
                                <div className='aboutText'>
                                    <FaMapMarkerAlt className='iconEnd1'/>
                                    <div>
                                        <p>Endereço de entrega</p>
                                        <p>Informe o endereço onde deseja receber seu pedido</p>
                                    </div>
                                </div>
                                {/* <div>
                                    <FaExclamationCircle className='iconTip'/>
                                    <small className='smallAlert'>Para uma experiência mais fluida, preencha o CEP primeiro ;^)</small>
                                </div> */}
                                <div className='inputsCep'>
                                    <input
                                    className='item inp1'
                                    id='inp1'
                                    value={cepS}
                                    onBlur={handleAutoFill}
                                    onChange={(e) => setCepS(e.target.value)}
                                    type="text" 
                                    placeholder='CEP'/>
                                    <input
                                    className='item inp2'
                                    id='inp2'
                                    value={adress}
                                    onChange={(e) => setAdress(e.target.value)}
                                    type="text" 
                                    placeholder='Endereço' />
                                    <input
                                    className='item inp3'
                                    id='inp3'
                                    value={unity}
                                    type="text" 
                                    onChange={(e) => setUnity(e.target.value)}
                                    placeholder='Número do endereço' />
                                    <input
                                    className='item inp4' 
                                    id='inp4'
                                    value={extraInfo}
                                    type="text"
                                    onChange={(e) => setExtraInfo(e.target.value)}
                                    placeholder='Complemento' />
                                    <input
                                    className='item inp5' 
                                    id='inp5'
                                    value={hood}
                                    type="text"
                                    onChange={(e) => setHood(e.target.value)}
                                    placeholder='Bairro' />
                                    <input
                                    className='item inp6' 
                                    id='inp6'
                                    value={city}
                                    type="text"
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder='Cidade' />
                                    <select
                                    className='item inp7'
                                    id='inp7'
                                    onChange={(e) => setUfs(e.target.value)}
                                    value={ufs}>
                                    {
                                        innerBrazil.map((uf) => 
                                        (
                                            <option key={uf.sigla} value={uf.sigla}>{uf.sigla}</option>
                                        ))
                                    }
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div className='formPart2'>
                            <div className='aboutText'>
                                <FaDollarSign className='iconEnd'/>
                                <div>
                                    <p>Pagamento</p>
                                    <p>O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
                                </div>
                            </div>
                            <div className='purchaseBtns'>
                               <div onClick={() => setChoice('Cartão de Crédito')} 
                               className={choice === 'Cartão de Crédito' ? 'theOne' : 'npc'}>
                                    <FaCreditCard className='iconBtn'/>
                                    <input id='btn1' type='button' value='CARTÃO DE CRÉDITO' />
                               </div>
                                <div onClick={() => setChoice('Cartão de Débito')} 
                                className={choice === 'Cartão de Débito' ? 'theOne' : 'npc'}>
                                    <FaUniversity className='iconBtn'/>
                                    <input id='btn2' type='button' value='CARTÃO DE DÉBITO' />
                                </div>
                                <div onClick={() => setChoice('Dinheiro')} 
                                className={choice === 'Dinheiro' ? 'theOne' : 'npc'}>
                                    < FaMoneyBill className='iconBtn'/>
                                    <input id='btn3' type='button' value='DINHEIRO' />
                                </div>
                            </div>
                        </div>
                        
                    </form>
                </div>
                <div className='formPart3'>
                    <div>
                        <div>
                            <p>Total de itens</p>
                            <p>R$00,00</p>
                        </div>
                        <div>
                            <p>Entrega</p>
                            <p>R${dontChangeRandomNum}</p>
                        </div>
                        <div className='totalPrice'>
                            <p>Total</p>
                            <p>R$00,00</p>
                        </div>
                    </div>
                </div>
                <div className='divBtnF'>
                    <button className='btnF' type='submit' onClick={handleSubmitCEP}>Finalizar compra</button>
                </div>
            </div>
        </>
        
    )
}


export default CardPurchaseComponent
                
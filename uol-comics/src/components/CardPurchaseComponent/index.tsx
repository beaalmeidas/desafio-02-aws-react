import React, { useEffect, useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import './style.css'

const index = () => {
    const [ceps, setCeps] = useState<string[]>([])
    const [cep, setCep] = useState<string>('')



    return (
        <div className='main'>
            <div><h1>Comprar</h1></div>
            <div>
                <form>
                    <div className='mainInfo'>
                        <div className='cardEnd1'>
                            <div className='endText'>
                                <div><FaMapMarkerAlt className='locIcon'/></div>
                                <div>
                                    <p>Endereço de Entrega</p>
                                    <p>Informe o endereço de onde deseja receber seu pedido</p>
                                </div>
                            </div>

                            <div className='endInput'>
                                <input type="text" required/>
                                <input type="text" required/>
                                <input type="text" required/>
                                <input type="text" required/>
                                <select required>
                                    <option value="">xx</option>
                                </select>
                                <select required>
                                    <option value="">yy</option>
                                </select>
                                <select required>
                                    <option value="">ww</option>
                                </select>
                            </div>
                        </div>
                        <div className='cardEnd2'>
                            <div>
                                <p>Pagamento</p>
                                <p>O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
                                <div>
                                    <button className='purWay'>CARTÃO DE CRÉDITO</button>
                                    <button className='purWay'>CARTÃO DE DÉBITO</button>
                                    <button className='purWay'>DINHEIRO</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='divFinish'>
                        <div className='contentFinish'>
                            <div className='finish'>
                                <p>Total de itens</p>
                                <p>R$00,00</p>
                            </div>
                            <div className='finish'>
                                <p>Entrega</p>
                                <p>R$00,00</p>
                            </div>
                            <div className='finish'>
                                <p>Total</p>
                                <p>R$00,00</p>
                            </div>
                            <button className='finishBtn'>Finalizar compra</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default index

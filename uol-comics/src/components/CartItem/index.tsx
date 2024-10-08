import { useEffect, useRef, useState } from 'react'
import './style.css'

type Prop = {
    id: number,
    image: string,
    title: string,
    originalPrice: number,
    count: number,
    setQuant: (id: number,quant:number) => void;
}

const CartItem = ({id, image, title, originalPrice, count, setQuant}: Prop) => {
    const [itemPrice,setItemPrice] = useState<number>(originalPrice)
    const [baseCount, setBaseCount] = useState<number>(count)

    const countElemnt = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        if (countElemnt.current){
            setItemPrice(parseInt(countElemnt.current.innerHTML) * originalPrice)
            setQuant(id,parseInt(countElemnt.current.innerHTML))
        }
    },[originalPrice, baseCount])

    return (
        <div className='item-on-cart'>
            <div className='item-information'>
                <img src={image} alt="miniatura"/>
                <div className='text-information'>
                    <h3 className='font-medium'>{title}</h3>
                    <div className='counter'>
                        <button className='counter-button normal-button'
                        onClick={() => {setBaseCount(baseCount - 1)}}>-</button>

                        <p className='count font-semi-bold' ref={countElemnt}>{baseCount}</p>

                        <button className='counter-button normal-button'
                        onClick={()=>{setBaseCount(baseCount + 1)}}>+</button>
                    </div>
                </div>
            </div>

            <button className='delete-icon'>
                <img alt='delete' src='./assets/images/trash-icon.png'/>
            </button>
            <h3 className='price font-extra-bold'>{itemPrice.toFixed(2)}</h3>
        </div>
    )
}
export default CartItem
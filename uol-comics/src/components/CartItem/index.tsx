import { useEffect, useState } from 'react'
import './style.css'

type Prop = {
    image: string,
    title: string,
    originalPrice: number,
    count: number
}

const CartItem = ({image, title, originalPrice, count}: Prop) => {
    const [itemPrice,setItemPrice] = useState(originalPrice)
    const [baseCount, setBaseCount] = useState(count)

    useEffect(()=> {
        setBaseCount(count)
    },[])

    useEffect(() => {
        setItemPrice(baseCount * originalPrice)
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

                        <p className='count font-semi-bold'>{baseCount}</p>

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
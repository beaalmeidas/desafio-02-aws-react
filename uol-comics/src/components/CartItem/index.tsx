import './style.css'

const CartItem = () => {

    return (
        <div className='item-on-cart'>
            

            <div className='item-information'>
                <img src='./assets/images/uol-logo.png' alt="miniatura"/>
                <div className='text-information'>
                    <h3 className='font-medium'>The amazing spiderman</h3>
                    <div className='counter'>
                        <button className='counter-button normal-button'>-</button>
                        <p className='count font-semi-bold'>2</p>
                        <button className='counter-button normal-button'>+</button>
                    </div>
                </div>
            </div>

            <button className='delete-icon'></button>
            <h3 className='price font-extra-bold'>$34,90</h3> 
        </div>
    )
}
export default CartItem
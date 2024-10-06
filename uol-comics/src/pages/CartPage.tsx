import { useState } from 'react';
import './generalStyle.css'
import CartItem from '../components/CartItem';

type BuyableItems = {
    id: number,
    name: string,
    price: number,
    quantity: number,
    img: string,
}

const CartPage = () => {
    const [cartItems, setCartItems] = useState<Array<BuyableItems>>([])
    
    return (
        <> 
            <h2 className="cart-page-title font-extra-bold">Meu Carrinho</h2>
            {cartItems.length > 0 && (
                <section className="cart-items">
                    {cartItems.map(item=>(
                        <CartItem
                        key={item.id}
                        title={item.name}
                        image={item.img}
                        originalPrice={item.price}
                        count={item.quantity}
                        />
                    ))}
                </section>
            )}
            {cartItems.length === 0 && (
                <section className="empty-cart-page">
                    <img src="./assets/images/icon-shopping-cart.png" alt="carrrinho"/>
                    <h2 className="cart-page-title font-extra-bold">Carrinho Vazio :(</h2>
                    <p className="font-semi-bold">Adicione alguns itens no seu carrinho!</p>
                </section>
            )}
        </>
    )
}

export default CartPage;
import { useState } from 'react';
import './generalStyle.css'
import ComicCard from '../components/comic-card/comic-card';
import CardPurchaseComponent from '../components/CardPurchaseComponent';
import CartItem from '../components/CartItem';

type BuyableItems = {
    id: number,
    name: string,
    price: number,
    quantity: number
}

const CartPage = () => {
    
    const testArray = [
        {id: 1, name: "Como treinar seu dragão", price: 20.9, quantity: 2},
        {id: 2, name: "AAAAAAAAAAAa", price: 20.9, quantity: 5},
        {id: 3, name: "ffffffffffffffo", price: 20.9, quantity: 2},
        {id: 4, name: "Como treaaaaaainar seu dragão", price: 20.9, quantity: 1}
    ]

    const [cartItems, setCartItems] = useState<Array<BuyableItems>>(testArray)
    
    return (
        <> 
            <h2 className="cart-page-title font-extra-bold">Meu Carrinho</h2>
            {cartItems.length > 0 && (
                <section className="cart-items">
                    {cartItems.map(item=>(
                        <CartItem/>
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
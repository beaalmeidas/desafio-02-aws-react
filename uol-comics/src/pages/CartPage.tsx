import { useEffect, useState } from 'react';
import './generalStyle.css'
import CartItem from '../components/CartItem';
import Header from '../components/header';

type BuyableItems = {
    id: number,
    name: string,
    price: number,
    quantity: number,
    img: string,
}

const CartPage = () => {
    const [cartItems, setCartItems] = useState<Array<BuyableItems>>([])
    
    const filterReturn = (filterValue: string) => {
        console.log(filterValue)
    }

    useEffect(() => {
        const cartItemsString = localStorage.getItem('cartItems');
        const cartItemsArray = cartItemsString ? JSON.parse(cartItemsString) : [];
        console.log(cartItemsArray);

    },[])

    return (
        <> 
            <Header sendFilter={filterReturn} showFilter={false}/>
            
            {cartItems.length > 0 && (
                <section className="cart-items">
                    <h2 className="cart-page-title font-extra-bold">Meu Carrinho</h2>
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
                    <h2 className="cart-page-title font-extra-bold">Meu Carrinho</h2>
                    <img src="./assets/images/icon-shopping-cart.png" alt="carrrinho"/>
                    <h2 className="cart-page-title font-extra-bold">Carrinho Vazio :(</h2>
                    <p className="font-semi-bold">Adicione alguns itens no seu carrinho!</p>
                </section>
            )}
        </>
    )
}

export default CartPage;
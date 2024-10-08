import { useEffect, useState } from 'react';
import './generalStyle.css'
import CartItem from '../components/CartItem';
import Header from '../components/header';
import { forceIntMakeItRandom } from '../types/random';

type BuyableItems = {
    id: number,
    title: string,
    price: number,
    quant: number,
    image: string,
}

const CartPage = () => {
    const [cartItems, setCartItems] = useState<Array<BuyableItems>>([])

    const testItems = () => {
        const cartItemsString = localStorage.getItem('cartItems');
        const cartItemsArray = cartItemsString ? JSON.parse(cartItemsString) : [];
        setCartItems(cartItemsArray)
    }
    useEffect(testItems,[])

    const modifyQuantLocalStorage = (id: number, quant: number) => {
        const foundedIndex = cartItems.findIndex((item) => {
            return item.id === id;
        })

        if (foundedIndex > -1) {
            cartItems[foundedIndex].quant = quant

            localStorage.setItem('cartItems', JSON.stringify(cartItems))
        }
    }
    const deleteCartItem = (id: number, divToDelete: HTMLDivElement) => {
        const foundedIndex = cartItems.findIndex((item) => {
            return item.id === id;
        })

        if (foundedIndex > -1){
            cartItems.splice(foundedIndex, 1)

            localStorage.setItem('cartItems', JSON.stringify(cartItems))

            divToDelete.remove()
            testItems();
        }
    }

    return (
        <> 
            <Header sendFilter={()=>{}} showFilter={false}/>
            
            {cartItems.length > 0 && (
                <section className="cart-items">
                    <h2 className="cart-page-title font-extra-bold">Meu Carrinho</h2>
                    {cartItems.map(item=>{
                        return(
                            <CartItem
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            originalPrice={item.price > 0 ? item.price : forceIntMakeItRandom(5,40)}
                            count={item.quant}
                            setQuant={modifyQuantLocalStorage}
                            deleteItem={deleteCartItem}
                            />
                        )
                    })}
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
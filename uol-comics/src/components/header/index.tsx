import { useEffect, useRef, useState } from 'react';
import './style.css'

type Props = {
    showFilter: boolean
    sendFilter: (filterValue: string) => void
}

const Header = (props: Props) => {
    const {showFilter,sendFilter} = props

    // Modify States
    const [filterState, setFilterState] = useState(true)
    const [hasCartItem, setHasCartItem] = useState(false)

    useEffect(()=>{
        setFilterState(showFilter)
    },[props])

    // Defaul functions
    const [cartImage,setCartImage] = useState('./assets/svg/cart.svg');
    const [logoutImage,setLogoutImage] = useState('./assets/images/logout.png');

    const filterInputRef = useRef<HTMLInputElement>(null);

    const handleFilter = () => {
        if (filterInputRef.current !== null){
            sendFilter(filterInputRef.current.value)
        }
    }

    return (
        <header>
            <section className="title-name">
                <img alt="uol-logo" src="./assets/images/uol-logo.png"/>
                <h1 className="font-extra-bold "><span>UOL</span>Comics</h1>
            </section>

            <section className="name-filter">
            {filterState &&(
                <>
                    <button className='search-button' onClick={handleFilter}>
                        <img src='./assets/images/symbols-search.png' alt='pesquisar'/>
                    </button>
                    <input name="filter"
                    placeholder='Pesquisar por nome...'
                    ref={filterInputRef}
                    />
                </>
            )}
            </section>

            <section className="right-side-header">
                <div className="links">
                    {/* 'a' vai mudar pra 'Link' */}
                    <a href="#"><p className="font-regular">Quadrinhos</p></a>
                    <a href="#"><p className="font-regular selected">Personagens</p></a>
                </div>
                <a href="#">
                    <div className="go-to-cart">
                        <img
                        onMouseEnter={()=>{setCartImage('./assets/images/cart-hover.png')}}
                        onMouseLeave={()=>{setCartImage('./assets/svg/cart.svg')}}
                        className="cart-icon" src={cartImage} alt="Carrinho"/>

                        {hasCartItem && (
                            <div className="pointer"/>
                        )}
                    </div>
                </a>

                <button className="logout-button normal-button button-square"
                onMouseEnter={()=>{setLogoutImage('./assets/images/logout-hover.png')}}
                onMouseLeave={()=>{setLogoutImage('./assets/images/logout.png')}}
                >
                    <img src={logoutImage} alt="logout"/>
                    <p>Sair</p>
                </button>
            </section>
        </header>
    )
}

export default Header;
import { useEffect, useRef, useState } from 'react';
import './style.css'
import { Link, useLocation } from 'react-router-dom';

type Props = {
    sendFilter: (filterValue: string) => void
    showFilter: boolean
}

const Header = (props: Props) => {
    const {sendFilter, showFilter} = props
    const location = useLocation()

    useEffect(() => {
        setFilterState(showFilter)
    },[props])

    // Modify States
    const [filterState, setFilterState] = useState(true)
    const [hasCartItem, setHasCartItem] = useState(false)

    // Defaul functions
    const [cartImage,setCartImage] = useState('/assets/svg/cart.svg');
    const [logoutImage,setLogoutImage] = useState('/assets/images/logout.png');

    const filterInputRef = useRef<HTMLInputElement>(null);

    const handleFilter = () => {
        if (filterInputRef.current !== null){
            sendFilter(filterInputRef.current.value)
        }
    }

    useEffect(() => {
        const cartItemsString = localStorage.getItem('cartItems')
        if (cartItemsString) {
            setHasCartItem(true)
        }
        else{
            setHasCartItem(false)
        }
    },[localStorage])

    return (
        <header>
            <section className="title-name">
                <img alt="uol-logo" src="/assets/images/uol-logo.png"/>
                <h1 className="font-extra-bold "><span>UOL</span>Comics</h1>
            </section>

            <section className="name-filter">
            {filterState &&(
                <>
                    <button className='search-button' onClick={handleFilter}>
                        <img src='assets/images/symbols-search.png' alt='pesquisar'/>
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
                    <Link to='/comics-list'><p className={`font-regular ${location.pathname === '/comics-list' ? 'selected':''}`}>Quadrinhos</p></Link>
                    <Link to='/character-page'><p className={`font-regular ${location.pathname === '/character-page' ? 'selected':''}`}>Personagens</p></Link>
                </div>
                <Link to='/cart'>
                    <div className="go-to-cart">
                        <img
                        onMouseEnter={()=>{setCartImage('/assets/images/cart-hover.png')}}
                        onMouseLeave={()=>{setCartImage('/assets/svg/cart.svg')}}
                        className="cart-icon" src={cartImage} alt="Carrinho"/>

                        {hasCartItem && (
                            <div className="pointer"/>
                        )}
                    </div>
                </Link>

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
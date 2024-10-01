import { useRef, useState } from 'react';
import './style.css'

const Header = () => {
    const [inputLabelVisible,setInputLabelVisible] = useState(true);

    const filterInputRef = useRef<HTMLInputElement>(null);

    const setFocus = () => {
        if (filterInputRef.current !== null){
            filterInputRef.current.focus()
        }
    }

    return (
        <header>
            <section className="title-name">
                <img alt="uol-logo" src="./assets/images/uol-logo.png"/>
                <h1 className="font-extra-bold "><span>UOL</span>Comics</h1>
            </section>

            <section className="name-filter">
                {inputLabelVisible && (
                    <label onClick={setFocus}>
                        <img src="./assets/images/symbols-search.png" alt="pesquisa"/>
                        <p className="font-regular">Pesquisar por nome...</p>
                    </label>
                )}

                <input name="filter"
                onFocus={() => {setInputLabelVisible(false)}}
                onBlur={() => {setInputLabelVisible(true)}}
                ref={filterInputRef}
                />
            </section>

            <section className="right-side-header">
                <div className="links">
                    {/* 'a' vai mudar pra 'Link' */}
                    <a href="#"><p>Quadrinhos</p></a>
                    <a href="#"><p>Personagens</p></a>
                </div>
            </section>
        </header>
    )
}

export default Header;
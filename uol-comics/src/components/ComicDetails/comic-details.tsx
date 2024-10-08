import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import './comic-details-style.css';
import '../ComicCard/comic-card-style.css';

interface ComicCharacter {
    id: number;
    name: string;
    thumbnail: { path: string; extension: string };
}

interface RelatedComic {
    id: number;
    title: string;
    thumbnail: { path: string; extension: string };
}

interface Series {
    name: string;
}

interface Comic {
    id: number;
    title: string;
    prices: { price: number }[];
    creators: { items: { name: string }[] };
    images: { path: string; extension: string }[];
    dates: { date: string }[];
    characters: { items: ComicCharacter[] };
    relatedComics: RelatedComic[];
    pageCount: number;
    series: Series;
    thumbnail: { path: string; extension: string };
}

const ComicDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [comic, setComic] = useState<Comic | null>(null);
    const [extraComic, setExtraComic] = useState<Array<Comic>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [cartItems, setCartItems] = useState<Array<string>>(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    });

    const baseUrl = `https://gateway.marvel.com/v1/public/comics/${id}`;
    const publicKey = '4d4058eb91382b11fe2dffc672e56af9';
    const privateKey = 'b2a097e93442bff9976716f199ecdeea9fe07f15';
    const ts = new Date().getTime().toString();
    const hash = md5(ts + privateKey + publicKey).toString();

    const addToCart = () => {
        if (id) {
            setCartItems(prevItems => [...prevItems, id]);
        } else {
            console.error('ID não encontrado. Não é possível adicionar ao carrinho.');
        }
    }
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    },[cartItems])

    // Fetch comic details
    useEffect(() => {
        const fetchComic = async () => {
            try {
                const response = await fetch(`${baseUrl}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
                if (response.status === 429) {
                    throw new Error('Too many requests. Please wait and try again.');
                }
                if (!response.ok) {
                    throw new Error(`Network response was not ok, status: ${response.status}`);
                }
                const data = await response.json();
                setComic(data.data.results[0]);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchComic();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let intId = id !== null ? parseInt(id ?? '0') : 0;
    
                for (let i = intId + 1; i <= intId + 7; i++) {
                    await fetchExtra(i);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [id]);
    
    async function fetchExtra(i: number) {
        const baseUrl = `https://gateway.marvel.com/v1/public/comics/${i}`;
        try {
            const response = await fetch(`${baseUrl}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
            
            if (response.status === 429) {
                throw new Error('Too many requests. Please wait and try again.');
            }
    
            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }
    
            const data = await response.json();
            setExtraComic(prevComics => [...prevComics, data.data.results[0]]);
        } catch (error) {
            console.error('Error fetching comic:', error);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!comic) {
        return <div>Comic not found</div>;
    }

    return (
        <div className="comic-details">
            <Link to="/" className="back-button">← Voltar</Link>
            <div className="comic-info">
                <div className="comic-cover">
                    <img src={`${comic.images[0]?.path}.${comic.images[0]?.extension}`} alt={comic.title} />
                </div>
                <div className="comic-details-text">
                    <h1>{comic.title}</h1>
                    <p className="comic-price">R$ {comic.prices[0]?.price.toFixed(2)}</p>
                    <div className="comic-meta">
                        <p><strong>Publicado em:</strong> {comic.dates[0]?.date ? new Date(comic.dates[0]?.date).getFullYear() : 'Desconhecido'}</p>
                        <p><strong>Núm. de Páginas:</strong> {comic.pageCount || 'Desconhecido'}</p>
                        <p><strong>Autor:</strong> {comic.creators.items[0]?.name || 'Desconhecido'}</p>
                        <p><strong>Série:</strong> {comic.series?.name || 'Desconhecido'}</p>
                    </div>
                    <div className="comic-characters">
                        <h3>Personagens da obra</h3>
                        <div className="characters-list">
                            <div key={comic.id} className="character">
                                <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
                                <p>{comic.title}</p>
                            </div>
                        </div>
                    </div>
                    <div className="comic-buttons">
                        <button className="add-to-cart" onClick={addToCart}>Adicionar ao carrinho</button>
                        <button className="buy-now">Comprar agora</button>
                    </div>
                </div>
            </div>
            <div className="related-comics">
                <h2>Mais obras</h2>
                <div className="related-comics-grid">
                    {extraComic.map((relatedComic: Comic) => {
                        console.log(relatedComic)
                        return (
                            <></>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default ComicDetails;

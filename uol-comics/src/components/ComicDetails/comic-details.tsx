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
}

const ComicDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [comic, setComic] = useState<Comic | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const baseUrl = `https://gateway.marvel.com/v1/public/comics/${id}`;
    const publicKey = '17ce5551a82bf2502ac676b91fd1a7ab';
    const privateKey = '99014e1f8df770dc8e3f585343a54989349a7e78';
    
    const ts = new Date().getTime().toString();
    const hash = md5(ts + privateKey + publicKey).toString();

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
    }, [id, baseUrl, ts, hash]);

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
                            {comic.characters.items.map((character) => (
                                <div key={character.id} className="character">
                                    <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
                                    <p>{character.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="comic-buttons">
                        <button className="add-to-cart">Adicionar ao carrinho</button>
                        <button className="buy-now">Comprar agora</button>
                    </div>
                </div>
            </div>
            <div className="related-comics">
                <h2>Mais obras</h2>
                <div className="related-comics-grid">
                    {comic.relatedComics.map((relatedComic) => (
                        <div key={relatedComic.id} className="related-comic-item">
                            <img src={`${relatedComic.thumbnail.path}.${relatedComic.thumbnail.extension}`} alt={relatedComic.title} />
                            <p>{relatedComic.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ComicDetails;
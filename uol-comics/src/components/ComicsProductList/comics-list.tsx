import React, { useEffect, useState } from 'react';
import ComicCard from '../ComicCard/comic-card';
import md5 from 'crypto-js/md5';
import '../ComicsProductList/comics-list-style.css'


interface Comic {
    id: number;
    title: string;
    prices: { price: number }[];
    creators: { items: { name: string }[] };
    images: { path: string; extension: string }[];
    dates: { date: string }[];
}

const ComicList: React.FC = () => {
    const [comics, setComics] = useState<Comic[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const baseUrl = 'https://gateway.marvel.com/v1/public/comics';
    const publicKey = 'fd064c98af10874bffcee4cde18cee89';
    const privateKey = 'cb058f5d04b18af9663408f816f4a6be743a1b6a';

    const ts = new Date().getTime().toString();

    const hash = md5(ts + privateKey + publicKey).toString();

    useEffect(() => {
        const fetchComics = async () => {
            try {
                const response = await fetch(`${baseUrl}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
                if (!response.ok) {
                    throw new Error(`Network response was not ok, status: ${response.status}`);
                }
                const data = await response.json();
                setComics(data.data.results);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchComics();
    }, [ts, hash]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div className="product-list">
                {comics
                    .filter(comic => 
                        comic.images.length > 0 && 
                        comic.prices[0]?.price > 0 && 
                        comic.title !== 'Marvel Previews (2017)' && 
                        comic.creators.items.length > 0
                    )
                    .map(comic => (
                        <ComicCard 
                            key={comic.id} 
                            cover_image={`${comic.images[0]?.path}.${comic.images[0]?.extension}`}
                            title={comic.title} 
                            price={comic.prices[0]?.price || 0}
                            author={comic.creators.items[0]?.name || 'Desconhecido'}
                            release_year={comic.dates[0]?.date ? new Date(comic.dates[0]?.date).getFullYear() : 0} 
                        />
                ))}
            </div>
        </div>
    );    
};

export default ComicList;
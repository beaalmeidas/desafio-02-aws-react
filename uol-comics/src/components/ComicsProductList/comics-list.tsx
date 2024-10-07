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
    const publicKey = '17ce5551a82bf2502ac676b91fd1a7ab';
    const privateKey = '99014e1f8df770dc8e3f585343a54989349a7e78';

    const ts = new Date().getTime().toString();
    const hash = md5(ts + privateKey + publicKey).toString();

    const CACHE_TIME_LIMIT = 24 * 60 * 60 * 1000;

    useEffect(() => {
        const fetchComics = async () => {
            const cachedData = localStorage.getItem('comics');
            const cachedTimestamp = localStorage.getItem('comicsTimestamp');
            const currentTime = new Date().getTime();

            if (cachedData && cachedTimestamp && (currentTime - parseInt(cachedTimestamp)) < CACHE_TIME_LIMIT) {
                setComics(JSON.parse(cachedData));
                setLoading(false);
            } else {
                try {
                    const response = await fetch(`${baseUrl}?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=20`);
                    if (response.status === 429) {
                        throw new Error('Too many requests. Please wait and try again.');
                    }
                    if (!response.ok) {
                        throw new Error(`Network response was not ok, status: ${response.status}`);
                    }
                    const data = await response.json();
                    setComics(data.data.results);

                    localStorage.setItem('comics', JSON.stringify(data.data.results));
                    localStorage.setItem('comicsTimestamp', currentTime.toString());
                } catch (error) {
                    setError((error as Error).message);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchComics();
    }, []);

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
                        comic.images?.length > 0 && 
                        comic.prices?.[0]?.price > 0 && 
                        comic.title !== 'Marvel Previews (2017)' && 
                        comic.creators?.items?.length > 0
                    )
                    .map(comic => (
                        <ComicCard 
                            key={comic.id}
                            id={comic.id} 
                            cover_image={`${comic.images?.[0]?.path}.${comic.images?.[0]?.extension}`}
                            title={comic.title} 
                            price={comic.prices?.[0]?.price || 0}
                            author={comic.creators?.items?.[0]?.name || 'Desconhecido'}
                            release_year={comic.dates?.[0]?.date ? new Date(comic.dates?.[0]?.date).getFullYear() : 0} 
                        />
                    ))
                }
            </div>
        </div>
    );    
};

export default ComicList;
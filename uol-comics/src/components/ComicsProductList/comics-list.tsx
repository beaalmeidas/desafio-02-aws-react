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
type Props = {
    filter: string
}

const ComicList = (props: Props) => {
    const {filter} = props

    const [comics, setComics] = useState<Comic[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const baseUrl = 'https://gateway.marvel.com/v1/public/comics';
    const publicKey = '4d4058eb91382b11fe2dffc672e56af9';
    const privateKey = 'b2a097e93442bff9976716f199ecdeea9fe07f15';

    const ts = new Date().getTime().toString();
    const hash = md5(ts + privateKey + publicKey).toString();

    const CACHE_TIME_LIMIT = 24 * 60 * 60 * 1000;

    useEffect(() => {
        const fetchComics = async () => {
            const currentTime = new Date().getTime();
        
            try {
                const response = await fetch(`${baseUrl}?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=20${filter !== '' ? `&titleStartsWith=${filter}` : ''}`);
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
        

        fetchComics();
    }, [props]);

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
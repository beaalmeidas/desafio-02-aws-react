import { useEffect, useState, useMemo } from "react";
import { Card } from "../components/CharacterCard/character-card";
import styles from "./CharacterPage.module.css";
import md5 from 'crypto-js/md5';
import { useParams } from "react-router-dom";
import Header from "../components/header";

interface CharacterDetails {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    thumbnail: {path: string, extension: string}
    name: string
}

export const CharacterDetailsPage = () => {
    const [characters, setCharacters] = useState<CharacterDetails[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const { id } = useParams();
    const baseUrl = `https://gateway.marvel.com/v1/public/characters/${id}`;
    const publicKey = 'd6433e882e9629bd2ddae2d898ccb310';
    const privateKey = '427b52c4015694083dc047ddc7076888ce132ffc';

    const ts = useMemo(() => new Date().getTime().toString(), []); 
    const hash = useMemo(() => md5(ts + privateKey + publicKey).toString(), [ts]);

    useEffect(() => {
        const fetchCharacters = async () => {
            const currentTime = new Date().getTime();
            
                try {
                    const response = await fetch(`${baseUrl}?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=20`);
                    if (response.status === 429) {
                        throw new Error('Too many requests. Please wait and try again.');
                    }
                    if (!response.ok) {
                        throw new Error(`Network response was not ok, status: ${response.status}`);
                    }
                    const data = await response.json();
                    const mappedCharacters = data.data.results.map((char: CharacterDetails) => 
                        ({
                            id: char.id,
                            title: char.name,
                            description: char.description,
                            imageUrl: `${char.thumbnail.path}.${char.thumbnail.extension}`
                        }));
                    
                    setCharacters(mappedCharacters);
                    localStorage.setItem('characters', JSON.stringify(mappedCharacters));
                    localStorage.setItem('charactersTimestamp', currentTime.toString());
                } catch (error) {
                    setError((error as Error).message);
                } finally {
                    setLoading(false);
                }
            }
        

        fetchCharacters();
    }, [ts, hash, baseUrl]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>  
            <Header showFilter={false} sendFilter={()=>{}}/>
            <div className={styles.cardList}>
                {characters.length > 0 ? (
                    characters.map((item) => (
                        <Card
                            charId={item.id}
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            imageUrl={item.imageUrl}
                        />
                    ))
                ) : (
                    <p>Nenhum resultado encontrado</p>
                )}
            </div>
        </>
    );
};

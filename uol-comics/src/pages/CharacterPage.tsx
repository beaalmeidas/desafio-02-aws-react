import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import md5 from "crypto-js/md5";
import styles from "./CharacterPage.module.css";

interface Character {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const publicKey = "941f0252f2d8c04755324cca31adfef6";
const privateKey = "8eaa824a6e397b62631be51dadacc5678dd2ceb6";
const baseUrl = "https://gateway.marvel.com/v1/public/characters";

export const CharacterPage: React.FC = () => {
  const [data, setData] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const limit = 20;

  const ts = new Date().getTime().toString();
  const hash = md5(ts + privateKey + publicKey);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${baseUrl}?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`
        );
        if (!response.ok) {
          throw new Error(
            `Erro na resposta da rede, status: ${response.status}`
          );
        }
        const result = await response.json();
        setData((prevData) => [...prevData, ...result.data.results]);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [offset]);

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  return (
    <div className={styles.container}>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      <div className={styles.cardList}>
        {data.length > 0
          ? data.map((item) => (
              <Card
                key={item.id}
                title={item.name}
                imageUrl={`${item.thumbnail.path}.${item.thumbnail.extension}`}
              />
            ))
          : !loading && <p>Nenhum resultado encontrado</p>}
      </div>
      <button onClick={handleLoadMore} className={styles.loadMoreButton}>
        Carregar Mais
      </button>
    </div>
  );
};

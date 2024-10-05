import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import md5 from "crypto-js/md5";
import styles from "./CharacterDetails.module.css";

interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  modified: string;
  stories: { available: number };
  series: { available: number };
}

const publicKey = "fd064c98af10874bffcee4cde18cee89";
const privateKey = "cb058f5d04b18af9663408f816f4a6be743a1b6a";
const baseUrl = "https://gateway.marvel.com/v1/public/characters";

export const CharacterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>(null);
  const [relatedWorks, setRelatedWorks] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(20);

  const ts = new Date().getTime().toString();
  const hash = md5(ts + privateKey + publicKey);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
        );
        const result = await response.json();
        setCharacter(result.data.results[0]);

        const relatedResponse = await fetch(
          `${baseUrl}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
        );
        const relatedResult = await relatedResponse.json();
        setRelatedWorks(relatedResult.data.results);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id, ts, hash]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 20);
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        Voltar
      </button>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      {character && (
        <>
          <div className={styles.detailsSection}>
            <div className={styles.imageContainer}>
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
              />
            </div>
            <div className={styles.infoContainer}>
              <h2>{character.name}</h2>
              <p>
                <strong>Criado em:</strong>{" "}
                {new Date(character.modified).getFullYear()}
              </p>
              <p>
                <strong>Histórias:</strong> {character.stories.available}
              </p>
              <p>
                <strong>Séries:</strong> {character.series.available}
              </p>
              <p className={styles.description}>
                {character.description || "Descrição não disponível."}
              </p>
            </div>
          </div>

          <div className={styles.moreWorksSection}>
            <h3>Mais obras</h3>
            <div className={styles.worksGrid}>
              {relatedWorks.length > 0
                ? relatedWorks
                    .slice(0, visibleCount)
                    .map((work) => (
                      <Card
                        key={work.id}
                        title={work.name}
                        description={
                          work.description || "Descrição não disponível"
                        }
                        imageUrl={`${work.thumbnail.path}.${work.thumbnail.extension}`}
                      />
                    ))
                : !loading && <p>Nenhum resultado encontrado</p>}
            </div>
            {visibleCount < relatedWorks.length && (
              <button
                onClick={handleLoadMore}
                className={styles.loadMoreButton}
              >
                Carregar Mais
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

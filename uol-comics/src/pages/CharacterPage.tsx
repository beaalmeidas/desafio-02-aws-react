import { useEffect, useState } from "react";
import { Card } from "../components/CardCharacter/Card";
import styles from "./CharacterPage.module.css";

interface Character {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export const CharacterPage = () => {
  const [data, setData] = useState<Character[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("colocar Api");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.cardList}>
      {data.length > 0 ? (
        data.map((item) => (
          <Card
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
  );
};

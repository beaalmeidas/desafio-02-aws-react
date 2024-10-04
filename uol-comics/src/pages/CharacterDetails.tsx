import { useEffect, useState } from "react";
import "./CharacterDetails.module.css";

interface Character {
  id: number;
  title: string;
  details: string;
  imageUrl: string;
  createdYear: string;
  stories: number;
  series: number;
}

export const CharacterDetails = () => {
  const [character, setCharacter] = useState<Character>();

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch("url da api ");
        const data: Character = await response.json();
        setCharacter(data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchCharacter();
  }, []);

  if (!character) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="container">
      <button className="backButton">Voltar</button>
      <div className="detailsSection">
        <div className="imageContainer">
          <img src={character.imageUrl} alt={character.title} />
        </div>
        <div className="infoContainer">
          <h2>{character.title}</h2>
          <p>
            <strong>Criado em:</strong> {character.createdYear}
          </p>
          <p>
            <strong>Histórias:</strong> {character.stories}
          </p>
          <p>
            <strong>Séries:</strong> {character.series}
          </p>
          <p className="description">{character.details}</p>
        </div>
      </div>
      <div className="moreWorksSection">
        <h3>Mais obras</h3>
        <div className="worksGrid">
          {/* Mapear AQUI A API*/}
        </div>
      </div>
    </div>
  );
};



import { useNavigate } from "react-router-dom";
import styles from "./character-card.module.css";



interface CardProps {
  title: string;
  description?: string;
  imageUrl: string;
  charId: number;
}

export const Card = ({ title, imageUrl, charId }: CardProps) => {
  const navigate = useNavigate();

  const handleSingleChar = () => {
    navigate(`/characterDetails-page:${charId}`)
  }

  return (
    <div className={styles.card} onClick={handleSingleChar}>
      <img src={imageUrl} alt={title} className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>

      </div>
      
    </div>
  );
};
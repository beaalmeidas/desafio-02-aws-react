import styles from "./character-card.module.css";


interface CardProps {
  title: string;
  description?: string;
  imageUrl: string;
}

export const Card = ({ title, imageUrl }: CardProps) => {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={title} className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>

      </div>
      
    </div>
  );
};
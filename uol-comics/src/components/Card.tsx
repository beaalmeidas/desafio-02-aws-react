import styles from "./Card.module.css";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export const Card = ({ title, description, imageUrl }: CardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={imageUrl} alt={title} className={styles.image} />
        <div className={styles.name}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
      
    </div>
  );
};

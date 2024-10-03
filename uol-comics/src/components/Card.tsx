import styles from "./Card.module.css";

interface CardProps {
  name: string;
  imageUrl: string;
}

export const Card = ({ name, imageUrl }: CardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={imageUrl} alt={name} className={styles.image} />
        <div className={styles.name}>{name}</div>
      </div>
      <button className="more-items">Carregar mais</button>
    </div>
  );
};

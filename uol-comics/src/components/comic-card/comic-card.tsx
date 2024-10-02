import React from 'react';
import './comic-card-style.css';

interface ComicCardProps {
    cover_image: string;
    title: string;
    price: number;
    author: string;
    release_year: number;
}

const ComicCard: React.FC<ComicCardProps> = ({ cover_image, title, price, author, release_year }) => {
    return (
        <div className="comic-card">
          <img src={cover_image} alt={title} className="comic-cover-image" />
          
          <div className="comic-info">
            <h2 className="comic-title">{title}</h2>
            <p className="comic-price">$ {price.toFixed(2)}</p>
            <p className="comic-author">{author}</p>
            <p className="comic-year">{release_year}</p>
          </div>
        </div>
    );
};

export default ComicCard;
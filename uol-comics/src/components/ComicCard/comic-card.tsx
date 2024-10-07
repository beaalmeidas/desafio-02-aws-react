import React from 'react';
import { Link } from 'react-router-dom';
import './comic-card-style.css';


interface ComicCardProps {
    id: number;
    cover_image: string;
    title: string;
    price: number;
    author: string;
    release_year: number;
}

const ComicCard: React.FC<ComicCardProps> = ({ id, cover_image, title, price, author, release_year }) => {
    return (
        <Link to={`/comic-details/${id}`} className="comic-card">
            <img className="comic-cover-image" src={cover_image} alt={title} />
            
            <div className="comic-info">
                <h2 className="comic-title">{title}</h2>
                <p className="comic-price">$ {price.toFixed(2)}</p>
                <div id="author-year-container">
                    <p className="comic-author">{author}</p>
                    <p className="comic-year">{release_year}</p>
                </div>
            </div>
        </Link>
    );
};

export default ComicCard;
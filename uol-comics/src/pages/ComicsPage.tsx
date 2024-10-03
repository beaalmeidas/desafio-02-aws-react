// import React from 'react';
import ComicCard from "../components/comic-card/comic-card";

const ComicsPage = () => {
    return (
        <div className="comics-page">
            <div className="comic-cards-container">
                <ComicCard 
                    cover_image="https://example.com/imagem1.jpg"
                    title="Homem-Aranha"
                    price={29.99}
                    author="Stan Lee"
                    release_year={1962}
                />
                <ComicCard 
                    cover_image="https://example.com/imagem2.jpg"
                    title="Batman"
                    price={34.99}
                    author="Bob Kane"
                    release_year={1939}
                />
            </div>
        </div>
    );
};
  
export default ComicsPage;
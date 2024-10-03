// import React from 'react';
// import ComicCard from "../components/ComicCard/comic-card";
import ComicsList from "../components/ComicsProductList/comics-list";

const ComicsPage = () => {
    return (
        <div className="comics-page">
            <div className="comic-cards-container">
                <ComicsList />
            </div>
        </div>
    );
};
  
export default ComicsPage;
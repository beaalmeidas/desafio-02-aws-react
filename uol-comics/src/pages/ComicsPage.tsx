// import React from 'react';
// import ComicCard from "../components/ComicCard/comic-card";
import Header from "../components/header/index"
import ComicsList from "../components/ComicsProductList/comics-list";

const ComicsPage = () => {
    return (
        <div className="comics-page">
            <div className="comic-cards-container">
                <Header />
                <br /> <br />
                <ComicsList />
                <br /> <br />
            </div>
        </div>
    );
};
  
export default ComicsPage;
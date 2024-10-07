// import React from 'react';
// import ComicCard from "../components/ComicCard/comic-card";
import Header from "../components/header/index"
import ComicsList from "../components/ComicsProductList/comics-list";

const ComicsPage = () => {
    const filterReturn = (filterValue: string) => {
        console.log(filterValue)
    }

    return (
        <div className="comics-page">
            <Header sendFilter={filterReturn} showFilter={true}/>
            <div className="comic-cards-container">
                <ComicsList />
            </div>
        </div>
    );
};
  
export default ComicsPage;
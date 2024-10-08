// import React from 'react';
// import ComicCard from "../components/ComicCard/comic-card";
import Header from "../components/header/index"
import ComicsList from "../components/ComicsProductList/comics-list";
import { useState } from "react";

const ComicsPage = () => {
    const [filter, setFilter] = useState('')

    const filterReturn = (filterValue: string) => {
        setFilter(filterValue)
    }

    return (
        <div className="comics-page">
            <Header sendFilter={filterReturn} showFilter={true}/>
            <div className="comic-cards-container">
                <ComicsList filter={filter}/>
            </div>
        </div>
    );
};
  
export default ComicsPage;
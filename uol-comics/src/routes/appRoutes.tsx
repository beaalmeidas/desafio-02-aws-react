import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "../layouts/DefaultLayout";

// import { HomePage } from "../pages/HomePage";
import ComicsPage from "../pages/ComicsPage";
import ComicDetailsPage from "../pages/ComicDetailsPage";
import { CharacterPage } from "../pages/CharacterPage";
import PurchasePage from "../pages/PurchasePage";
import FinishedPurPage from "../pages/FinishedPurPage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
// import { HomePage } from "../pages/homePage";

import { CharacterDetailsPage } from "../pages/CharacterDetails";


export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/comics-list" element={<ComicsPage />} />
        <Route path="/comic-details/:id" element={<ComicDetailsPage />} />
        <Route path="/character-page" element={<CharacterPage />} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/purchase-page" element={<PurchasePage/>} />
        <Route path="/finished-pur-page" element={<FinishedPurPage/>}/>
        <Route path="/characterDetails-page" element={<CharacterDetailsPage/>} />
      </Route>
    </Routes>
  );
};

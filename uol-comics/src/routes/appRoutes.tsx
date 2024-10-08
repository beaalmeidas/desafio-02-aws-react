import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "../layouts/DefaultLayout";

import ComicsPage from "../pages/ComicsPage";
import { CharacterPage } from "../pages/CharacterPage";
import PurchasePage from "../pages/PurchasePage";
import FinishedPurPage from "../pages/FinishedPurPage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
// import { HomePage } from "../pages/homePage";
import { CharacterDetailsPage } from "../pages/CharacterDetailsPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/comics-list" element={<ComicsPage />} />
        <Route path="/comic-details/" element={<ComicsPage />} />
        <Route path="/character-page" element={<CharacterPage />} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/characterDetails-page" element={<CharacterPage />} />
        <Route path="/characterDetails-page/:id" element={<CharacterDetailsPage />} />
        <Route path="/purchase-page" element={<PurchasePage/>} />
        <Route path="/finished-pur-page" element={<FinishedPurPage/>}/>
      </Route>
    </Routes>
  );
};

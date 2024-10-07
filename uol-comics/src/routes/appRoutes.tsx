import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "../layouts/DefaultLayout";

import ComicsPage from "../pages/ComicsPage";
import { CharacterPage } from "../pages/CharacterPage";
import PurchasePage from "../pages/PurchasePage";
import FinishedPurPage from "../pages/FinishedPurPage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
<<<<<<< HEAD
// import { HomePage } from "../pages/homePage";
=======

>>>>>>> fc7423e0b6052e4e2e1b42c5d0533c0bcebb56a6
import { CharacterDetails } from "../pages/CharacterDetails";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/comics-list" element={<ComicsPage />} />
        <Route path="/comic-details/" element={<ComicsPage />} />
        <Route path="/character-page" element={<CharacterPage />} />
<<<<<<< HEAD
=======

>>>>>>> fc7423e0b6052e4e2e1b42c5d0533c0bcebb56a6
        <Route path="/cart" element={<CartPage />} />
        <Route path="/purchase-page" element={<PurchasePage/>} />
        <Route path="/finished-pur-page" element={<FinishedPurPage/>}/>
        <Route path="/characterDetails-page" element={<CharacterDetails/>} />
      </Route>
    </Routes>
  );
};

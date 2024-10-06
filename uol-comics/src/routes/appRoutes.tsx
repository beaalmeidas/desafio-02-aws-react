import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "../layouts/DefaultLayout";

import ComicsPage from "../pages/ComicsPage";
import { CharacterPage } from "../pages/CharacterPage";
import { HomePage } from "../pages/HomePage";
import PurchasePage from "../pages/PurchasePage";
import FinishedPurPage from "../pages/FinishedPurPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/comics-list" element={<ComicsPage />} />
        <Route path="/comic-details/" element={<ComicsPage />} />
        <Route path="/character-page" element={<CharacterPage />} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/purchase-page" element={<PurchasePage/>} />
        <Route path="/finished-pur-page" element={<FinishedPurPage/>}/>
      </Route>
    </Routes>
  );
};

import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "../layouts/DefaultLayout";

import ComicsPage from "../pages/ComicsPage";
import { CharacterPage } from "../pages/CharacterPage";
<<<<<<< HEAD
import PurchasePage from "../pages/PurchasePage";
import FinishedPurPage from "../pages/FinishedPurPage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
=======
import { HomePage } from "../pages/homePage";
import { CharacterDetails } from "../pages/CharacterDetails";
>>>>>>> 939f8bfd549ccc38c8557812f7a2d606fab0e6ed

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/comics-list" element={<ComicsPage />} />
        <Route path="/comic-details/" element={<ComicsPage />} />
        <Route path="/character-page" element={<CharacterPage />} />
<<<<<<< HEAD

        <Route path="/cart" element={<CartPage />} />

        <Route path="/purchase-page" element={<PurchasePage/>} />
        <Route path="/finished-pur-page" element={<FinishedPurPage/>}/>
=======
        <Route path="/characterDetails-page" element={<CharacterDetails/>} />
>>>>>>> 939f8bfd549ccc38c8557812f7a2d606fab0e6ed
      </Route>
    </Routes>
  );
};

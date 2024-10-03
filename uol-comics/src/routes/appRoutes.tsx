import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "../layouts/DefaultLayout";
import ComicsPage from "../pages/ComicsPage";
import { CharacterPage } from "../pages/CharacterPage";
import { HomePage } from "../pages/homePage";
import CartPage from "../pages/CartPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/comics-page" element={<ComicsPage />} />
        <Route path="/character-page" element={<CharacterPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>
    </Routes>
  );
};

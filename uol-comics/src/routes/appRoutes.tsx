import { Route, Routes } from "react-router-dom";
import { CharacterPage } from "../pages/CharacterPage";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { HomePage } from "../pages/HomePage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/characterpage" element={<CharacterPage />} />
      </Route>
    </Routes>
  );
};

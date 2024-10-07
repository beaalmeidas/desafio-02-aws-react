import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "../layouts/DefaultLayout";

import LoginPage from "../pages/LoginPage";
import ComicsPage from "../pages/ComicsPage";
import ComicDetailsPage from "../pages/ComicDetailsPage";
import { CharacterPage } from "../pages/CharacterPage";
import { CharacterDetails } from "../pages/CharacterDetails";
import CartPage from "../pages/CartPage";
import PurchasePage from "../pages/PurchasePage";
import FinishedPurPage from "../pages/FinishedPurPage";


export const AppRoutes = () => {
  return (
    <Routes>
		<Route path="/" element={<DefaultLayout />}>
			{/* Página de Log-in */}
			<Route path="/" element={<LoginPage />} />

			{/* Listagem de quadrinhos */}
			<Route path="/comics-list" element={<ComicsPage />} />
			
			{/* Detalhes de quadrinho específico */}
			<Route path="/comic-details/:id" element={<ComicDetailsPage />} /> 
			
			{/* Listagem de personagens */}
			<Route path="/character-page" element={<CharacterPage />} />
			
			{/* Detalhes de personagem específico */}
			<Route path="/characterDetails-page" element={<CharacterDetails/>} />
			
			{/* Carrinho de compras */}
			<Route path="/cart" element={<CartPage />} />
			
			{/* Detalhes da compra */}
			<Route path="/purchase-page" element={<PurchasePage/>} />
			
			{/* Página de compra finalizada */}
			<Route path="/finished-pur-page" element={<FinishedPurPage/>}/>
		</Route>
    </Routes>
  );
};
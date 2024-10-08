import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header";

export function DefaultLayout() {
  return (
    <>
      <Header showFilter/>
      <Outlet/>
    </>
  );
}

import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header";

export function DefaultLayout() {
  const location = useLocation()

  const filterReturn = (filterValue: string) => {
    console.log(filterValue)
  }

  return (
    <>
      {location.pathname !== '/' && (<Header sendFilter={filterReturn}/>)}
      <Outlet/>
    </>
  );
}

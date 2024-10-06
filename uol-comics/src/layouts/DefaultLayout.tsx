import { Outlet, useLocation } from "react-router-dom";

export function DefaultLayout() {
  return (
    <>
      <Outlet/>
    </>
  );
}

//Styles
import { Outlet } from "react-router-dom";
import RootLayout from "./RootLayout";

//Components

export default function Root() {
  return (
    <>
      <Outlet />
    </>
  );
}

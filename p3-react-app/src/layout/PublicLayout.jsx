import { Outlet } from "react-router-dom";
import Nav from "../component/Nav";

const PublicLayout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default PublicLayout;

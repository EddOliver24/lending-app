import { Outlet } from "react-router-dom";
import Nav from "../component/Nav";

const ProtectedLayout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default ProtectedLayout;

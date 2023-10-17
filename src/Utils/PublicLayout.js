import { Outlet } from "react-router-dom";
import NNavbar from "../components/common/Navbar/index";
import SubNavbar from "../components/common/subnavbar";
import CategoriesRedirect from "../components/common/CategoriesRedirect";

const PublicLayout = () => {
  return (
    <>
      <NNavbar />
      <CategoriesRedirect />
      <Outlet />
    </>
  );
};

export default PublicLayout;

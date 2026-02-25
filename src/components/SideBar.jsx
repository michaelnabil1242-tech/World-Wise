import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import FooterSide from "./FooterSide";
import { Outlet } from "react-router";
function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <FooterSide />
    </div>
  );
}

export default SideBar;

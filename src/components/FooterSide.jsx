import styles from "./Footerside.module.css";
function FooterSide() {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        &copy; Copyright {new Date().getFullYear()} by WorldWise Inc
      </div>
    </footer>
  );
}

export default FooterSide;

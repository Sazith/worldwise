


import Sidebar from "../Components/Sidebar";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      
      <Sidebar/>
     
    </div>
  );
}

export default AppLayout;
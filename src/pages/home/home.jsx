import React from "react";
import styles from "./home.module.css";
import { useSelector } from "react-redux";

const Home = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  console.log("current user is: ", currentUser);
  return (
    <div>
      <div className={styles.box}>Home</div>
      <div className={styles.box}>Home</div>
      <div className={styles.box}>Home</div>
      <div className={styles.box}>Home</div>
      <div className={styles.box}>Home</div>
      <div className={styles.box}>Home</div>
      <div className={styles.box}>Home</div>
      <div className={styles.box}>Home</div>
      <div className={styles.box}>Home</div>
    </div>
  );
};

export default Home;

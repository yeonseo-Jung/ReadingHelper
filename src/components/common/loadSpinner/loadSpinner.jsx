import React from "react";
import Loader from "react-loader-spinner";
import styles from "./loadSpinner.module.css";

function LoadSpinner({ type }) {
  return (
    <div className={styles.loadspinner}>
      <Loader type={type ? `${type}` : "Oval"} color="#fdd45a" height={45} width={45} timeout={3000} />
    </div>
  );
}
export default LoadSpinner;

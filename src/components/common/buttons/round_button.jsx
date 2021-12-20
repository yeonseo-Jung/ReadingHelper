import React from "react";

const RoundButton = ({ backColor, textColor, text }) => {
  const styles = {
    borderRadius: 10,
    padding: "0.5em",
    cursor: "pointer",
    backgroundColor: backColor ? `${backColor}` : "#FDBF00",
    color: textColor ? `${textColor}` : "#ffffff",
  };
  return <button style={styles}>{text}</button>;
};

export default RoundButton;

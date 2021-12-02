import React from "react";

const RoundButton = ({ backColor, textColor, text }) => {
  const styles = {
    borderRadius: 20,
    padding: "0.5em",
    cursor: "pointer",
    backgroundColor: backColor ? `${backColor}` : "#fdd45a",
    color: textColor ? `${textColor}` : "#ffffff",
  };
  return <button style={styles}>{text}</button>;
};

export default RoundButton;

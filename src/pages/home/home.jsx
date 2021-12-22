import React, { useState } from "react";
import styles from "./home.module.css";
import { useSelector } from "react-redux";
import Chat from "../Chat/chat";

const Home = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  console.log("current user is: ", currentUser);
  return (
    <div>
      <Chat />
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";

const TheGrid = () => {
  const API_URL = "https://api.frontendexpert.io/api/fe/wordle-words";
  const [word, setWord] = useState("");
  useEffect(() => {
    const fetchWord = async () => {
      const API_data = await fetch(API_URL);
      const words = await API_data.json();
      setWord(words[Math.floor(Math.random() * words.lenght - 1)]);
    };
    fetchWord();
  }, []);
  return <>{word}</>;
};

export default TheGrid;

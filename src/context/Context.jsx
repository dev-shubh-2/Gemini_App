import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (prompt !== undefined) {
      console.log(prompt);
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      console.log(input);
      setPrevPrompt((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await run(input);
    }
    // setRecentPrompt(input);
    // setPrevPrompt((prev) => [...prev, input]);
    // const response = await run(input);
    let responseArray = response.split("**");
    let processedResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 == 0) {
        processedResponse += responseArray[i];
      } else {
        processedResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse = processedResponse.split("*").join("</br>");

    let newResponseArray = newResponse.split(" ");

    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompt,
    setPrevPrompt,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    onSent,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;

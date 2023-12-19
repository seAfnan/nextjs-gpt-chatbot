"use client";
import React, { ChangeEvent, useState, useRef, useEffect } from "react";
import { Portal } from "@radix-ui/react-portal";
import { FiSend } from "react-icons/fi";
import axios from "axios";

const ChatBoxCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [chatLog, setChatLog] = useState<{ type: string; message: string }[]>(
    []
  );
  const chatBoxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatLog]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSend = () => {
    // Handle sending the message
    if (!inputRef.current?.value) {
      return false;
    }
    setChatLog((prevChatLog: { type: string; message: string }[]) => [
      ...prevChatLog,
      { type: "user", message: message },
    ]);
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    };
    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    };

    axios
      .post(url, data, { headers: headers })
      .then((response) => {
        setChatLog((prevChatLog: { type: string; message: string }[]) => [
          ...prevChatLog,
          {
            type: "bot",
            message: response.data.choices[0].message?.content || "",
          },
        ]);
        setMessage("");
        if (inputRef.current) {
          inputRef.current.focus();
        }
      })
      .catch((error) => {
        if (error.response) {
          setMessage("");
          if (inputRef.current) {
            inputRef.current.focus();
          }
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          console.log(error.response.data);
          setChatLog((prevChatLog: { type: string; message: string }[]) => [
            ...prevChatLog,
            {
              type: "bot",
              message: error.response.data.error.code,
            },
          ]);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="bg-blue-500 text-white py-2 px-4 rounded-full fixed bottom-10 right-10"
      >
        <i>
          <b>ChatBot</b>
        </i>
      </button>
      {isOpen && (
        <Portal>
          <div
            style={{
              width: "70vh",
              height: "80vh",
              transition: "height 1s ease-in-out",
              color: isDarkMode ? "white" : "black",
              backgroundColor: isDarkMode ? "#333333" : "white",
            }}
            className={`fixed bottom-4 right-4 shadow-md rounded-md overflow-hidden ${
              isDarkMode ? "dark" : ""
            }`}
          >
            <div className="flex justify-between items-center p-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="text-gray-500 hover:text-gray-700"
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>
              <button
                onClick={handleToggle}
                className="text-gray-500 hover:text-gray-300"
              >
                &#10006;
              </button>
            </div>
            <div
              ref={chatBoxRef}
              className="flex-grow p-4 overflow-y-auto"
              style={{
                color: isDarkMode ? "white" : "black",
                backgroundColor: isDarkMode ? "#333333" : "white",
                height: "calc(100% - 99px)",
              }}
            >
              {chatLog.map((log, index) => (
                <div
                  key={index}
                  className={`flex ${
                    log.type === "user" ? "justify-end" : "justify-start"
                  } mb-4`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      log.type === "user"
                        ? "bg-blue-500 text-white"
                        : isDarkMode
                        ? "bg-gray-800 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {log.message}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center border-t border-gray-200">
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={message}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  ref={inputRef}
                  className={`w-full py-2 pt-2 pl-3 pr-10 border-t border-radius-md focus:outline-none ${
                    isDarkMode ? "bg-slate-800" : "bg-slate-200"
                  }`}
                  placeholder="Ask anything..."
                  style={{ color: isDarkMode ? "white" : "black" }}
                />
                <button
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none"
                >
                  <FiSend />
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};

export default ChatBoxCard;

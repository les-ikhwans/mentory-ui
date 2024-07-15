// pages/index.tsx
"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import ChatbotScript from "./_components/Chatbot";
import Guide from "./_components/Guide";
import Hero from "./_components/Hero";

const Popup = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={onClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <p className="text-lg">
        Thank you for trying out our demo website. This is only a frontend, and
        <br />
        we would appreciate your feedback on its design and functionality.
        <br />
        if you find anything not working / can be better, let us know.
        <br />
        <br />
        Here are the login credentials you can use to test:
        <br />
        User 1:
        <br />
        Email: user1@mentory.com
        <br />
        Password: mentory123
        <br />
        <br />
        User 2:
        <br />
        Email: user2@mentory.com
        <br />
        Password: mentory123
        <br />
        <br />
        User 3:
        <br />
        Email: user3@mentory.com
        <br />
        Password: mentory123
      </p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={onClose}
      >
        OK
      </button>
    </div>
  </div>
);

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const popupDismissed = localStorage.getItem("popupDismissed");
    if (!popupDismissed) {
      setShowPopup(true);
    }
  }, []);

  const handleClosePopup = () => {
    localStorage.setItem("popupDismissed", "true");
    setShowPopup(false);
  };

  return (
    <>
      <Head>
        <title>Mentory</title>
      </Head>
      {showPopup && <Popup onClose={handleClosePopup} />}
      <Hero />
      <Guide />
      <ChatbotScript />
    </>
  );
};

export default Home;

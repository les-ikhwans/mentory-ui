// components/ChatbotScript.tsx
import { useEffect } from 'react';
import Head from 'next/head';

const ChatbotScript = () => {
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "QndtnXygDfkeYUhf6R1ls",
        domain: "www.chatbase.co"
      };
    `;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://www.chatbase.co/embed.min.js';
    script2.defer = true;
    document.head.appendChild(script2);
  }, []);

  return null;
};

export default ChatbotScript;

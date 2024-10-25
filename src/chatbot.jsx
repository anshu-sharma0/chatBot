'use client';
import { useState, useRef, useEffect } from 'react';
import { Card } from './components/card';
import { Button } from './components/button';
import { Moon, Sun, Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import BasicTextFields from './inputArea';
import aiLogo from './assets/chatbot.png'
import logo from './assets/artificial-intelligence.png'

const Chatbot = () => {
  const [theme, setTheme] = useState('light');
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  async function handleSubmit(e) {
    e?.preventDefault();
    if (!prompt.trim() || loading) return;

    try {
      setLoading(true);
      const contents = messages.map((message) => ({
        role: message.type === 'bot' ? 'model' : 'user',
        parts: [{ text: message.content }],
      }));

      contents.push({
        role: 'user',
        parts: [{ text: prompt }],
      });

      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBj451WJaQpBIAbQg-8gY89L-1RdUtATAE',
        {
          contents,
        }
      );

      const newMessage = response.data.candidates[0].content.parts[0].text;
      setMessages((prev) => [
        ...prev,
        { type: 'user', content: prompt },
        { type: 'bot', content: newMessage },
      ]);

      setPrompt('');
      inputRef.current?.focus();
    } catch (error) {
      console.error('Error fetching response:', error);
    } finally {
      setLoading(false);
    }

  }

  const Message = ({ message }) => {
    const isBot = message.type === 'bot';
    return (
      <div className={`flex items-start gap-3 ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
        {isBot && (
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
            <Bot className="w-6 h-6 text-blue-600 dark:text-blue-300" />
          </div>
        )}
        <div className={`flex flex-col max-w-[80%] ${isBot ? 'items-start' : 'items-end'}`}>
          <div className={`rounded-2xl px-4 py-2 ${isBot
              ? `${theme === "dark" ? "bg-gray-700 text-gray-200" : "bg-blue-100 text-gray-800"}`
              : "bg-blue-500 text-white"
            }`}>
            {isBot ? (
              <ReactMarkdown className="prose dark:prose-invert prose-sm max-w-none">
                {message.content}
              </ReactMarkdown>
            ) : (
              <p>{message.content}</p>
            )}
          </div>
        </div>
        {!isBot && (
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-white" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center transition-colors duration-300 ${theme === 'dark' ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-black' : 'bg-gradient-to-r from-slate-300 to-slate-500'}`}>

      <Card className="w-[90%] max-w-lg md:max-w-2xl rounded-xl shadow-2xl bg-white dark:bg-gray-800 transition-colors duration-300 mx-4 md:mx-0">
        <div className={`flex justify-between ${theme === "dark" ? "bg-gray-600 border-slate-700" : "bg-neutral-200 border-white"} items-center p-3 `}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src={logo} alt="" />
            </div>
            <h2 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>AI Assistant</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-xl"
          >
            {theme === 'light' ? (
              <Sun className="w-8 h-8 text-orange-500 mr-3" />
            ) : (
              <Moon className="w-7 h-7 text-neutral-100 mr-3" />
            )}
          </Button>
        </div>

        <div className={`flex-1 h-[calc(80vh-8rem)] overflow-y-auto p-4 ${theme === "dark" ? "text-white bg-slate-600" : "text-black bg-neutral-50"}`}>
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="animate-bounce mb-4 text-6xl">
                <div className="w-16 h-16 rounded-full flex items-center justify-center">
                  <img src={aiLogo} alt="" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Welcome!</h3>
              <p className={` ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                How can I assist you today?
              </p>
            </div>
          ) : (
            messages.map((message, index) => (
              <Message key={index} message={message} />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className={` px-4 border-none ${theme === "dark" ? "text-white bg-slate-600" : "text-black bg-neutral-50"} `}>
          <div className="flex gap-2">
            <BasicTextFields
              setPrompt={setPrompt}
              ref={inputRef}
              prompt={prompt}
              disabled={loading}
              loading={loading}
              theme={theme}
              className="flex-grow mr-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
              placeholder="Message..."
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Chatbot;
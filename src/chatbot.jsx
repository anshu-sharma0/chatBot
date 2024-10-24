'use client'; 
import { useState, useRef, useEffect } from 'react';
import { Card } from './components/card';
import { Button } from './components/button';
import axios from 'axios';
import { Moon, Sun } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import BasicTextFields from './inputArea';

export default function Chatbot() {
  const [theme, setTheme] = useState('light');
  const [messages, setMessages] = useState([]); 
  const [prompt, setPrompt] = useState(''); 
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  async function genAnswer() {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBj451WJaQpBIAbQg-8gY89L-1RdUtATAE',
        {
          contents: [{ parts: [{ text: prompt }] }],
        }
      );
      setLoading(false);

      const newMessage = response.data.candidates[0].content.parts[0].text;
      setMessages((prevMessages) => [...prevMessages, { prompt, newMessage }]);
      setPrompt(''); 
    } catch (error) {
      setLoading(false);
      console.error('Error fetching response', error);
    }
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${theme === 'dark' ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-black' : 'bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500'}`}>
      <Card className="w-[90%] max-w-lg md:max-w-2xl rounded-lg shadow-2xl bg-white dark:bg-gray-800 transition-colors duration-300 mx-4 md:mx-0">
        <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600 rounded-t-lg">
          <h2 className={`text-2xl font-bold transition-colors duration-300 ${theme !== 'dark' ? 'text-gray-700' : 'text-gray-900'}`}>
            AI Chatbot
          </h2>
          <Button onClick={toggleTheme} className="text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-2">
            {theme === 'light' ? <Sun className="text-yellow-500" /> : <Moon className="text-blue-400" />}
          </Button>
        </div>

        <div className={`h-[400px] md:h-[500px] ${messages.length === 0 ? "" : "overflow-y-auto"}  p-4 border-t border-gray-300 dark:border-gray-600 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div ref={messagesEndRef}>
            
             {(messages.length === 0 && !loading) ? (
          <div className="flex flex-col items-center justify-center h-[400px] text-center">
            {/* <div className="animate-bounce mb-4 text-6xl">🤖</div> */}
            <div className="animate-bounce mb-4 text-6xl">
              <img src="./components/bot.png" alt="hiii" />
            </div>
            <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-xl`}>
              I'm ready for your first message!
            </p>
          </div>
        ) : 
        (messages.map((message, index) => (
          <div key={index} className="mb-4">
            <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              You: {message.prompt}
            </p>
            <ReactMarkdown className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {message.newMessage}
            </ReactMarkdown>
          </div>
        )))}
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-1 bg-gray-50 dark:bg-gray-700 border-t border-gray-300 dark:border-gray-600 rounded-b-lg">
          <BasicTextFields
            setPrompt={setPrompt}
            prompt={prompt} 
            className="flex-grow mr-2 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
            placeholder="Type your message..." 
          />

          <Button
            type="submit"
            onClick={genAnswer}
            disabled={loading || !prompt}
            className={`text-white bg-gradient-to-r ml-6 from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}
          >
            {loading ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </Card>
    </div>
  );
}

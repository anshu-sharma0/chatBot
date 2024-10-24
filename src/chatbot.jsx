'use client';
import { useState, useRef, useEffect } from 'react'
import { Card } from './components/card'
import { Button } from './components/button'
import { Input } from './components/input'
import axios from 'axios'
import { Moon, Sun } from 'lucide-react'
import ReactMarkdown from 'react-markdown';
import BasicTextFields from './inputArea';

export default function Chatbot() {
  // const { messages, input, handleInputChange, handleSubmit } = useChat()
  const [theme, setTheme] = useState('light')
  const [messages, setMessages] = useState('')
  const [prompt, setPrompt] = useState("")
  const [keyboardHandler, setKeyboardHandler] = useState(false)

  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToTop = () => {
    messagesEndRef.current.scrollToTop({ behavior: "smooth" })
  }

  useEffect(() => scrollToBottom, [])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  async function genAnswer() {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBj451WJaQpBIAbQg-8gY89L-1RdUtATAE",
        {
          contents: [
            { parts: [{ text: prompt }] }
          ]
        }
      )
      setLoading(false);
      setMessages(response.data.candidates[0].content.parts[0].text)
      setPrompt('')
    } catch (error) {
      setLoading(false)
      console.error('Error fetching response', error)
    }
  }

  return (
    <div className={`h-full md:min-h-screen flex items-center justify-center p-4 gradient-background ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} `}>
      <Card className="w-full max-w-2xl">
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-800' : 'text-gray-800'}`}>AI Chatbot</h2>
          <Button onClick={toggleTheme} className="text-sm">
            {theme === 'light' ? <Sun /> : <Moon />}
          </Button>
        </div>

        <div className={`h-[600px] lg:h-[400px] overflow-y-auto p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div ref={messagesEndRef}>
            <ReactMarkdown>
              {loading ?
                "loading"
                :
                messages
              }
            </ReactMarkdown>
          </div>
        </div>

        <div className='flex w-[90%] justify-center items-center self-center m-4'>
          {/* <Input
            value={prompt}
            setPrompt={setPrompt}
            placeholder="Type your message..."
            className="flex-grow mr-2"
            onBlur={() => setKeyboardHandler(true)}
          /> */}
                <BasicTextFields setPrompt={setPrompt} />

          <Button
            type="submit"
            onClick={() => {
              genAnswer();
              setPrompt('')
            }}
            disabled={loading}
          >
            Send
          </Button>
        </div>
      </Card>
    </div>
  )
}
import './App.css';
import BasicTextFields from './inputArea';
import { Button } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './index.css';
import Chatbot from './chatbot';

function App() {

  const [answer, setAnswer] = useState("")
  const [prompt, setPrompt] = useState("")

  async function genAnswer() {
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBj451WJaQpBIAbQg-8gY89L-1RdUtATAE",
      method: "post",
      data: {
        contents: [
          { parts: [{ text: prompt }] }
        ]
      }
    })
    setAnswer(response.data.candidates[0].content.parts[0].text)
    console.log({ response })
  }

  return (
    <div className=" flex ">
      <Chatbot/>
      {/* <div >
      <h1 className="text-3xl font-bold underline">
        Chat Bot
      </h1>
      <BasicTextFields setPrompt={setPrompt} />
      <ReactMarkdown className=''>{answer}</ReactMarkdown>
      <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={() => genAnswer()}
      >Generate</button>
</div> */}
    </div>
  );
}

export default App;

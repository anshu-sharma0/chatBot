import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Send } from 'lucide-react';

export default function BasicTextFields({ setPrompt, prompt, placeholder, ref, disabled, onClick, loading, theme }) {
  return (
    <div className="relative w-full my-2 pb-1">
      <input
        type="text"
        className={`w-full bg-transparent placeholder:text-slate-400 text-sm border ${theme === "dark" ? "border-slate-500 !text-white" : "border-slate-200 text-black"}  rounded-full pl-3 pr-10 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-md focus:shadow`}
        placeholder={placeholder}
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
        ref={ref}
        disabled={disabled}
      />
      <button
        className="absolute right-3 top-2  p-1 border-none text-center text-sm text-white transition-all   disabled:pointer-events-none  disabled:shadow-none"
        type="submit"
        onClick={onClick}
        disabled={disabled}
      >
        {loading ?
          <div class="absolute top-[1px] right-1">
            <div class="p-1  bg-gradient-to-tr animate-spin from-green-500 to-blue-500 via-purple-500 rounded-full">
              <div class={`${theme === "dark" ? "bg-slate-600" : "bg-neutral-50"} rounded-full`}>
                <div class="w-5 h-5 rounded-full"></div>
              </div>
            </div>
          </div>
          : <Send className={`w-6 h-6 ${theme === "dark" ? "text-neutral-100" : "text-gray-800"}`} />}
      </button>
    </div>
  );
}

// AIzaSyBj451WJaQpBIAbQg-8gY89L-1RdUtATAE
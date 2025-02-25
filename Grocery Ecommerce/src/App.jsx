import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-500">Tailwind CSS is Working!</h1>
      <p className="mt-4 text-lg text-gray-700">If you see this styled correctly, Tailwind is set up!</p>
      <button className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all">
        Click Me
      </button>
    </div>
  );
}


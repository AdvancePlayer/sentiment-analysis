import { useState } from 'react';
import Navbar from './components/navbar';
import SentimentAnalysis from './pages/main';

function App() {

  return (
    <>
      <div className="transition-colors duration-300 min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        <Navbar />
        <SentimentAnalysis />
      </div>
    </>
  )
}

export default App

"use client";

import { useSelector } from 'react-redux'
import { RootState } from '../store';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const ContextAnalysis = () => {
  const someData = useSelector((state: RootState) => state.speech.speechText);
  const [responses, setResponses] = useState<[string, string][]>([]);

  useEffect(() => {
    const sendDataToServer = async () => {
      try {
        const response = await fetch(`https://blabit.xyz/context?message=${encodeURIComponent(someData)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        setResponses(JSON.parse(data.response));
        
        console.log('Server response:', responses);

      } catch (error) {
        console.error('Error sending data:', error);
      }
    };

    if (someData) {
      sendDataToServer();
    }
  }, []);

  // Filter responses for recommended and possible scenarios
  const recommendedResponses = responses.filter(response => response[0] === "Recommended Response");
  const possibleScenarios = responses.filter(response => response[0] === "Possible Scenario");

  return (
    <div className="w-full min-h-screen relative">
      {/* Fixed background image that covers the entire page */}
      <div 
        className="fixed inset-0 z-0 opacity-25" 
        style={{
          backgroundImage: "url('/images/b.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'contrast(1.1) saturate(1.2)',
        }}
      >
        {/* RGB filter overlay */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: 'rgb(183,198,175)',
            mixBlendMode: 'soft-light',
            opacity: 0.85,
          }}
        ></div>
      </div>
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Scrollable content area */}
        <div className="flex flex-col w-full max-w-[800px] mx-auto p-6">
          {/* Back button */}
          <div className="sticky top-0 flex w-full mb-8 z-20 pt-2">
            <Link href="/" className="flex items-center justify-center w-20 h-10 rounded-full bg-black/70 text-white hover:bg-black/90">
              BACK
            </Link>
          </div>
          
          {/* IN THE CONTEXT OF heading */}
          <h2 className="text-xl font-semibold text-gray-800 text-left mb-4">
            IN THE CONTEXT OF
          </h2>
          
          {/* Quote with someData */}
          <div className="w-full flex justify-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 text-center">
              <span className="text-5xl">"</span>
              {someData}
              <span className="text-5xl">"</span>
            </h1>
          </div>
          
          {/* Recommended Responses Section */}
          <h3 className="text-xl font-semibold text-gray-800 text-left mb-4">
            YOU SHOULD SAY
          </h3>
          
          <div className="w-full flex flex-col items-center mb-8">
            {recommendedResponses.map((response, index) => (
              <div 
                key={index} 
                className="flex flex-col p-4 rounded-lg shadow mb-2 w-full backdrop-filter backdrop-blur-md bg-white/30 border border-white/40"
              >
                <p className="text-center font-medium text-gray-800">{response[1]}</p>
              </div>
            ))}
          </div>
          
          {/* Possible Scenarios Section */}
          <h3 className="text-xl font-semibold text-gray-800 text-left mb-4">
            POSSIBLE SCENARIOS
          </h3>
          
          <div className="w-full flex flex-col items-center pb-8">
            {possibleScenarios.map((scenario, index) => (
              <div 
                key={index} 
                className="flex flex-col p-4 rounded-lg shadow mb-2 w-full backdrop-filter backdrop-blur-md bg-white/30 border border-white/40"
              >
                <p className="text-center font-medium text-gray-800">{scenario[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContextAnalysis;
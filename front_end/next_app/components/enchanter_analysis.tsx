"use client";

import { useSelector } from 'react-redux'
import { RootState } from '../store';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const EnchanterAnalysis = () => {
  const someData = useSelector((state: RootState) => state.speech.speechText);
  const [analysisData, setAnalysisData] = useState<[string, string, string][]>([]);

  useEffect(() => {
    const sendDataToServer = async () => {
      try {
        const response = await fetch(`https://blabit.xyz/enchanter?message=${encodeURIComponent(someData)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        console.log('Server response:', data.response);
        
        setAnalysisData(JSON.parse(data.response));
        
        console.log('Server response:', analysisData);

      } catch (error) {
        console.error('Error sending data:', error);
      }
    };

    if (someData) {
      sendDataToServer();
    }
  }, []);

  // Filter responses by type
  const idiomaticContent = analysisData.find(item => item[0] === "idiomatic")?.[1] || "";
  const wordErrors = analysisData.filter(item => item[0] === "wordError");
  const grammarErrors = analysisData.filter(item => item[0] === "grammarError");
  const logicErrors = analysisData.filter(item => item[0] === "logicError");
  const wordChoiceErrors = analysisData.filter(item => item[0] === "wordChoice");

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
            backgroundColor: 'rgb(181,180,162)',
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
          
          {/* YOU HAVE SAID heading */}
          <h2 className="text-xl font-semibold text-gray-800 text-left mb-4">
            YOU HAVE SAID
          </h2>
          
          {/* Quote with someData */}
          <div className="w-full flex justify-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 text-center">
              <span className="text-5xl">"</span>
              {someData}
              <span className="text-5xl">"</span>
            </h1>
          </div>
          
          {/* Idiomatic Version */}
          {idiomaticContent && (
            <div className="w-full flex flex-col items-center mb-8">
              <h3 className="text-xl font-semibold text-gray-800 text-left w-full mb-4">
                IDIOMATIC VERSION
              </h3>
              <div className="flex flex-col p-4 rounded-lg shadow mb-6 w-full backdrop-filter backdrop-blur-md bg-white/30 border border-white/40">
                <p className="text-center font-medium text-gray-800">{idiomaticContent}</p>
              </div>
            </div>
          )}
          
          {/* Word Errors Section */}
          {wordErrors.length > 0 && (
            <div className="w-full flex flex-col items-center mb-8">
              <h3 className="text-xl font-semibold text-gray-800 text-left w-full mb-4">
                THERE'S A SLIGHT WORDING ISSUE HERE
              </h3>
              {wordErrors.map((error, index) => (
                <div 
                  key={index} 
                  className="flex flex-col p-4 rounded-lg shadow mb-2 w-full backdrop-filter backdrop-blur-md bg-white/30 border border-white/40"
                >
                  <div className="flex justify-between">
                    <p className="text-gray-800 line-through">{error[1]}</p>
                    <p className="text-gray-800 font-medium">→</p>
                    <p className="text-gray-800 font-medium">{error[2]}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Grammar Errors Section */}
          {grammarErrors.length > 0 && (
            <div className="w-full flex flex-col items-center mb-8">
              <h3 className="text-xl font-semibold text-gray-800 text-left w-full mb-4">
                A SLIGHT ADJUSTMENT COULD MAKE IT SMOOTHER
              </h3>
              {grammarErrors.map((error, index) => (
                <div 
                  key={index} 
                  className="flex flex-col p-4 rounded-lg shadow mb-2 w-full backdrop-filter backdrop-blur-md bg-white/30 border border-white/40"
                >
                  <div className="flex justify-between">
                    <p className="text-gray-800 line-through">{error[1]}</p>
                    <p className="text-gray-800 font-medium">→</p>
                    <p className="text-gray-800 font-medium">{error[2]}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Logic Errors Section */}
          {logicErrors.length > 0 && (
            <div className="w-full flex flex-col items-center mb-8">
              <h3 className="text-xl font-semibold text-gray-800 text-left w-full mb-4">
                IT'S ALMOST THERE, BUT THE LOGIC COULD BE BETTER
              </h3>
              {logicErrors.map((error, index) => (
                <div 
                  key={index} 
                  className="flex flex-col p-4 rounded-lg shadow mb-2 w-full backdrop-filter backdrop-blur-md bg-white/30 border border-white/40"
                >
                  <div className="flex justify-between">
                    <p className="text-gray-800 line-through">{error[1]}</p>
                    <p className="text-gray-800 font-medium">→</p>
                    <p className="text-gray-800 font-medium">{error[2]}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Word Choice Errors Section */}
          {wordChoiceErrors.length > 0 && (
            <div className="w-full flex flex-col items-center mb-8 pb-4">
              <h3 className="text-xl font-semibold text-gray-800 text-left w-full mb-4">
                ADJUSTING THE TERM MIGHT MAKE IT CLEARER
              </h3>
              {wordChoiceErrors.map((error, index) => (
                <div 
                  key={index} 
                  className="flex flex-col p-4 rounded-lg shadow mb-2 w-full backdrop-filter backdrop-blur-md bg-white/30 border border-white/40"
                >
                  <div className="flex justify-between">
                    <p className="text-gray-800 line-through">{error[1]}</p>
                    <p className="text-gray-800 font-medium">→</p>
                    <p className="text-gray-800 font-medium">{error[2]}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnchanterAnalysis;
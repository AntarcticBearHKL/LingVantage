"use client";

import { useSelector } from 'react-redux'
import { RootState } from './store';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BLABIT_API } from '@/component/const/const';

const MirrorAnalysis = () => {
  const someData = useSelector((state: RootState) => state.speech.speechText);
  const [translations, setTranslations] = useState<[string, string][]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const sendDataToServer = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(BLABIT_API + `/mirror?message=${encodeURIComponent(someData)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        // Parse the response string into an array of [motherTongue, englishTranslation] pairs
        console.log('Raw server response:', data.response);
        setTranslations(JSON.parse(data.response));
        
        console.log('Server response:', JSON.parse(data.response));

      } catch (error) {
        console.error('Error sending data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (someData) {
      sendDataToServer();
    }
  }, [someData]); // Add someData as a dependency to re-run when it changes

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
            backgroundColor: 'rgb(167,184,208)',
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
          
          {/* Original text heading */}
          <h2 className="text-xl font-semibold text-gray-800 text-left mb-4">
            YOUR TEXT
          </h2>
          
          {/* Quote with someData */}
          <div className="w-full flex justify-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 text-center">
              <span className="text-5xl">"</span>
              {someData}
              <span className="text-5xl">"</span>
            </h1>
          </div>
          
          {/* Translations Section */}
          <h3 className="text-xl font-semibold text-gray-800 text-left mb-4">
            WERE IT TO BE TRANSLATED THIS WAY:
          </h3>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center mb-8 pb-4">
              {translations.map((pair, index) => (
                <div 
                  key={index} 
                  className="flex flex-col p-4 rounded-lg shadow mb-4 w-full backdrop-filter backdrop-blur-md bg-white/30 border border-white/40"
                >
                  <p className="text-lg font-medium text-gray-800 mb-2">{pair[0]}</p>
                  <p className="text-lg text-gray-600 italic">{pair[1]}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MirrorAnalysis;
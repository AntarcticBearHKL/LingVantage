"use client";

import { useSelector } from 'react-redux'
import { RootState } from '@/component/store';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BLABIT_API } from '@/component/const/const';

const ContextAnalysis = () => {
  const someData = useSelector((state: RootState) => state.speech.speechText);
  const [responses, setResponses] = useState<[string, string][]>([]);

  useEffect(() => {
    const sendDataToServer = async () => {
      try {
        const response = await fetch(BLABIT_API + `/context?message=${encodeURIComponent(someData)}`, {
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
    <div className="fixed flex flex-col h-dvh w-dvw select-none bg-white overflow-scroll">
      {/* 背景图片 */}
      <div className="fixed h-dvh w-dvw opacity-25 z-0">
        {/* 背景 */}
        <img className="w-full h-full object-fill" 
          src="/images/b.jpg" 
          alt=""
        />

        {/* 滤镜 */}
        <div className="absolute z-1"
          style={{
            backgroundColor: 'rgb(183,198,175)',
            mixBlendMode: 'soft-light',
            opacity: 1,
          }}
        ></div>
      </div>
      
      {/* 主体内容 */}
      <div className="relative flex flex-col h-dvh w-dvw z-10 ">

        {/* 返回按钮 */}
        <div className="sticky top-0 flex w-full pt-3 pl-2 z-20">
          <Link className="flex w-20 h-10 items-center justify-center rounded-full bg-black/70 text-white font-Rubik font-light"
            href="/">
            BACK
          </Link>
        </div>
        
        {/* 顶部标题 展示输入内容 */}
        <div className="flex flex-col px-2 mt-5">
          {/* 标题 */}
          <h2 className="mb-4 text-xl text-gray-800 text-left font-Rubik font-bold">
            IN THE CONTEXT OF
          </h2>
          
          {/* 输入的内容 */}
          <div className="w-full text-center text-lg font-Rubik font-bold">
            <span className="text-2xl">&ldquo;</span>
            {someData}
            <span className="text-2xl">&rdquo;</span>
          </div>
        </div>
        
        {/* 推荐回复部分 */}
        <div className="flex flex-col px-2 mt-5">
          {/* 标题 */}
          <h3 className="mb-4 text-xl text-gray-800 text-left font-Rubik font-bold">
            YOU SHOULD SAY
          </h3>
          
          {/* 输入的内容 */}
          <div className="text-left font-Rubik font-light">
            {recommendedResponses.map((response, index) => (
              <div 
                key={index} 
                className="flex flex-row justify-between w-full p-4 shadow backdrop-filter backdrop-blur-md bg-white/30 border border-white/40 rounded-lg mb-2"
              >
                <div className="text-left font-Rubik font-light text-gray-800">
                  {response[1]}
                </div>

                <div className="text-left font-Rubik font-light text-gray-800">
                  🔉
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 预计情景部分 */}
        <div className="flex flex-col px-2 mt-5">
          {/* 标题 */}
          <h3 className="mb-4 text-xl text-gray-800 text-left font-Rubik font-bold">
            Scenario Follow Up
          </h3>
          
          {/* 输入的内容 */}
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
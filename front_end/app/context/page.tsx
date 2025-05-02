"use client";

import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Skeleton } from 'antd';

import { BLABIT_API } from '@/component/const/const';

import { RootState } from '@/component/store';
import { setSpeechProcess } from '@/component/store/reducer/speech';

const ContextAnalysis = () => {
  const dispatch = useDispatch();
  const speechText = useSelector((state: RootState) => state.speech.speechText);
  const speechProcess = useSelector((state: RootState) => state.speech.speechProcess);
  const [responses, setResponses] = useState<[string, string][]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log('Speech text:', speechProcess);
    if (!speechProcess) {
      dispatch(setSpeechProcess(true));
      console.log('Processing speech data');
      sendDataToServer();
    }
  }, []);

  const sendDataToServer = async () => {
    const response = await fetch(BLABIT_API + `/context?message=${encodeURIComponent(speechText)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Server response:', responses);
    
    const data = await response.json();  
    setResponses(JSON.parse(data.response));

    setLoading(false);
  };

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
        <div className="sticky top-0 flex w-full pt-3 pl-1 z-20">
          <Link className="flex w-20 h-10 items-center justify-center rounded-full bg-black/70 text-white font-Rubik font-light"
            href="/">
            BACK
          </Link>
        </div>
        
        {/* 顶部标题 展示输入内容 */}
        <div className="flex flex-col px-2 mt-5">
          {/* 标题 */}
          <h2 className="mb-4 text-xl text-gray-800 text-left font-Rubik font-bold">
            In The Context Of
          </h2>
          
          {/* 输入的内容 */}
          <div className="w-full text-center text-lg font-Rubik font-bold">
            <span className="text-2xl">&ldquo;</span>
            {speechText}
            <span className="text-2xl">&rdquo;</span>
          </div>
        </div>
        
        {/* 推荐回复部分 */}
        <div className="flex flex-col px-2 mt-5">
          {/* 标题 */}
          <h3 className="mb-4 text-xl text-gray-800 text-left font-Rubik font-bold">
            You Should Say
          </h3>
          
          {/* 输入的内容 */}
          <div className="text-left font-Rubik font-light">
            {loading ? (
              Array(3).fill(null).map((_, index) => (
                <div 
                  key={`skeleton-rec-${index}`}
                  className="flex flex-row justify-between w-full p-4 shadow backdrop-filter backdrop-blur-md bg-white/30 border border-white/40 rounded-lg mb-2"
                >
                  <Skeleton active paragraph={{ rows: 1 }} title={false} />
                </div>
              ))
            ) : (
              recommendedResponses.map((response, index) => (
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
              ))
            )}
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
            {loading ? (
              // Skeleton loaders for scenarios
              Array(2).fill(null).map((_, index) => (
                <div 
                  key={`skeleton-scene-${index}`}
                  className="flex flex-row justify-between w-full p-4 shadow backdrop-filter backdrop-blur-md bg-white/30 border border-white/40 rounded-lg mb-2"
                >
                  <Skeleton active paragraph={{ rows: 2 }} title={false} />
                </div>
              ))
            ) : (
              possibleScenarios.map((scenario, index) => (
                <div 
                  key={index} 
                  className="flex flex-row justify-between w-full p-4 shadow backdrop-filter backdrop-blur-md bg-white/30 border border-white/40 rounded-lg mb-2"
                >
                  <p className="text-left font-Rubik font-light text-gray-800">
                    {scenario[1]}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ContextAnalysis;
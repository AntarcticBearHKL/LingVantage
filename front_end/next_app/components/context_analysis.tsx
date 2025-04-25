"use client";

import { useSelector } from 'react-redux'
import { RootState } from '../store'; // 导入 Redux store 的类型
import { useEffect, useState } from 'react';


const ContextAnalysis = () => {
  const someData = useSelector((state: RootState) => state.speech.speechText); // 从 Redux store 中获取数据

  const [responses, setResponses] = useState<[string, string][]>([]);


  useEffect(() => {
    const sendDataToServer = async () => {
      try {
        const response = await fetch(`https://blabit.xyz:5000/context?message=${encodeURIComponent(someData)}`, {
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

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800">
        {someData}
      </h1>

      {responses.map((response, index) => (
        <div key={index} className="flex flex-col p-4 bg-white rounded-lg shadow mb-2 w-full max-w-2xl">
          <p>问题: {response[0]}</p>
          <p>回答: {response[1]}</p>
        </div>
      ))}

    </div>
  );
};

export default ContextAnalysis;